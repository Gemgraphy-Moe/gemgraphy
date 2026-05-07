# Gemgraphy

装飾書（Decorative Calligraphy）の世界を紹介するWebサイトです。

## 概要

Gemgraphy は、宝石や天然石を用いた装飾書の芸術を紹介するサイトです。作品ギャラリー、アーティスト紹介、Gemgraphy・Beadsgraphy の解説などのコンテンツを提供します。

## 技術スタック

- **ビルドツール**: [Vite](https://vitejs.dev/)
- **言語**: HTML / CSS / JavaScript
- **対応言語**: 日本語 / 英語

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## プロジェクト構成

```
Gemgraphy/
├── index.html          # エントリーポイント
├── style.css           # グローバルスタイル
├── src/
│   ├── main.js         # アプリケーションエントリー
│   ├── components/     # 共通コンポーネント
│   │   ├── header.js
│   │   ├── footer.js
│   │   └── fade-in.js
│   └── pages/          # 各ページ
│       ├── home.js
│       ├── artist.js
│       ├── gallery.js
│       ├── gemgraphy.js
│       ├── beadsgraphy.js
│       ├── soshoku-sho.js
│       └── contact.js
├── locales/            # 多言語対応ファイル
└── public/             # 静的アセット
```

## ライセンス

All rights reserved.
