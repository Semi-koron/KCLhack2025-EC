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

"use client"; // クライアントコンポーネントとして指定（イベントハンドラーを使うため）

import { useState, useEffect } from "react"; // React hooks
import styles from "./page.module.css";
import ProductList from "@/components/ProductList";

// Task 1-1 Product 型の定義

// Task 1-2 モックデータの作成

export default function Home() {
  // Task 2-1 検索キーワードの状態管理

  // ↓ Task1-2が完了したら有効にする
  // const [filteredProducts, setFilteredProducts] =
  //   useState<Product[]>(mockProducts);

  // Task 3-1 検索フィルタリングの実装

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logo}>
            <div className={styles.circle_main}>
              <div className={styles.circle_sub}></div>
              <p className={styles.kcl}>KCL</p>
            </div>
            <h1>Kyutech Cart & Life</h1>
          </div>
          <div className={styles.searchBar}>
            {/* Task 2-2 検索入力フィールドの実装 */}
          </div>
          <div className={styles.headerActions}>
            <button className={styles.cartButton}>🛒 カート (0)</button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        {/* ↓ Task 1-2 が完了したら有効にする */}
        {/* <ProductList products={filteredProducts} /> */}
      </main>
    </div>
  );
}
