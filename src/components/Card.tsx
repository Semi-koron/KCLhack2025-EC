/**
 * 再利用可能なCardコンポーネント
 * 
 * このコンポーネントの学習ポイント：
 * 1. children propsの活用
 * 2. 条件付きレンダリング
 * 3. インラインスタイルの使用
 * 4. オプションのpropsの使い方
 */

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
  
  // パディングサイズの定義
  const paddingValues = {
    none: '0',
    small: '12px',
    medium: '16px',
    large: '24px'
  };

  // 影のスタイル定義
  const shadowValues = {
    none: 'none',
    small: '0 1px 3px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 10px 15px rgba(0, 0, 0, 0.1)'
  };

  // カードのインラインスタイル
  const cardStyle = {
    background: 'white',
    borderRadius: '8px',
    padding: paddingValues[padding],
    boxShadow: shadowValues[shadow],
    transition: hover ? 'all 0.2s ease' : 'none'
  };

  return (
    <div 
      style={cardStyle}
      className={className}
      onMouseEnter={hover ? (e) => {
        e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.15)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      } : undefined}
      onMouseLeave={hover ? (e) => {
        e.currentTarget.style.boxShadow = shadowValues[shadow];
        e.currentTarget.style.transform = 'translateY(0)';
      } : undefined}
    >
      {children}
    </div>
  );
}