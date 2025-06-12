/**
 * ホームページ（商品一覧）
 * 
 * このページの学習ポイント：
 * 1. Next.js Link コンポーネントの使い方
 * 2. 配列のmapメソッドでのリスト表示
 * 3. CSS Modulesの使用方法
 * 4. レスポンシブデザインの実装
 * 5. Client Componentの必要性
 */

'use client'; // クライアントコンポーネントとして指定（イベントハンドラーを使うため）

import { useState, useMemo } from 'react'; // React hooks
import Link from 'next/link'; // Next.js のLinkコンポーネント
import styles from "./page.module.css";
import ProductList from '@/components/ProductList';

// 商品データの型定義（TypeScriptの学習）
interface Product {
  id: number;
  name: string;
  price: number;
  category?: string; // オプションのプロパティ
}

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

export default function Home() {
  // 検索キーワードの状態管理
  const [searchKeyword, setSearchKeyword] = useState('');

  // 検索結果のフィルタリング（useMemoで最適化）
  const filteredProducts = useMemo(() => {
    if (!searchKeyword.trim()) {
      return mockProducts; // 検索キーワードがない場合は全商品を表示
    }
    
    return mockProducts.filter(product =>
      product.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logo}>
            <h1>ShopHub</h1>
          </div>
          <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder="商品を検索..." 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
          <div className={styles.headerActions}>
            <button className={styles.cartButton}>🛒 カート (0)</button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        {/* ProductListコンポーネントを使用（フィルタリングされた商品を渡す） */}
        <ProductList products={filteredProducts} />
      </main>
    </div>
  );
}
