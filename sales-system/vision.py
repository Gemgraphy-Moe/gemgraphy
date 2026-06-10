import anthropic
import base64
import json
import re
from pathlib import Path


def extract_delivery_data(image_path: str, client: anthropic.Anthropic) -> dict:
    with open(image_path, 'rb') as f:
        image_data = base64.standard_b64encode(f.read()).decode('utf-8')

    suffix = Path(image_path).suffix.lower()
    media_type_map = {
        '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
        '.png': 'image/png', '.gif': 'image/gif', '.webp': 'image/webp',
    }
    media_type = media_type_map.get(suffix, 'image/jpeg')

    prompt = """この画像は委託販売ギャラリーの手書き納品書です。
以下の情報をJSONフォーマットで抽出してください。

抽出する情報：
1. 作家名（artist_name）: 書いてあれば抽出、なければ空文字
2. 納品日（delivery_date）: YYYY-MM-DD形式。日付が不明な場合は今日の日付
3. 商品一覧（items）: 各商品について
   - item_name: 商品名・作品名
   - unit_price: 単価（整数、円）
   - quantity: 数量（整数、記載なければ1）

必ず以下のJSON形式のみで返答してください：
{
  "artist_name": "作家名",
  "delivery_date": "YYYY-MM-DD",
  "items": [
    {"item_name": "商品名", "unit_price": 1000, "quantity": 1}
  ]
}"""

    message = client.messages.create(
        model='claude-opus-4-8',
        max_tokens=1024,
        messages=[{
            'role': 'user',
            'content': [
                {'type': 'image', 'source': {'type': 'base64', 'media_type': media_type, 'data': image_data}},
                {'type': 'text', 'text': prompt},
            ],
        }],
    )

    response_text = message.content[0].text.strip()
    json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
    if json_match:
        response_text = json_match.group()
    return json.loads(response_text)
