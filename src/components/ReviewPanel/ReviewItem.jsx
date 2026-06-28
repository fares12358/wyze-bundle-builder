import React from 'react';
import QuantityStepper from '../QuantityStepper/QuantityStepper';
import PriceDisplay from '../ProductCard/PriceDisplay';
import { useBundle } from '../../context/BundleContext';
import { findProduct } from '../../utils/calculateTotals';

/**
 * ReviewItem
 * A single line item in the review panel.
 * Reads product.imagePath from the catalog to show the thumbnail.
 */
export default function ReviewItem({ item }) {
  const { catalog, setProductQty, setVariantQty } = useBundle();

  const allProducts = {
    cameras: catalog.cameras,
    plans: catalog.plans,
    sensors: catalog.sensors,
    accessories: catalog.accessories,
  };

  const product = findProduct(allProducts, item.productId);
  const imagePath = product?.imagePath ?? null;

  function handleQtyChange(newQty) {
    if (item.variantId) {
      setVariantQty(item.productId, item.variantId, newQty);
    } else {
      setProductQty(item.productId, newQty);
    }
  }

  return (
    <div className="flex items-center gap-3 w-full">
      {/* Thumbnail — product.imagePath */}
      <div className="shrink-0 w-[41px] h-[41px] rounded-[5px] bg-white overflow-hidden">
        {imagePath ? (
          <img
            src={imagePath}
            alt={item.name}
            className="w-full h-full object-contain"
            onError={(e) => { e.currentTarget.style.opacity = '0'; }}
          />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}
      </div>

      {/* Name + variant label */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-medium text-obsidian leading-4 tracking-[0.07px] truncate">
          {item.name}
          {item.variantLabel ? ` · ${item.variantLabel}` : ''}
        </p>
      </div>

      {/* Stepper */}
      <QuantityStepper
        value={item.qty}
        min={item.locked ? 1 : 0}
        onChange={handleQtyChange}
        size="sm"
        disabled={item.locked}
      />

      {/* Price */}
      <div className="shrink-0">
        <PriceDisplay
          price={item.freeLabel ? 0 : item.lineTotal}
          comparePrice={item.comparePrice != null ? item.compareLineTotal : null}
          freeLabel={item.freeLabel}
          align="right"
        />
      </div>
    </div>
  );
}
