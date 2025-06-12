/**
 * 再利用可能なButtonコンポーネント
 * 
 * このコンポーネントの学習ポイント：
 * 1. TypeScriptの型定義（interface）
 * 2. propsの使い方
 * 3. 条件分岐によるスタイル変更
 * 4. デフォルト値の設定
 * 5. Client Componentの宣言
 */

'use client'; // クライアントコンポーネントとして指定（イベントハンドラーを使うため）

// ButtonコンポーネントのProps（プロパティ）の型を定義
interface ButtonProps {
  children: React.ReactNode; // ボタン内に表示するテキストや要素
  variant?: 'primary' | 'secondary' | 'danger'; // ボタンの種類（オプション）
  size?: 'small' | 'medium' | 'large'; // ボタンのサイズ（オプション）
  disabled?: boolean; // 無効状態かどうか（オプション）
  onClick?: () => void; // クリック時の処理（オプション）
  className?: string; // 追加のCSSクラス（オプション）
}

export default function Button({ 
  children, 
  variant = 'primary', // デフォルトは'primary'
  size = 'medium', // デフォルトは'medium'
  disabled = false, // デフォルトはfalse
  onClick,
  className = ''
}: ButtonProps) {
  
  // バリアント（種類）に応じたスタイルを定義
  const variantStyles = {
    primary: 'background: #3182ce; color: white',
    secondary: 'background: #f7fafc; color: #4a5568; border: 2px solid #e2e8f0',
    danger: 'background: #e53e3e; color: white'
  };

  // サイズに応じたスタイルを定義
  const sizeStyles = {
    small: { padding: '6px 12px', fontSize: '14px' },
    medium: { padding: '10px 16px', fontSize: '16px' },
    large: { padding: '14px 20px', fontSize: '18px' }
  };

  // インラインスタイルオブジェクトを作成
  const buttonStyle = {
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s',
    ...sizeStyles[size],
    ...(variant === 'primary' && { background: '#3182ce', color: 'white' }),
    ...(variant === 'secondary' && { background: '#f7fafc', color: '#4a5568', border: '2px solid #e2e8f0' }),
    ...(variant === 'danger' && { background: '#e53e3e', color: 'white' })
  };

  return (
    <button 
      style={buttonStyle}
      className={className}
      onClick={disabled ? undefined : onClick} // 無効時はクリック処理を無効化
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          if (variant === 'primary') {
            e.currentTarget.style.background = '#2c5aa0';
          } else if (variant === 'secondary') {
            e.currentTarget.style.background = '#edf2f7';
          } else if (variant === 'danger') {
            e.currentTarget.style.background = '#c53030';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          if (variant === 'primary') {
            e.currentTarget.style.background = '#3182ce';
          } else if (variant === 'secondary') {
            e.currentTarget.style.background = '#f7fafc';
          } else if (variant === 'danger') {
            e.currentTarget.style.background = '#e53e3e';
          }
        }
      }}
    >
      {children}
    </button>
  );
}