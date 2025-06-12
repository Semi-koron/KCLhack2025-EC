/**
 * 商品詳細ページ - Dynamic Routes（動的ルーティング）の例
 * 
 * このページの学習ポイント：
 * 1. Next.js App RouterのDynamic Routes
 * 2. paramsの使い方
 * 3. 条件付きレンダリング
 * 4. Stateの管理（useState）
 * 5. コンポーネントの再利用
 */

'use client'; // クライアントコンポーネントとして指定（useStateを使うため）

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Card from '@/components/Card';
import styles from './page.module.css';

// 商品データの型定義
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  images: string[];
}

// モック商品データ（実際のアプリではAPIから取得）
const mockProducts: Product[] = [
  {
    id: 1,
    name: "ワイヤレスヘッドフォン",
    price: 12800,
    description: "高音質なワイヤレスヘッドフォンです。ノイズキャンセリング機能付きで、長時間の使用でも疲れにくい設計になっています。",
    category: "家電",
    stock: 15,
    images: ["placeholder1.jpg"]
  },
  {
    id: 2,
    name: "スマートウォッチ",
    price: 25000,
    description: "健康管理機能が充実したスマートウォッチ。心拍数測定、歩数計、睡眠監視など多彩な機能を搭載しています。",
    category: "家電",
    stock: 8,
    images: ["placeholder2.jpg"]
  },
  // 他の商品も同様に定義...
];

// ページコンポーネントのProps型
interface PageProps {
  params: Promise<{
    id: string; // URLから取得される商品ID
  }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  
  // React.use()でparamsをアンラップ（Next.js 15の新しい方式）
  const resolvedParams = use(params);
  
  // State（状態）の定義
  const [quantity, setQuantity] = useState(1); // 購入数量
  const [selectedImage, setSelectedImage] = useState(0); // 選択中の画像インデックス

  // URLのIDから商品を検索
  const productId = parseInt(resolvedParams.id);
  const product = mockProducts.find(p => p.id === productId);

  // 商品が見つからない場合の処理
  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>商品が見つかりません</h1>
          <Button onClick={() => router.back()}>
            戻る
          </Button>
        </div>
      </div>
    );
  }

  // 数量を増減する関数
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // カートに追加する関数（モック）
  const addToCart = () => {
    alert(`${product.name} を ${quantity} 個カートに追加しました！`);
  };

  return (
    <div className={styles.container}>
      {/* パンくずリスト */}
      <nav className={styles.breadcrumb}>
        <button onClick={() => router.push('/')} className={styles.breadcrumbLink}>
          ホーム
        </button>
        <span className={styles.breadcrumbSeparator}> &gt; </span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      <div className={styles.productLayout}>
        {/* 商品画像エリア */}
        <div className={styles.imageSection}>
          <Card padding="small" shadow="medium">
            <div className={styles.mainImage}>
              {/* メイン画像（プレースホルダー） */}
              <div className={styles.imagePlaceholder}>
                📷
              </div>
            </div>
          </Card>
        </div>

        {/* 商品情報エリア */}
        <div className={styles.infoSection}>
          <Card padding="large">
            <h1 className={styles.productTitle}>{product.name}</h1>
            <p className={styles.category}>カテゴリ: {product.category}</p>
            
            <div className={styles.priceSection}>
              <span className={styles.price}>¥{product.price.toLocaleString()}</span>
              <span className={styles.stock}>在庫: {product.stock}個</span>
            </div>

            <p className={styles.description}>{product.description}</p>

            {/* 数量選択 */}
            <div className={styles.quantitySection}>
              <label className={styles.quantityLabel}>数量:</label>
              <div className={styles.quantityControls}>
                <Button 
                  variant="secondary" 
                  size="small"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className={styles.quantityDisplay}>{quantity}</span>
                <Button 
                  variant="secondary" 
                  size="small"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>
            </div>

            {/* アクションボタン */}
            <div className={styles.actionButtons}>
              <Button 
                variant="primary" 
                size="large"
                onClick={addToCart}
                disabled={product.stock === 0}
                className={styles.addToCartButton}
              >
                {product.stock > 0 ? 'カートに追加' : '在庫切れ'}
              </Button>
              
              <Button 
                variant="secondary" 
                size="large"
                onClick={() => alert('お気に入りに追加しました！')}
              >
                ♡ お気に入り
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* 商品詳細情報 */}
      <div className={styles.detailsSection}>
        <Card padding="large">
          <h2 className={styles.sectionTitle}>商品詳細</h2>
          <div className={styles.specTable}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>商品名</span>
              <span className={styles.specValue}>{product.name}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>価格</span>
              <span className={styles.specValue}>¥{product.price.toLocaleString()}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>カテゴリ</span>
              <span className={styles.specValue}>{product.category}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>在庫数</span>
              <span className={styles.specValue}>{product.stock}個</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}