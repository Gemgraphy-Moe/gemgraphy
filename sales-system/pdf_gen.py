from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont


def register_japanese_font():
    pdfmetrics.registerFont(UnicodeCIDFont('HeiseiKakuGo-W5'))
    pdfmetrics.registerFont(UnicodeCIDFont('HeiseiMin-W3'))


def generate_statement_pdf(statement, artist, items_data: list, output_path: str, gallery_config: dict):
    register_japanese_font()
    jp_font = 'HeiseiKakuGo-W5'

    doc = SimpleDocTemplate(output_path, pagesize=A4,
                            rightMargin=20*mm, leftMargin=20*mm,
                            topMargin=20*mm, bottomMargin=20*mm)

    s = {
        'title': ParagraphStyle('t', fontName=jp_font, fontSize=22, spaceAfter=2, textColor=colors.HexColor('#1a1a2e')),
        'sub': ParagraphStyle('s', fontName=jp_font, fontSize=10, textColor=colors.grey),
        'h': ParagraphStyle('h', fontName=jp_font, fontSize=11, spaceAfter=2),
        'n': ParagraphStyle('n', fontName=jp_font, fontSize=10, leading=16),
        'sm': ParagraphStyle('sm', fontName=jp_font, fontSize=8, textColor=colors.grey),
        'big': ParagraphStyle('big', fontName=jp_font, fontSize=14, spaceAfter=2),
        'total': ParagraphStyle('tot', fontName=jp_font, fontSize=13, textColor=colors.HexColor('#1a1a2e')),
    }

    story = []
    story.append(Paragraph(gallery_config.get('name', 'Gallery'), ParagraphStyle('br', fontName=jp_font, fontSize=18, spaceAfter=4)))
    story.append(Paragraph('売上精算書', s['title']))
    story.append(Paragraph(f"{statement.month_label}分", s['sub']))
    story.append(Spacer(1, 6*mm))
    story.append(HRFlowable(width='100%', thickness=1, color=colors.HexColor('#1a1a2e')))
    story.append(Spacer(1, 6*mm))

    info = Table([
        [Paragraph('<b>宛先</b>', s['n']), '', Paragraph('<b>発行日</b>', s['n'])],
        [Paragraph(f'{artist.name} 様', s['big']), '', Paragraph(f'{statement.year}年{statement.month}月末日', s['n'])],
        [Paragraph(f'カテゴリ：{artist.category_label}', s['sm']), '', Paragraph(f'手数料率：{int(statement.commission_rate)}%', s['sm'])],
    ], colWidths=[90*mm, 20*mm, 60*mm])
    info.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('BOTTOMPADDING', (0, 0), (-1, -1), 3)]))
    story.append(info)
    story.append(Spacer(1, 8*mm))

    story.append(Paragraph('■ 販売明細', s['h']))
    story.append(Spacer(1, 2*mm))

    tdata = [['作品名', '単価（円）', '販売数', '小計（円）']]
    for item in items_data:
        tdata.append([item['item_name'], f"{item['unit_price']:,}", str(item['sold_quantity']), f"{item['subtotal']:,}"])

    items_table = Table(tdata, colWidths=[90*mm, 28*mm, 22*mm, 30*mm])
    items_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), jp_font), ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1a1a2e')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (1, 0), (-1, -1), 'RIGHT'), ('ALIGN', (0, 0), (0, -1), 'LEFT'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f5f5f5')]),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#dddddd')),
        ('TOPPADDING', (0, 0), (-1, -1), 5), ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6), ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(items_table)
    story.append(Spacer(1, 6*mm))

    sdata = [
        ['販売合計', f"¥{statement.total_sales:,}"],
        [f'当店手数料（{int(statement.commission_rate)}%）', f"▲ ¥{statement.commission_amount:,}"],
        ['', ''],
        ['お振込金額（税込）', f"¥{statement.payout_amount:,}"],
    ]
    stbl = Table(sdata, colWidths=[100*mm, 70*mm])
    stbl.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), jp_font), ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('FONTSIZE', (0, 3), (-1, 3), 13), ('ALIGN', (1, 0), (1, -1), 'RIGHT'),
        ('LINEABOVE', (0, 3), (-1, 3), 1.5, colors.HexColor('#1a1a2e')),
        ('LINEBELOW', (0, 3), (-1, 3), 2, colors.HexColor('#1a1a2e')),
        ('TEXTCOLOR', (0, 3), (-1, 3), colors.HexColor('#1a1a2e')),
        ('TOPPADDING', (0, 0), (-1, -1), 5), ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(Table([[None, stbl]], colWidths=[0*mm, 170*mm]))
    story.append(Spacer(1, 10*mm))
    story.append(HRFlowable(width='100%', thickness=0.5, color=colors.grey))
    story.append(Spacer(1, 6*mm))

    story.append(Paragraph('■ お振込先', s['h']))
    bank_info = artist.bank_info if artist.bank_info else '（振込先未登録）'
    story.append(Paragraph(bank_info.replace('\n', '<br/>'), s['n']))
    story.append(Spacer(1, 8*mm))
    story.append(HRFlowable(width='100%', thickness=0.5, color=colors.grey))
    story.append(Spacer(1, 3*mm))
    footer = f'{gallery_config.get("name","")}　{gallery_config.get("address","")}　TEL: {gallery_config.get("tel","")}'
    story.append(Paragraph(footer, s['sm']))

    doc.build(story)
    return output_path
