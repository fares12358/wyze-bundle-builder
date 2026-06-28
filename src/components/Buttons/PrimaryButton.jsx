import React from 'react';

export default function PrimaryButton({ children, onClick, className = '', disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-4 rounded bg-wyze-purple text-white font-bold text-[17px] text-center transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
