# コンポーネント説明書

このディレクトリには再利用可能なUIコンポーネントが含まれています。

## 📁 ファイル構成

```
src/components/
├── Button.tsx       # 汎用ボタンコンポーネント
├── Card.tsx         # カードレイアウトコンポーネント
└── README.md        # この説明書
```

## 🔧 各コンポーネントの使い方

### Button コンポーネント

再利用可能なボタンコンポーネントです。

**Props:**
- `children`: ボタンに表示するテキスト
- `variant`: ボタンの種類 (`'primary'` | `'secondary'` | `'danger'`)
- `size`: ボタンのサイズ (`'small'` | `'medium'` | `'large'`)
- `disabled`: 無効状態 (boolean)
- `onClick`: クリック時の処理関数
- `className`: 追加のCSSクラス

**使用例:**
```tsx
import Button from '@/components/Button';

// 基本的な使い方
<Button onClick={() => alert('clicked!')}>
  クリック
</Button>

// プロパティを指定した使い方
<Button 
  variant="primary" 
  size="large"
  disabled={false}
  onClick={handleClick}
>
  送信
</Button>
```

### Card コンポーネント

カードレイアウト用のコンポーネントです。

**Props:**
- `children`: カード内に表示するコンテンツ
- `padding`: パディングサイズ (`'none'` | `'small'` | `'medium'` | `'large'`)
- `shadow`: 影のサイズ (`'none'` | `'small'` | `'medium'` | `'large'`)
- `hover`: ホバー効果の有無 (boolean)
- `className`: 追加のCSSクラス

**使用例:**
```tsx
import Card from '@/components/Card';

// 基本的な使い方
<Card>
  <h2>タイトル</h2>
  <p>説明文</p>
</Card>

// プロパティを指定した使い方
<Card 
  padding="large" 
  shadow="medium" 
  hover={true}
>
  <div>コンテンツ</div>
</Card>
```

## 💡 学習ポイント

### 1. TypeScript インターface
コンポーネントのPropsの型を定義することで、型安全性を確保しています。

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  // ...
}
```

### 2. デフォルト値
関数の引数にデフォルト値を設定することで、省略可能なPropsを実現しています。

```tsx
function Button({ 
  variant = 'primary',  // デフォルト値
  size = 'medium'
}: ButtonProps) {
  // ...
}
```

### 3. 条件付きスタイル
オブジェクトを使ってスタイルを管理し、propsに応じて適用するスタイルを変更しています。

```tsx
const variantStyles = {
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-gray-200 text-gray-800'
};

const buttonClass = variantStyles[variant];
```

### 4. 再利用性
一度作成したコンポーネントは、異なる場所で異なるpropsを渡して再利用できます。

## 🚀 使い方のコツ

1. **共通スタイルの統一**: コンポーネントを使うことで、アプリ全体のデザインの一貫性を保てます
2. **保守性の向上**: スタイルの変更は1箇所で済み、全ての使用箇所に反映されます
3. **開発効率の向上**: 同じUIを何度も書く必要がなくなります
4. **型安全性**: TypeScriptにより、間違ったpropsの指定を防げます