import React from "react";

export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "outline";
  className?: string;
}> = ({ children, className = "" }) => (
  <span className={`px-2 py-1 border text-xs rounded ${className}`}>
    {children}
  </span>
);