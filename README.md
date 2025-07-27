# Spartan Mission Log

Haloシリーズのキャンペーンミッションプレイ記録管理アプリケーション

## 機能

- 8つのHaloタイトルのミッション記録
- プレイ記録の入力（タイム、スコア、デス数、メモ）
- 記録の一覧表示・編集・削除
- 統計情報の表示

## 開発

```bash
# 開発サーバーの起動
npm run tauri dev

# ビルド
npm run tauri build
```

## 技術スタック

- **フロントエンド**: React + TypeScript + Tailwind CSS
- **バックエンド**: Rust (Tauri)
- **データベース**: SQLite

## プロジェクト構造

```
spartan-mission-log/
├── src-tauri/          # Rustバックエンド
├── src/                # Reactフロントエンド
│   ├── components/     # UIコンポーネント
│   ├── hooks/          # カスタムフック
│   ├── types/          # TypeScript型定義
│   └── utils/          # ユーティリティ関数
└── package.json
```