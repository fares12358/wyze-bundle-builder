import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

/**
 * PriceDisplay
 * Props:
 *   price        - number (discounted/current price)
 *   comparePrice - number|null (original price to strike through)
 *   freeLabel    - bool (show FREE instead of price)
 *   align        - 'left' | 'right' (default 'right')
 *   size         - 'sm' | 'md'
 */
export default function PriceDisplay({ price, comparePrice, freeLabel, align = 'right', size = 'sm' }) {
  const alignClass = align === 'right' ? 'items-end text-right' : 'items-start';
  const textSize = size === 'md' ? 'text-base' : 'text-sm';

  return (
    <div className={`flex flex-col ${alignClass} gap-0`}>
      {comparePrice != null && (
        <span className={`${textSize} text-gray-400 line-through font-medium leading-4 whitespace-nowrap`}>
          {formatCurrency(comparePrice)}
        </span>
      )}
      {freeLabel ? (
        <span className={`${textSize} font-semibold text-wyze-purple leading-4 whitespace-nowrap`}>FREE</span>
      ) : (
        <span className={`${textSize} font-semibold text-wyze-purple leading-4 whitespace-nowrap`}>
          {formatCurrency(price)}
        </span>
      )}
    </div>
  );
}
