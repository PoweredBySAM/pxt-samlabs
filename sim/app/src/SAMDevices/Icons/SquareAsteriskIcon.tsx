import React from 'react';

interface IconProps {
  sx?: React.CSSProperties;
  className?: string;
}

export const SquareAsteriskIcon: React.FC<IconProps> = ({ sx, className }) => {
  return (
    <svg
      style={sx}
      className={`inline-block ${className || ''}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H6v-2h4V7h2v4h4v2h-4v4z" />
    </svg>
  );
};