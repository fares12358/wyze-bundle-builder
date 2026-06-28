import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

/**
 * ShippingRow
 * shipping.iconPath → /public/icons/delivery.png
 */
export default function ShippingRow({ shipping }) {
  return (
    <div className="flex items-center gap-3 w-full pt-3 border-t border-gray-200">
      {/* Delivery icon — shipping.iconPath */}
      <div className="shrink-0 w-[41px] h-[41px] rounded-[5px] bg-white flex items-center justify-center overflow-hidden">
        {shipping.iconPath ? (
          <img
            src={shipping.iconPath}
            alt={shipping.label}
            className="w-[29px] h-[29px] object-contain"
            onError={(e) => { e.currentTarget.style.opacity = '0'; }}
          />
        ) : (
          <span className="text-gray-300 text-xs">📦</span>
        )}
      </div>

      <p className="flex-1 text-[14px] font-medium text-obsidian leading-4 tracking-[0.07px]">
        {shipping.label}
      </p>

      <div className="flex flex-col items-end shrink-0">
        {shipping.comparePrice != null && (
          <span className="text-[14px] text-gray-400 line-through font-medium leading-4">
            {formatCurrency(shipping.comparePrice)}
          </span>
        )}
        <span className="text-[14px] font-semibold text-wyze-purple leading-4">
          {shipping.price === 0 ? 'FREE' : formatCurrency(shipping.price)}
        </span>
      </div>
    </div>
  );
}
