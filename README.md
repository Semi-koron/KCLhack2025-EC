# 🚀 KCL Hack Next.js学習チュートリアル

KCL Hack向けのNext.js学習用プロジェクトです。  
ECサイト風のWebアプリケーションを段階的に実装しながら、React/Next.jsの基本概念を学習できます。

## 📋 プロジェクト概要

このプロジェクトでは、**ShopHub**という商品検索サイトを作成します。  
学習者は段階的にタスクを進めることで、現代のWeb開発に必要な技術を習得できます。

## 🎯 学習ポイント

- **Next.js App Router**: 動的ルーティング、レイアウト
- **React Hooks**: useState、useEffect、useMemo
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

### Phase 1: TypeScript基礎とインターフェース設計

**学習目標**: TypeScriptの型定義とインターフェースの基本を理解する

#### Task 1-1: Product型の定義
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

### Phase 2: React Hooks - useState基礎

**学習目標**: `useState`フックを使った状態管理を理解する

#### Task 2-1: 検索キーワードの状態管理
**ファイル**: `src/app/page.tsx`

検索機能のための状態を追加しましょう。

```typescript
export default function Home() {
  // 検索キーワードの状態管理
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // ... 他のコード
}
```

**学習ポイント**:
- `useState`の基本的な使い方
- 状態の初期値設定
- 状態更新関数の命名規則（`set + 状態名`）

#### Task 2-2: 検索入力フィールドの実装
**ファイル**: `src/app/page.tsx`

検索バーに双方向データバインディングを実装しましょう。

```tsx
<input 
  type="text" 
  placeholder="商品を検索..." 
  value={searchKeyword}
  onChange={(e) => setSearchKeyword(e.target.value)}
/>
```

**学習ポイント**:
- 制御されたコンポーネント（Controlled Component）
- `onChange`イベントハンドラー
- `e.target.value`でのユーザー入力取得

---

### Phase 3: React Hooks - useMemo最適化

**学習目標**: `useMemo`を使ったパフォーマンス最適化を理解する

#### Task 3-1: 検索フィルタリングの実装
**ファイル**: `src/app/page.tsx`

商品の検索フィルタリング機能を実装しましょう。

```typescript
// 検索結果のフィルタリング（useMemoで最適化）
const filteredProducts = useMemo(() => {
  if (!searchKeyword.trim()) {
    return mockProducts; // 検索キーワードがない場合は全商品を表示
  }
  
  return mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );
}, [searchKeyword]);
```

**学習ポイント**:
- `useMemo`によるメモ化
- 依存配列の重要性
- パフォーマンス最適化の考え方
- 文字列の部分一致検索

---

### Phase 4: コンポーネント設計と再利用性

**学習目標**: 再利用可能なコンポーネントの設計方法を学ぶ

#### Task 4-1: ProductListコンポーネントの作成
**ファイル**: `src/components/ProductList/index.tsx`

商品一覧を表示するコンポーネントを作成しましょう。

```typescript
interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <Link 
          key={product.id} 
          href={`/product/${product.id}`}
          className={styles.productLink}
        >
          {/* 商品カードの実装 */}
        </Link>
      ))}
    </div>
  );
}
```

**学習ポイント**:
- コンポーネントのProps設計
- `map`メソッドでのリスト表示
- `key`プロパティの重要性
- コンポーネントの責任分離

#### Task 4-2: Buttonコンポーネントの作成
**ファイル**: `src/components/Button/index.tsx`

再利用可能なボタンコンポーネントを作成しましょう。

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className = ''
}: ButtonProps) {
  // 実装
}
```

**学習ポイント**:
- Propsの型定義
- デフォルト値の設定
- オプショナルプロパティ
- `children` propsの活用

#### Task 4-3: Cardコンポーネントの作成
**ファイル**: `src/components/Card/index.tsx`

汎用的なカードコンポーネントを作成しましょう。

---

### Phase 5: CSS Modules実装

**学習目標**: CSS Modulesを使ったスタイル管理を学ぶ

#### Task 5-1: コンポーネント別CSSファイルの作成

各コンポーネントに対応するCSSファイルを作成しましょう。

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
    └── ProductList.module.css
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
- CSS Modulesの基本概念
- クラス名の自動スコープ化
- CSS-in-TSの活用方法

#### Task 5-2: レスポンシブデザインの実装
**ファイル**: `src/app/page.module.css`

モバイルファーストのレスポンシブデザインを実装しましょう。

```css
@media (max-width: 768px) {
  .headerTop {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .searchBar {
    max-width: none;
    margin: 0;
  }

  .main {
    padding: 0 16px;
  }
}
```

**学習ポイント**:
- メディアクエリの使用
- フレキシブルレイアウト
- モバイルファーストアプローチ

---

### Phase 6: Next.js App Router - 動的ルーティング

**学習目標**: Next.js App Routerの動的ルーティングを理解する

#### Task 6-1: 商品詳細ページの作成
**ファイル**: `src/app/product/[id]/page.tsx`

動的ルーティングを使った商品詳細ページを実装しましょう。

```typescript
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const product = mockProducts.find(p => p.id === productId);
  
  // 実装
}
```

**学習ポイント**:
- 動的ルーティング（`[id]`）
- `params`の使い方
- `React.use()`でのPromise処理
- URLパラメータの型変換

#### Task 6-2: ナビゲーションの実装
**ファイル**: `src/app/product/[id]/page.tsx`

Next.js Linkコンポーネントを使ったナビゲーションを実装しましょう。

```typescript
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// パンくずリスト
<nav className={styles.breadcrumb}>
  <button onClick={() => router.push('/')}>
    ホーム
  </button>
  <span> &gt; </span>
  <span>{product.name}</span>
</nav>
```

**学習ポイント**:
- `Link`コンポーネント
- `useRouter`フック
- プログラマティックナビゲーション

---

### Phase 7: React Hooks応用 - useEffect

**学習目標**: `useEffect`を使った副作用の処理を理解する

#### Task 7-1: 検索履歴機能の実装
**ファイル**: `src/app/page.tsx`

localStorageを使った検索履歴機能を実装しましょう。

```typescript
const [searchHistory, setSearchHistory] = useState<string[]>([]);

// コンポーネントマウント時に履歴を復元
useEffect(() => {
  if (typeof window !== 'undefined') {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }
}, []);

// 検索キーワード変更時に履歴を更新
useEffect(() => {
  if (searchKeyword.trim() && searchKeyword.length >= 2) {
    const historyTimer = setTimeout(() => {
      setSearchHistory(prevHistory => {
        const newHistory = [
          searchKeyword,
          ...prevHistory.filter(item => item !== searchKeyword)
        ].slice(0, 5);
        
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        return newHistory;
      });
    }, 1000);

    return () => clearTimeout(historyTimer);
  }
}, [searchKeyword]);
```

**学習ポイント**:
- `useEffect`の基本的な使い方
- 依存配列による実行制御
- クリーンアップ関数
- localStorage API
- ブラウザ環境チェック

#### Task 7-2: 検索候補機能の実装
**ファイル**: `src/app/page.tsx`

リアルタイム検索候補機能を実装しましょう。

```typescript
const [suggestions, setSuggestions] = useState<string[]>([]);

useEffect(() => {
  if (searchKeyword.length >= 2) {
    const matches = mockProducts
      .filter(product => 
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
      )
      .map(product => product.name)
      .slice(0, 5);
    
    setSuggestions(matches);
  } else {
    setSuggestions([]);
  }
}, [searchKeyword]);
```

**学習ポイント**:
- 条件付きuseEffect実行
- 配列操作メソッド（`filter`, `map`, `slice`）
- リアルタイム更新の実装

---

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
- [ ] TypeScript型エラーなし
- [ ] CSS Modulesの適切な使用
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