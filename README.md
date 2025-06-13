# 🚀 KCL Hack Next.js 学習チュートリアル

KCL Hack 向けの Next.js 学習用プロジェクトです。  
EC サイト風の Web アプリケーションを段階的に実装しながら、React/Next.js の基本概念を学習できます。

## 📋 プロジェクト概要

このプロジェクトでは、**ShopHub**という商品検索サイトを作成します。  
学習者は段階的にタスクを進めることで、現代の Web 開発に必要な技術を習得できます。

## 🎯 学習ポイント

- **Next.js App Router**: レイアウト
- **React Hooks**: useState、useEffect
- **TypeScript**: 型定義、インターフェース
- **CSS Modules**: コンポーネント別スタイル管理
- **コンポーネント設計**: 再利用可能なコンポーネント作成

## 🏁 Getting Started

まず、開発サーバーを起動してください：

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

---

## 📚 段階別学習ガイド

### Phase 1: TypeScript 基礎とインターフェース設計

**学習目標**: TypeScript の型定義とインターフェースの基本を理解する

#### Task 1-1: Product 型の定義

**ファイル**: `src/app/page.tsx`

商品データの型定義を作成しましょう。

```typescript
// 商品データの型定義（TypeScriptの学習）
interface Product {
  id: number;
  name: string;
  price: number;
  category?: string; // オプションのプロパティ
}
```

**学習ポイント**:

- `interface`の使い方
- オプションプロパティ（`?`）の活用
- 型安全性の確保

#### Task 1-2: モックデータの作成

**ファイル**: `src/app/page.tsx`

型定義に基づいてモックデータを作成しましょう。

```typescript
// モック商品データ - 実際のアプリではAPIから取得
const mockProducts: Product[] = [
  { id: 1, name: "ワイヤレスヘッドフォン", price: 12800, category: "家電" },
  { id: 2, name: "スマートウォッチ", price: 25000, category: "家電" },
  { id: 3, name: "デザインTシャツ", price: 3200, category: "ファッション" },
  { id: 4, name: "プログラミング入門書", price: 2800, category: "本・雑誌" },
  { id: 5, name: "コーヒーメーカー", price: 8500, category: "家電" },
  { id: 6, name: "ランニングシューズ", price: 12000, category: "スポーツ" },
  { id: 7, name: "ワイヤレスマウス", price: 4200, category: "家電" },
  { id: 8, name: "料理本", price: 1800, category: "本・雑誌" },
];
```

---

### Phase 2: React Hooks - useState 基礎

**学習目標**: `useState`フックを使った状態管理を理解する

#### Task 2-1: 検索キーワードの状態管理

**ファイル**: `src/app/page.tsx`

検索機能のための状態を追加しましょう。

```typescript
export default function Home() {
  // 検索キーワードの状態管理
  const [searchKeyword, setSearchKeyword] = useState("");

  // ... 他のコード
}
```

**学習ポイント**:

- `useState`の基本的な使い方
- 状態の初期値設定
- 状態更新関数の命名規則（`set + 状態名`）

#### Task 2-2: 検索入力フィールドの実装

**ファイル**: `src/app/page.tsx`

検索バーの入力値と状態（searchKeyword）を常に同じになるようにしましょう。

```tsx
<input
  type="text"
  placeholder="商品を検索..."
  value={/* 自分で考えてみよう */}
  onChange={(e) => setSearchKeyword(e.target.value)}
/>
```

**学習ポイント**:

- 制御されたコンポーネント（Controlled Component）
- `onChange`イベントハンドラー
- `e.target.value`でのユーザー入力取得

※この Task が終わった段階では検索はまだ機能しません。

---

### Phase 3: React Hooks - useEffect

**学習目標**: `useEffect`の基本的な使い方

#### Task 3-1: 検索フィルタリングの実装

**ファイル**: `src/app/page.tsx`

商品の検索フィルタリング機能を実装しましょう。
以下 Input に入力された文字を元に商品をフィルターしてくれるコード

```typescript
// 検索結果のフィルタリング
const lowerCaseKeyword = searchKeyword.toLowerCase();
const results = mockProducts.filter(
  (product) =>
    product.name.toLowerCase().includes(lowerCaseKeyword) ||
    (product.category &&
      product.category.toLowerCase().includes(lowerCaseKeyword))
);
setFilteredProducts(results);
```

**学習ポイント**:

- `useEffect`の基本的な使い方
- 依存配列による実行制御
- 依存配列の重要性
- 文字列の部分一致検索

---

### Phase 4: 画面遷移とコンポーネント設計

**学習目標**: 画面遷移の仕方と、コンポーネントの作り方を学ぶ

#### Task 4-1: ProductList 画面遷移できるようにしよう

**ファイル**: `src/components/ProductList/index.tsx`

商品詳細を見るためにを画面遷移を作成しましょう。

```typescript
interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <div key={product.id}>
          <Link href={/* 自分で考えてみよう */} className={styles.productLink}>
            <div className={styles.productCard}>省略</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
```

**学習ポイント**:

- コンポーネントの Props 設計
- `map`メソッドでのリスト表示
- `key`プロパティの重要性
- コンポーネントの責任分離

#### Task 4-2: Button コンポーネントの作成

**ファイル**: `src/components/Button/index.tsx`

再利用可能なボタンコンポーネントを作成しましょう。

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
  className = "",
}: ButtonProps) {
  // 実装
}
```

**学習ポイント**:

- Props の型定義
- デフォルト値の設定
- オプショナルプロパティ
- `children` props の活用

---

### Phase 5: CSS Modules 実装

**学習目標**: CSS Modules を使ったスタイル管理を学ぶ

#### Task 5-1: コンポーネント別 CSS ファイルの作成

各コンポーネントに対応する CSS ファイルを作成しましょう。

**ファイル構成**:

```
src/components/
├── Button/
│   ├── index.tsx
│   └── index.module.css
├── Card/
│   ├── index.tsx
│   └── index.module.css
└── ProductList/
    ├── index.tsx
    └── index.module.css
```

**例: Button/index.module.css**

```css
.button {
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.primary {
  background: #3182ce;
  color: white;
}

.secondary {
  background: #f7fafc;
  color: #4a5568;
  border: 2px solid #e2e8f0;
}
```

**学習ポイント**:

- CSS Modules の基本概念
- クラス名の自動スコープ化
- CSS-in-TS の活用方法

## 🎉 完成後の確認事項

実装完了後、以下の機能が正しく動作することを確認してください：

### 基本機能

- [ ] 商品一覧の表示
- [ ] 検索機能（部分一致）
- [ ] 商品詳細ページへのナビゲーション
- [ ] レスポンシブデザイン

### 応用機能

- [ ] 検索履歴の保存・復元
- [ ] 検索候補のリアルタイム表示
- [ ] 検索結果件数の表示
- [ ] デバウンス機能

### 技術要件

- [ ] TypeScript 型エラーなし
- [ ] CSS Modules の適切な使用
- [ ] コンポーネントの再利用性
- [ ] パフォーマンス最適化

---

## 🔗 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks Documentation](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📝 次のステップ

このチュートリアルを完了した後は、以下の機能拡張にチャレンジしてみてください：

1. **状態管理ライブラリの導入**: Zustand, Redux Toolkit
2. **データフェッチング**: SWR, TanStack Query
3. **認証機能**: NextAuth.js
4. **データベース連携**: Prisma, Supabase
5. **テスト**: Jest, Testing Library
6. **デプロイ**: Vercel, Netlify

頑張って実装してみてください！🚀
