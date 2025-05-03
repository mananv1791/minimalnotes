import React from "react";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "outline" | "ghost";
    size?: "sm" | "md";
  }
> = ({ children, variant = "outline", size = "md", className = "", ...props }) => {
  const base = "px-3 py-1 rounded text-sm";
  const styles =
    variant === "outline"
      ? "border"
      : variant === "ghost"
      ? "bg-transparent hover:bg-gray-100"
      : "";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};