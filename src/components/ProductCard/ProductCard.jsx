import React from 'react';
import QuantityStepper from '../QuantityStepper/QuantityStepper';
import VariantSelector from '../VariantSelector/VariantSelector';
import { useBundle } from '../../context/BundleContext';
import { getVariantQty, getDisplayQty } from '../../utils/productHelpers';
import { formatCurrency } from '../../utils/formatCurrency';

/**
 * ProductCard
 * Renders one product in the builder accordion steps.
 * Uses product.imagePath from JSON → /public/images/products/<name>.png
 */

export default function ProductCard({ product }) {
  const { selectedProducts, setProductQty, setVariantQty, setSelectedVariant } = useBundle();
  const selection = selectedProducts[product.id];

  const selectedVariantId = selection?.selectedVariant ?? product.defaultVariant;

  const displayQty = selection
    ? product.hasVariants
      ? getVariantQty(selection, selectedVariantId)
      : getDisplayQty(selection)
    : 0;

  const totalQty = selection
    ? product.hasVariants
      ? Object.values(selection.variants || {}).reduce((s, v) => s + v, 0)
      : selection.qty ?? 0
    : 0;

  const isSelected = totalQty > 0;

  function handleQtyChange(newQty) {
    if (product.hasVariants) {
      setVariantQty(product.id, selectedVariantId, newQty);
    } else {
      setProductQty(product.id, newQty);
    }
  }

  function handleVariantSelect(variantId) {
    setSelectedVariant(product.id, variantId);
  }

  return (
    <div
      className={`bg-white rounded-[10px] overflow-hidden flex gap-4 p-3 transition-all ${isSelected
          ? 'border-2 border-wyze-purple/70'
          : 'border border-gray-100 hover:border-gray-300'
        }`}
    >
      {/* Product Image — from product.imagePath */}
      <div className="relative shrink-0 w-[101px] h-[137px] rounded overflow-hidden">
        <img
          src={product.imagePath}
          alt={product.name}
          className="w-full h-full object-contain"
          onError={(e) => { e.currentTarget.style.opacity = '0'; }}
        />
        {product.saveBadge && (
          <div className="absolute top-0 left-0 bg-wyze-purple text-white text-[12px] font-semibold px-2 py-0.5 rounded-[10px]">
            {product.saveBadge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5 flex-1 min-w-0">
        {/* Name + description */}
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold text-gray-900 leading-tight tracking-wide">
            {product.name}
          </p>
          <p className="text-[12px] text-gray-500 leading-[1.3] tracking-wide">
            {product.description}
            {product.learnMoreUrl && (
              <a
                href={product.learnMoreUrl}
                className="text-blue-700 underline"
                onClick={(e) => e.preventDefault()}
              >
                Learn More
              </a>
            )}
          </p>
        </div>

        {/* Variant Selector — passes swatchPath per variant */}
        {product.hasVariants && product.variants.length > 0 && (
          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariantId}
            onSelect={handleVariantSelect}
          />
        )}

        {/* Stepper + Price */}
        <div className="flex items-end gap-3 mt-auto">
          <QuantityStepper
            value={displayQty}
            min={0}
            onChange={handleQtyChange}
            size="md"
          />
          <div className="flex-1 flex flex-col items-end">
            {product.comparePrice != null && (
              <span className="text-[16px] text-red-600 line-through leading-none tracking-wide">
                {formatCurrency(product.comparePrice)}
              </span>
            )}
            <span className="text-[16px] text-gray-600 leading-none tracking-wide">
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
