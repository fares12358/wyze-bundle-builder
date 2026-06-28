import { getTotalQtyForProduct } from './calculateTotals';

/**
 * Build a flat list of review line items from selectedProducts + catalog.
 * Groups: cameras, sensors, accessories, plan.
 */
export function buildReviewItems(selectedProducts, catalog) {
  const groups = {
    cameras: [],
    sensors: [],
    accessories: [],
    plan: [],
  };

  const processProducts = (products, groupKey) => {
    products.forEach((product) => {
      const selection = selectedProducts[product.id];
      if (!selection) return;

      if (product.hasVariants && product.variants.length > 0) {
        // One line item per variant that has qty > 0
        product.variants.forEach((variant) => {
          const qty = selection.variants?.[variant.id] ?? 0;
          if (qty === 0) return;
          groups[groupKey].push({
            id: `${product.id}-${variant.id}`,
            productId: product.id,
            variantId: variant.id,
            name: product.name,
            variantLabel: variant.label,
            qty,
            price: product.freeLabel ? 0 : product.price,
            comparePrice: product.comparePrice,
            freeLabel: product.freeLabel,
            locked: product.locked,
            lineTotal: (product.freeLabel ? 0 : product.price) * qty,
            compareLineTotal: (product.comparePrice ?? product.price) * qty,
          });
        });
      } else {
        const qty = selection.qty ?? 0;
        if (qty === 0 && !product.locked) return;
        const effectiveQty = product.locked ? Math.max(qty, product.minQuantity ?? 1) : qty;
        if (effectiveQty === 0) return;

        groups[groupKey].push({
          id: product.id,
          productId: product.id,
          variantId: null,
          name: product.name,
          variantLabel: null,
          qty: effectiveQty,
          price: product.freeLabel ? 0 : product.price,
          comparePrice: product.comparePrice,
          freeLabel: product.freeLabel,
          locked: product.locked,
          lineTotal: (product.freeLabel ? 0 : product.price) * effectiveQty,
          compareLineTotal: (product.comparePrice ?? product.price) * effectiveQty,
        });
      }
    });
  };

  if (catalog.cameras) processProducts(catalog.cameras, 'cameras');
  if (catalog.sensors) processProducts(catalog.sensors, 'sensors');
  if (catalog.accessories) processProducts(catalog.accessories, 'accessories');
  if (catalog.plans) processProducts(catalog.plans, 'plan');

  return groups;
}

/**
 * Check if review panel has any items to show.
 */
export function hasAnyReviewItems(reviewGroups) {
  return Object.values(reviewGroups).some((group) => group.length > 0);
}
