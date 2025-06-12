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
  {
    id: 3,
    name: "デザインTシャツ",
    price: 3200,
    description: "シンプルで洗練されたデザインのTシャツです。高品質なコットン素材を使用し、着心地が良く耐久性に優れています。",
    category: "ファッション",
    stock: 25,
    images: ["placeholder3.jpg"]
  },
  {
    id: 4,
    name: "プログラミング入門書",
    price: 2800,
    description: "初心者にも分かりやすく解説されたプログラミング入門書です。基礎から応用まで幅広くカバーしています。",
    category: "本・雑誌",
    stock: 12,
    images: ["placeholder4.jpg"]
  },
  {
    id: 5,
    name: "コーヒーメーカー",
    price: 8500,
    description: "本格的なコーヒーが楽しめる全自動コーヒーメーカーです。豆の挽きから抽出まで一度に行えます。",
    category: "家電",
    stock: 7,
    images: ["placeholder5.jpg"]
  },
  {
    id: 6,
    name: "ランニングシューズ",
    price: 12000,
    description: "軽量で通気性に優れたランニングシューズです。クッション性が高く、長距離走行にも適しています。",
    category: "スポーツ",
    stock: 18,
    images: ["placeholder6.jpg"]
  },
  {
    id: 7,
    name: "ワイヤレスマウス",
    price: 4200,
    description: "精密な動作を実現するワイヤレスマウスです。エルゴノミクスデザインで長時間の作業でも疲れにくいです。",
    category: "家電",
    stock: 30,
    images: ["placeholder7.jpg"]
  },
  {
    id: 8,
    name: "料理本",
    price: 1800,
    description: "家庭で簡単に作れる美味しい料理のレシピが豊富に掲載された料理本です。初心者でも分かりやすい解説付きです。",
    category: "本・雑誌",
    stock: 20,
    images: ["placeholder8.jpg"]
  },
  {
    id: 9,
    name: "ノートパソコン",
    price: 89800,
    description: "高性能なプロセッサを搭載した軽量ノートパソコンです。ビジネスからクリエイティブワークまで幅広く対応します。",
    category: "家電",
    stock: 5,
    images: ["placeholder9.jpg"]
  },
  {
    id: 10,
    name: "Bluetoothスピーカー",
    price: 6800,
    description: "コンパクトながら迫力のあるサウンドを楽しめるBluetoothスピーカーです。防水機能付きでアウトドアでも使用可能です。",
    category: "家電",
    stock: 22,
    images: ["placeholder10.jpg"]
  },
  {
    id: 11,
    name: "レザージャケット",
    price: 28000,
    description: "上質な本革を使用したレザージャケットです。タイムレスなデザインで長くご愛用いただけます。",
    category: "ファッション",
    stock: 8,
    images: ["placeholder11.jpg"]
  },
  {
    id: 12,
    name: "ヨガマット",
    price: 3500,
    description: "滑りにくく、クッション性に優れたヨガマットです。厚み6mmで膝や腰への負担を軽減します。",
    category: "スポーツ",
    stock: 35,
    images: ["placeholder12.jpg"]
  },
  {
    id: 13,
    name: "ビジネス書",
    price: 1600,
    description: "現代のビジネス環境で必要なスキルやマインドセットについて学べるビジネス書です。",
    category: "本・雑誌",
    stock: 16,
    images: ["placeholder13.jpg"]
  },
  {
    id: 14,
    name: "スニーカー",
    price: 8900,
    description: "カジュアルからスポーツまで幅広く使えるスニーカーです。軽量で歩きやすく、デザイン性も優れています。",
    category: "ファッション",
    stock: 28,
    images: ["placeholder14.jpg"]
  },
  {
    id: 15,
    name: "電気ケトル",
    price: 4500,
    description: "素早くお湯を沸かせる電気ケトルです。温度調節機能付きで、お茶やコーヒーに最適な温度で沸かせます。",
    category: "家電",
    stock: 14,
    images: ["placeholder15.jpg"]
  },
  {
    id: 16,
    name: "バックパック",
    price: 12500,
    description: "容量たっぷりで機能的なバックパックです。ビジネスからアウトドアまで様々なシーンで活用できます。",
    category: "ファッション",
    stock: 19,
    images: ["placeholder16.jpg"]
  },
  {
    id: 17,
    name: "テニスラケット",
    price: 15800,
    description: "軽量で振りやすいテニスラケットです。初心者から中級者まで幅広いレベルの方におすすめです。",
    category: "スポーツ",
    stock: 11,
    images: ["placeholder17.jpg"]
  },
  {
    id: 18,
    name: "健康雑誌",
    price: 890,
    description: "最新の健康情報や美容情報が満載の健康雑誌です。専門家による信頼性の高い情報を提供します。",
    category: "本・雑誌",
    stock: 40,
    images: ["placeholder18.jpg"]
  },
  {
    id: 19,
    name: "ゲーミングキーボード",
    price: 16800,
    description: "高精度で反応速度の速いゲーミングキーボードです。バックライト機能付きで暗い環境でも使いやすいです。",
    category: "家電",
    stock: 13,
    images: ["placeholder19.jpg"]
  },
  {
    id: 20,
    name: "カジュアルパンツ",
    price: 5400,
    description: "着心地の良いカジュアルパンツです。ストレッチ素材を使用しており、動きやすく快適な履き心地です。",
    category: "ファッション",
    stock: 32,
    images: ["placeholder20.jpg"]
  },
  {
    id: 21,
    name: "プロテインシェイカー",
    price: 1200,
    description: "プロテインやスムージーを作るのに最適なシェイカーです。漏れにくい設計で持ち運びにも便利です。",
    category: "スポーツ",
    stock: 45,
    images: ["placeholder21.jpg"]
  },
  {
    id: 22,
    name: "漫画セット",
    price: 4800,
    description: "人気漫画の全巻セットです。ストーリーの魅力と美しいイラストで多くの読者に愛されています。",
    category: "本・雑誌",
    stock: 9,
    images: ["placeholder22.jpg"]
  },
  {
    id: 23,
    name: "Webカメラ",
    price: 7800,
    description: "高画質でクリアな映像を提供するWebカメラです。リモートワークやオンライン会議に最適です。",
    category: "家電",
    stock: 17,
    images: ["placeholder23.jpg"]
  },
  {
    id: 24,
    name: "ワンピース",
    price: 8600,
    description: "エレガントで上品なワンピースです。様々なシーンで着回せる万能なデザインです。",
    category: "ファッション",
    stock: 15,
    images: ["placeholder24.jpg"]
  },
  {
    id: 25,
    name: "ダンベルセット",
    price: 9800,
    description: "自宅でのトレーニングに最適なダンベルセットです。重量調節可能で様々なエクササイズに対応します。",
    category: "スポーツ",
    stock: 12,
    images: ["placeholder25.jpg"]
  },
  {
    id: 26,
    name: "技術書",
    price: 3400,
    description: "最新の技術トレンドと実践的な知識を学べる技術書です。エンジニアのスキルアップに役立ちます。",
    category: "本・雑誌",
    stock: 21,
    images: ["placeholder26.jpg"]
  },
  {
    id: 27,
    name: "タブレット",
    price: 32000,
    description: "高性能で軽量なタブレットです。読書、動画視聴、仕事など多目的に使用できます。",
    category: "家電",
    stock: 6,
    images: ["placeholder27.jpg"]
  },
  {
    id: 28,
    name: "帽子",
    price: 2800,
    description: "UVカット機能付きの帽子です。おしゃれなデザインで紫外線対策とファッションを両立できます。",
    category: "ファッション",
    stock: 38,
    images: ["placeholder28.jpg"]
  },
  {
    id: 29,
    name: "バスケットボール",
    price: 3800,
    description: "公式サイズのバスケットボールです。グリップ力が高く、屋内外問わず使用できます。",
    category: "スポーツ",
    stock: 24,
    images: ["placeholder29.jpg"]
  },
  {
    id: 30,
    name: "写真集",
    price: 2200,
    description: "美しい風景や瞬間を収めた写真集です。高品質な印刷で写真の魅力を最大限に表現しています。",
    category: "本・雑誌",
    stock: 18,
    images: ["placeholder30.jpg"]
  }
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