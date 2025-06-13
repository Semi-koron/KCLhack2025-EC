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

// 商品データの型定義（TypeScriptの学習） <-Task1-1

// モック商品データ - 実際のアプリではAPIから取得 <-Task1-2

export default function Home() {
  
  // 検索キーワードの状態を管理するためのuseStateフック <-Task2-1

  // ↓ Task1-2が完了したら有効にする
  // const [filteredProducts, setFilteredProducts] =
  //   useState<Product[]>(mockProducts);

  // 検索結果のフィルタリング<-Task3-1

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
            {/* 検索バー <-Task2-2 */}
          </div>
          <div className={styles.headerActions}>
            <button className={styles.cartButton}>🛒 カート (0)</button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        {/* ProductListコンポーネントを使用（フィルタリングされた商品を渡す） */}
        {/* <ProductList products={filteredProducts} /> <- Task1-2が完了したら有効にする */}
      </main>
    </div>
  );
}
