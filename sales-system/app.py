import os
from datetime import date, datetime
from pathlib import Path

from flask import (Flask, render_template, request, redirect, url_for,
                   flash, session, send_file, abort)
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import anthropic

from models import db, Artist, Delivery, DeliveryItem, Statement
from vision import extract_delivery_data
from pdf_gen import generate_statement_pdf
from email_utils import mail, send_statement_email

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gemgraphy_sales.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')
app.config['PDF_FOLDER'] = os.path.join(os.path.dirname(__file__), 'pdfs')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

app.config['GALLERY_NAME'] = os.getenv('GALLERY_NAME', 'Gemgraphy')
app.config['GALLERY_ADDRESS'] = os.getenv('GALLERY_ADDRESS', '')
app.config['GALLERY_TEL'] = os.getenv('GALLERY_TEL', '')
app.config['PORTAL_URL'] = os.getenv('PORTAL_URL', '')
app.config['COMMISSION_CRAFT'] = float(os.getenv('COMMISSION_CRAFT', 30))
app.config['COMMISSION_FOOD'] = float(os.getenv('COMMISSION_FOOD', 20))

app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'true').lower() == 'true'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME', '')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD', '')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER', '')

db.init_app(app)
mail.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'artist_login'

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif', 'webp'}
anthropic_client = None


def get_anthropic_client():
    global anthropic_client
    if anthropic_client is None:
        api_key = os.getenv('ANTHROPIC_API_KEY')
        if api_key:
            anthropic_client = anthropic.Anthropic(api_key=api_key)
    return anthropic_client


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@login_manager.user_loader
def load_user(user_id):
    if user_id.startswith('artist_'):
        return Artist.query.get(int(user_id.split('_')[1]))
    return None


def admin_required(f):
    from functools import wraps
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get('admin_logged_in'):
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    return decorated


@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        if (request.form.get('username') == os.getenv('ADMIN_USERNAME', 'admin') and
                request.form.get('password') == os.getenv('ADMIN_PASSWORD', 'admin')):
            session['admin_logged_in'] = True
            return redirect(url_for('admin_dashboard'))
        flash('ユーザー名またはパスワードが違います', 'error')
    return render_template('admin/login.html')


@app.route('/admin/logout')
def admin_logout():
    session.pop('admin_logged_in', None)
    return redirect(url_for('admin_login'))


@app.route('/admin')
@app.route('/admin/dashboard')
@admin_required
def admin_dashboard():
    artists = Artist.query.filter_by(is_active=True).order_by(Artist.name).all()
    recent_statements = Statement.query.order_by(Statement.created_at.desc()).limit(10).all()
    return render_template('admin/dashboard.html', artists=artists,
                           recent_statements=recent_statements, today=date.today())


@app.route('/admin/artists')
@admin_required
def admin_artists():
    artists = Artist.query.order_by(Artist.name).all()
    return render_template('admin/artists.html', artists=artists,
                           commission_craft=app.config['COMMISSION_CRAFT'],
                           commission_food=app.config['COMMISSION_FOOD'])


@app.route('/admin/artists/add', methods=['POST'])
@admin_required
def admin_add_artist():
    category = request.form.get('category', 'craft')
    commission_rate = (app.config['COMMISSION_CRAFT'] if category == 'craft'
                       else app.config['COMMISSION_FOOD'])
    artist = Artist(
        name=request.form.get('name'),
        email=request.form.get('email'),
        category=category,
        commission_rate=float(request.form.get('commission_rate', commission_rate)),
        bank_info=request.form.get('bank_info', ''),
        season=request.form.get('season', ''),
    )
    artist.set_password(request.form.get('password'))
    db.session.add(artist)
    db.session.commit()
    flash(f'{artist.name} 様を登録しました', 'success')
    return redirect(url_for('admin_artists'))


@app.route('/admin/artists/<int:artist_id>/edit', methods=['GET', 'POST'])
@admin_required
def admin_edit_artist(artist_id):
    artist = Artist.query.get_or_404(artist_id)
    if request.method == 'POST':
        artist.name = request.form.get('name')
        artist.email = request.form.get('email')
        artist.category = request.form.get('category')
        artist.commission_rate = float(request.form.get('commission_rate'))
        artist.bank_info = request.form.get('bank_info', '')
        artist.season = request.form.get('season', '')
        artist.is_active = 'is_active' in request.form
        if request.form.get('password'):
            artist.set_password(request.form.get('password'))
        db.session.commit()
        flash(f'{artist.name} 様の情報を更新しました', 'success')
        return redirect(url_for('admin_artists'))
    return render_template('admin/artist_edit.html', artist=artist)


@app.route('/admin/upload', methods=['GET', 'POST'])
@admin_required
def admin_upload():
    artists = Artist.query.filter_by(is_active=True).order_by(Artist.name).all()
    if request.method == 'POST':
        if 'image' not in request.files:
            flash('画像ファイルを選択してください', 'error')
            return redirect(request.url)
        file = request.files['image']
        if not file.filename or not allowed_file(file.filename):
            flash('有効な画像ファイルを選択してください', 'error')
            return redirect(request.url)
        filename = secure_filename(f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}")
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(image_path)
        extracted, error_msg = {}, None
        client = get_anthropic_client()
        if client:
            try:
                extracted = extract_delivery_data(image_path, client)
            except Exception as e:
                error_msg = f'AI読み取りエラー: {str(e)}'
        else:
            error_msg = 'Anthropic APIキーが設定されていません。手動で入力してください。'
        return render_template('admin/review.html', artists=artists,
                               artist_id=request.form.get('artist_id'),
                               image_filename=filename, extracted=extracted, error_msg=error_msg)
    return render_template('admin/upload.html', artists=artists)


@app.route('/admin/delivery/save', methods=['POST'])
@admin_required
def admin_save_delivery():
    delivery = Delivery(
        artist_id=int(request.form.get('artist_id')),
        delivery_date=datetime.strptime(request.form.get('delivery_date'), '%Y-%m-%d').date(),
        image_path=request.form.get('image_filename', ''),
        notes=request.form.get('notes', ''),
    )
    db.session.add(delivery)
    db.session.flush()
    names = request.form.getlist('item_name')
    prices = request.form.getlist('unit_price')
    qtys = request.form.getlist('quantity')
    for name, price, qty in zip(names, prices, qtys):
        if name.strip():
            db.session.add(DeliveryItem(
                delivery_id=delivery.id, item_name=name.strip(),
                unit_price=int(price or 0), quantity=int(qty or 1), sold_quantity=0,
            ))
    db.session.commit()
    flash(f'{delivery.artist.name} 様の納品書を登録しました', 'success')
    return redirect(url_for('admin_dashboard'))


@app.route('/admin/sales')
@admin_required
def admin_sales():
    artists = Artist.query.filter_by(is_active=True).order_by(Artist.name).all()
    return render_template('admin/sales.html', artists=artists, today=date.today())


@app.route('/admin/sales/<int:artist_id>', methods=['GET', 'POST'])
@admin_required
def admin_artist_sales(artist_id):
    artist = Artist.query.get_or_404(artist_id)
    year = int(request.args.get('year', date.today().year))
    month = int(request.args.get('month', date.today().month))
    deliveries = (Delivery.query.filter_by(artist_id=artist_id)
                  .filter(Delivery.delivery_date >= date(year, month, 1))
                  .order_by(Delivery.delivery_date).all())
    if request.method == 'POST':
        for key, value in request.form.items():
            if key.startswith('sold_'):
                item = DeliveryItem.query.get(int(key.split('_')[1]))
                if item:
                    item.sold_quantity = int(value or 0)
        db.session.commit()
        flash('販売数を更新しました', 'success')
        return redirect(url_for('admin_artist_sales', artist_id=artist_id, year=year, month=month))
    return render_template('admin/artist_sales.html', artist=artist,
                           deliveries=deliveries, year=year, month=month)


@app.route('/admin/statement/generate/<int:artist_id>')
@admin_required
def generate_statement(artist_id):
    artist = Artist.query.get_or_404(artist_id)
    year = int(request.args.get('year', date.today().year))
    month = int(request.args.get('month', date.today().month))
    deliveries = (Delivery.query.filter_by(artist_id=artist_id)
                  .filter(Delivery.delivery_date >= date(year, month, 1)).all())
    all_items, total_sales = [], 0
    for d in deliveries:
        for item in d.items:
            if item.sold_quantity > 0:
                sub = item.unit_price * item.sold_quantity
                all_items.append({'item_name': item.item_name, 'unit_price': item.unit_price,
                                  'sold_quantity': item.sold_quantity, 'subtotal': sub})
                total_sales += sub
    commission_amount = int(total_sales * artist.commission_rate / 100)
    statement = Statement.query.filter_by(artist_id=artist_id, year=year, month=month).first()
    if not statement:
        statement = Statement(artist_id=artist_id, year=year, month=month,
                              commission_rate=artist.commission_rate)
        db.session.add(statement)
    statement.total_sales = total_sales
    statement.commission_rate = artist.commission_rate
    statement.commission_amount = commission_amount
    statement.payout_amount = total_sales - commission_amount
    db.session.flush()
    pdf_filename = f'{year}{month:02d}_{artist_id}_{artist.name}_精算書.pdf'
    pdf_path = os.path.join(app.config['PDF_FOLDER'], pdf_filename)
    generate_statement_pdf(statement, artist, all_items, pdf_path,
                           {'name': app.config['GALLERY_NAME'],
                            'address': app.config['GALLERY_ADDRESS'],
                            'tel': app.config['GALLERY_TEL']})
    statement.pdf_path = pdf_filename
    db.session.commit()
    flash(f'{artist.name} 様の精算書を作成しました', 'success')
    return redirect(url_for('admin_statements'))


@app.route('/admin/statement/send/<int:statement_id>')
@admin_required
def send_statement(statement_id):
    statement = Statement.query.get_or_404(statement_id)
    pdf_path = os.path.join(app.config['PDF_FOLDER'], statement.pdf_path)
    if not os.path.exists(pdf_path):
        flash('PDFが見つかりません。先に精算書を生成してください。', 'error')
        return redirect(url_for('admin_statements'))
    try:
        send_statement_email(statement.artist, statement, pdf_path)
        statement.sent_at = datetime.utcnow()
        db.session.commit()
        flash(f'{statement.artist.name} 様へメールを送信しました', 'success')
    except Exception as e:
        flash(f'メール送信エラー: {str(e)}', 'error')
    return redirect(url_for('admin_statements'))


@app.route('/admin/statements')
@admin_required
def admin_statements():
    year = int(request.args.get('year', date.today().year))
    month = int(request.args.get('month', date.today().month))
    statements = (Statement.query.filter_by(year=year, month=month)
                  .join(Artist).order_by(Artist.name).all())
    artists = Artist.query.filter_by(is_active=True).order_by(Artist.name).all()
    return render_template('admin/statements.html', statements=statements,
                           artists=artists, year=year, month=month)


@app.route('/admin/pdf/<int:statement_id>')
@admin_required
def admin_view_pdf(statement_id):
    statement = Statement.query.get_or_404(statement_id)
    pdf_path = os.path.join(app.config['PDF_FOLDER'], statement.pdf_path)
    if not os.path.exists(pdf_path):
        abort(404)
    return send_file(pdf_path, mimetype='application/pdf')


@app.route('/')
def index():
    return redirect(url_for('artist_login'))


@app.route('/login', methods=['GET', 'POST'])
def artist_login():
    if current_user.is_authenticated:
        return redirect(url_for('artist_portal'))
    if request.method == 'POST':
        artist = Artist.query.filter_by(email=request.form.get('email'), is_active=True).first()
        if artist and artist.check_password(request.form.get('password', '')):
            login_user(artist, remember=True)
            return redirect(url_for('artist_portal'))
        flash('メールアドレスまたはパスワードが違います', 'error')
    return render_template('artist/login.html', gallery_name=app.config['GALLERY_NAME'])


@app.route('/logout')
@login_required
def artist_logout():
    logout_user()
    return redirect(url_for('artist_login'))


@app.route('/portal')
@login_required
def artist_portal():
    statements = (Statement.query.filter_by(artist_id=current_user.id)
                  .order_by(Statement.year.desc(), Statement.month.desc()).all())
    return render_template('artist/portal.html', artist=current_user,
                           statements=statements, gallery_name=app.config['GALLERY_NAME'])


@app.route('/portal/pdf/<int:statement_id>')
@login_required
def artist_view_pdf(statement_id):
    statement = Statement.query.get_or_404(statement_id)
    if statement.artist_id != current_user.id:
        abort(403)
    pdf_path = os.path.join(app.config['PDF_FOLDER'], statement.pdf_path)
    if not os.path.exists(pdf_path):
        abort(404)
    return send_file(pdf_path, mimetype='application/pdf')


@app.route('/portal/profile', methods=['GET', 'POST'])
@login_required
def artist_profile():
    if request.method == 'POST':
        current_user.bank_info = request.form.get('bank_info', '')
        if request.form.get('new_password'):
            if current_user.check_password(request.form.get('current_password', '')):
                current_user.set_password(request.form.get('new_password'))
            else:
                flash('現在のパスワードが違います', 'error')
                return redirect(url_for('artist_profile'))
        db.session.commit()
        flash('プロフィールを更新しました', 'success')
        return redirect(url_for('artist_portal'))
    return render_template('artist/profile.html', artist=current_user,
                           gallery_name=app.config['GALLERY_NAME'])


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
