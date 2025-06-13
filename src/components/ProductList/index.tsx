/**
 * 商品一覧コンポーネント
 *
 * このコンポーネントの学習ポイント：
 * 1. propsでデータを受け取る
 * 2. mapメソッドでのリスト表示
 * 3. onClick イベントハンドラーの実装
 * 4. コンポーネントの分割による再利用性
 */

"use client";

import Link from "next/link";
import styles from "./index.module.css";

// 商品データの型定義
interface Product {
  id: number;
  name: string;
  price: number;
  category?: string;
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <div key={product.id}>
          {/* ここにLinkタグを実装してみよう <-Task4-1 */}
          <div className={styles.productCard}>
            <div className={styles.productImage}></div>

            <div className={styles.productInfo}>
              {product.category && (
                <span className={styles.categoryBadge}>{product.category}</span>
              )}

              <h3 className={styles.productName}>{product.name}</h3>

              <p className={styles.productPrice}>
                ¥{product.price.toLocaleString()}
              </p>

              <div className={styles.productActions}>
                <button
                  className={styles.addToCartBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`${product.name} をカートに追加しました！`);
                  }}
                >
                  カートに追加
                </button>
                <button
                  className={styles.wishlistBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`${product.name} をお気に入りに追加しました！`);
                  }}
                >
                  ♡
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
