from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()


class Artist(UserMixin, db.Model):
    __tablename__ = 'artists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    category = db.Column(db.String(20), nullable=False)  # 'craft' or 'food'
    commission_rate = db.Column(db.Float, nullable=False)
    bank_info = db.Column(db.Text, default='')
    is_active = db.Column(db.Boolean, default=True)
    season = db.Column(db.String(20), default='')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    deliveries = db.relationship('Delivery', backref='artist', lazy=True)
    statements = db.relationship('Statement', backref='artist', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_id(self):
        return f'artist_{self.id}'

    @property
    def category_label(self):
        return 'クラフト' if self.category == 'craft' else 'フード'


class Delivery(db.Model):
    __tablename__ = 'deliveries'
    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)
    delivery_date = db.Column(db.Date, nullable=False)
    image_path = db.Column(db.String(500), default='')
    notes = db.Column(db.Text, default='')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    items = db.relationship('DeliveryItem', backref='delivery', lazy=True, cascade='all, delete-orphan')


class DeliveryItem(db.Model):
    __tablename__ = 'delivery_items'
    id = db.Column(db.Integer, primary_key=True)
    delivery_id = db.Column(db.Integer, db.ForeignKey('deliveries.id'), nullable=False)
    item_name = db.Column(db.String(200), nullable=False)
    unit_price = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    sold_quantity = db.Column(db.Integer, nullable=False, default=0)

    @property
    def subtotal(self):
        return self.unit_price * self.sold_quantity


class Statement(db.Model):
    __tablename__ = 'statements'
    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    month = db.Column(db.Integer, nullable=False)
    total_sales = db.Column(db.Integer, nullable=False, default=0)
    commission_rate = db.Column(db.Float, nullable=False)
    commission_amount = db.Column(db.Integer, nullable=False, default=0)
    payout_amount = db.Column(db.Integer, nullable=False, default=0)
    pdf_path = db.Column(db.String(500), default='')
    sent_at = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    @property
    def month_label(self):
        return f'{self.year}年{self.month}月'
