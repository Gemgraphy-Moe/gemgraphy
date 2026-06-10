from flask_mail import Mail, Message
from flask import current_app

mail = Mail()


def send_statement_email(artist, statement, pdf_path: str):
    gallery_name = current_app.config.get('GALLERY_NAME', 'Gallery')
    subject = f'【{gallery_name}】{statement.month_label}分 売上精算書のご送付'
    body = f"""{artist.name} 様

いつもお世話になっております。
{gallery_name}です。

{statement.month_label}分の売上精算書をお送りいたします。
添付のPDFをご確認ください。

■ ご精算内容
販売合計：¥{statement.total_sales:,}
手数料（{int(statement.commission_rate)}%）：▲¥{statement.commission_amount:,}
お振込金額：¥{statement.payout_amount:,}

また、下記URLからもいつでもご確認いただけます：
{current_app.config.get('PORTAL_URL', '')}

{gallery_name}
"""
    msg = Message(subject=subject, recipients=[artist.email], body=body)
    with open(pdf_path, 'rb') as f:
        filename = f'{statement.year}{statement.month:02d}_{artist.name}_精算書.pdf'
        msg.attach(filename, 'application/pdf', f.read())
    mail.send(msg)
