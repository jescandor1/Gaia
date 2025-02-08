import React from "react";

interface CardProps {
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-md ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={`p-4 border-b ${className}`}>
      {children}
    </div>
  );
};

interface CardContentProps {
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return (
    <div className={`p-4 border-t ${className}`}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
    return (
        <h1 className={`text-xl font-bold ${className}`}>
            {children}
        </h1>
    );
};
