import React from 'react';

/**
 * QuantityStepper
 * Uses /icons/minus.png and /icons/plus.png for the +/- buttons.
 * Falls back to text symbols if images fail to load.
 *
 * Props:
 *   value    - current quantity
 *   min      - minimum (default 0)
 *   onChange - (newQty) => void
 *   size     - 'sm' | 'md' (default 'md')
 *   disabled - bool
 */
export default function QuantityStepper({ value, min = 0, onChange, size = 'md', disabled = false }) {
  const isAtMin = value <= min;

  function handleDecrease() {
    if (!disabled && value > min) onChange(value - 1);
  }

  function handleIncrease() {
    if (!disabled) onChange(value + 1);
  }

  const btnBase =
    'flex items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transition-colors';

  const sizes = {
    sm: { btn: 'w-5 h-5', icon: 'w-2 h-2.5', text: 'text-sm w-5 text-center', wrap: 'gap-2 py-1' },
    md: { btn: 'w-5 h-5', icon: 'w-2 h-2.5', text: 'text-base w-6 text-center', wrap: 'gap-2.5 py-1' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center ${s.wrap}`}>
      {/* Decrease button */}
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={handleDecrease}
        disabled={disabled || isAtMin}
        className={`${btnBase} ${s.btn} ${
          isAtMin || disabled
            ? 'bg-gray-100 border border-gray-300 cursor-not-allowed opacity-60'
            : 'bg-white border border-gray-300 hover:bg-gray-50'
        }`}
      >
        <img
          src="/icons/minus.png"
          alt="decrease"
          className={`${s.icon} object-contain`}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.innerHTML = '<span class="text-xs font-bold leading-none select-none">−</span>';
          }}
        />
      </button>

      {/* Quantity display */}
      <span
        className={`${s.text} font-semibold text-obsidian select-none`}
        aria-live="polite"
        aria-label={`Quantity: ${value}`}
      >
        {value}
      </span>

      {/* Increase button */}
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={handleIncrease}
        disabled={disabled}
        className={`${btnBase} ${s.btn} bg-gray-100 border border-gray-200 hover:bg-gray-200 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <img
          src="/icons/plus.png"
          alt="increase"
          className={`${s.icon} object-contain`}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.innerHTML = '<span class="text-xs font-bold leading-none select-none">+</span>';
          }}
        />
      </button>
    </div>
  );
}
