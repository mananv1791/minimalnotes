import React from "react";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={`p-2 border rounded w-full ${className || ""}`}
    {...props}
  />
));

Textarea.displayName = "Textarea";