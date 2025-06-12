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

import Link from 'next/link'; // Next.js のLinkコンポーネント
import styles from "./page.module.css";

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
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logo}>
            <h1>ShopHub</h1>
          </div>
          <div className={styles.searchBar}>
            <input type="text" placeholder="商品を検索..." />
          </div>
          <div className={styles.headerActions}>
            <button className={styles.cartButton}>🛒 カート (0)</button>
          </div>
        </div>
        <nav className={styles.nav}>
          <a href="#" className={styles.navItem}>すべて</a>
          <a href="#" className={styles.navItem}>ファッション</a>
          <a href="#" className={styles.navItem}>家電</a>
          <a href="#" className={styles.navItem}>本・雑誌</a>
          <a href="#" className={styles.navItem}>スポーツ</a>
        </nav>
      </header>
      <main className={styles.main}>
        <div className={styles.productGrid}>
          {/* 
            mapメソッドで配列の各商品をカードコンポーネントに変換
            keyは一意の値を指定（Reactのリスト表示の必須項目）
          */}
          {mockProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/product/${product.id}`} // 動的ルーティング：/product/1, /product/2 など
              className={styles.productLink}
            >
              <div className={styles.productCard}>
                {/* プレースホルダー画像エリア */}
                <div className={styles.productImage}></div>
                
                <div className={styles.productInfo}>
                  {/* カテゴリバッジ（条件付きレンダリングの例） */}
                  {product.category && (
                    <span className={styles.categoryBadge}>{product.category}</span>
                  )}
                  
                  <h3 className={styles.productName}>{product.name}</h3>
                  
                  {/* toLocaleString()で3桁区切りの数値表示 */}
                  <p className={styles.productPrice}>¥{product.price.toLocaleString()}</p>
                  
                  <div className={styles.productActions}>
                    <button 
                      className={styles.addToCartBtn}
                      onClick={(e) => {
                        e.preventDefault(); // Linkの遷移を防ぐ
                        alert(`${product.name} をカートに追加しました！`);
                      }}
                    >
                      カートに追加
                    </button>
                    <button 
                      className={styles.wishlistBtn}
                      onClick={(e) => {
                        e.preventDefault(); // Linkの遷移を防ぐ
                        alert(`${product.name} をお気に入りに追加しました！`);
                      }}
                    >
                      ♡
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
