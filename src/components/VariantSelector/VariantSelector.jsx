import React from 'react';

/**
 * VariantSelector
 * Props:
 *   variants        - [{ id, label, colorKey, swatchPath }]
 *   selectedVariant - string (variant id)
 *   onSelect        - (variantId) => void
 *
 * Each variant swatch image comes from variant.swatchPath
 * → /public/images/swatches/<product>-<color>.png
 */
export default function VariantSelector({ variants, selectedVariant, onSelect }) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {variants.map((variant) => {
        const isSelected = variant.id === selectedVariant;
        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant.id)}
            aria-pressed={isSelected}
            aria-label={`Select ${variant.label}`}
            className={`flex items-center gap-1.5 px-2 py-0.5 h-[26px] rounded text-[10px] font-medium tracking-wide border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
              isSelected
                ? 'border-teal-600 bg-teal-50/10 text-gray-800'
                : 'border-gray-300 bg-white text-gray-800 hover:border-gray-400'
            }`}
          >
            {/* Swatch image — from variant.swatchPath */}
            <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded shrink-0 overflow-hidden">
              <img
                src={variant.swatchPath}
                alt={variant.label}
                className="w-full h-full object-cover"
                onError={(e) => {
                  /* Fallback: hide broken img, show color block */
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background = getFallbackColor(variant.colorKey);
                }}
              />
            </span>
            <span>{variant.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function getFallbackColor(colorKey) {
  const map = { white: '#ffffff', grey: '#9ca3af', black: '#111827' };
  return map[colorKey] || '#e5e7eb';
}
