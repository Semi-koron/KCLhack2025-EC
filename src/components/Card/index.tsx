/**
 * 再利用可能なCardコンポーネント
 * 
 * このコンポーネントの学習ポイント：
 * 1. children propsの活用
 * 2. 条件付きレンダリング
 * 3. CSS Modulesの使用
 * 4. オプションのpropsの使い方
 */

import styles from './index.module.css';

interface CardProps {
  children: React.ReactNode; // カード内のコンテンツ
  className?: string; // 追加のCSSクラス
  padding?: 'none' | 'small' | 'medium' | 'large'; // パディングサイズ
  shadow?: 'none' | 'small' | 'medium' | 'large'; // 影のサイズ
  hover?: boolean; // ホバー効果の有無
}

export default function Card({ 
  children, 
  className = '',
  padding = 'medium',
  shadow = 'medium',
  hover = false
}: CardProps) {
  
  // CSS Modulesのクラス名を組み合わせる
  const cardClasses = [
    styles.card,
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    styles[`shadow${shadow.charAt(0).toUpperCase() + shadow.slice(1)}`],
    hover ? styles.hover : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
}