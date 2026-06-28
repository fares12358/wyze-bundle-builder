import React from 'react';

export default function SecondaryButton({ children, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 border border-wyze-purple text-wyze-purple font-semibold text-[18px] rounded-[7px] px-6 py-[7px] h-[39px] transition-colors hover:bg-purple-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${className}`}
    >
      {children}
    </button>
  );
}
