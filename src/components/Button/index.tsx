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

"use client"; // クライアントコンポーネントとして指定（イベントハンドラーを使うため）

import styles from "./index.module.css";

// ButtonコンポーネントのProps（プロパティ）の型を定義
interface ButtonProps {
  children: React.ReactNode; // ボタン内に表示するテキストや要素
  variant?: "primary" | "secondary" | "danger"; // ボタンの種類（オプション）
  size?: "small" | "medium" | "large"; // ボタンのサイズ（オプション）
  disabled?: boolean; // 無効状態かどうか（オプション）
  onClick?: () => void; // クリック時の処理（オプション）
  className?: string; // 追加のCSSクラス（オプション）
}

export default function Button({
  children,
  variant = "primary", // デフォルトは'primary'
  size = "medium", // デフォルトは'medium'
  disabled = false, // デフォルトはfalse
  onClick,
  className = "",
}: ButtonProps) {
  // CSS Modulesのクラス名を組み合わせる
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // ボタンコンポーネントのHTML
  return (
    <button
      // ↓ Task 4-2 Button コンポーネントの作成
      // onClick属性を割り振り
      // disabled属性を割り振り
      // クラス名を割り振り
      type="button"
    >
      {/* ↓ Task 4-2 Button コンポーネントの作成 */}
    </button>
  );
}
