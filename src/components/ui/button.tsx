import type { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
};

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  const baseStyle = "rounded font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants: Record<string, string> = {
    primary: "bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizes: Record<string, string> = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
  };

  return (
    <button
      {...props}
      className={classNames(baseStyle, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
};
