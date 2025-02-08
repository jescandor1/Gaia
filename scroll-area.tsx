import React from "react";

interface ScrollAreaProps {
  className?: string;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className }) => {
  return (
    <div className={`overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};