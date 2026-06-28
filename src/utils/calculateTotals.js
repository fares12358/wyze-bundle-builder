/**
 * Given the selectedProducts map and product catalog, compute totals.
 *
 * selectedProducts shape:
 * {
 *   [productId]: {
 *     variants: { [variantId]: number },  // qty per variant
 *     qty: number,                        // for products without variants
 *   }
 * }
 */

export function getTotalQtyForProduct(selection) {
  if (!selection) return 0;
  if (selection.variants) {
    return Object.values(selection.variants).reduce((sum, q) => sum + q, 0);
  }
  return selection.qty || 0;
}

/**
 * Calculate the subtotal at the discounted (bundle) price.
 */
export function calculateSubtotal(selectedProducts, allProducts, shipping) {
  let total = 0;

  Object.entries(selectedProducts).forEach(([productId, selection]) => {
    const product = findProduct(allProducts, productId);
    if (!product) return;

    const qty = getTotalQtyForProduct(selection);
    if (qty === 0) return;

    const price = product.freeLabel ? 0 : product.price;
    total += price * qty;
  });

  // Add shipping if paid
  if (shipping && shipping.price > 0) {
    total += shipping.price;
  }

  return total;
}

/**
 * Calculate the compare (original) subtotal.
 */
export function calculateCompareSubtotal(selectedProducts, allProducts, shipping) {
  let total = 0;

  Object.entries(selectedProducts).forEach(([productId, selection]) => {
    const product = findProduct(allProducts, productId);
    if (!product) return;

    const qty = getTotalQtyForProduct(selection);
    if (qty === 0) return;

    const comparePrice = product.comparePrice ?? product.price;
    total += comparePrice * qty;
  });

  // Add compare shipping
  if (shipping && shipping.comparePrice) {
    total += shipping.comparePrice;
  }

  return total;
}

/**
 * Calculate savings = compareSubtotal - subtotal.
 */
export function calculateSavings(subtotal, compareSubtotal) {
  return Math.max(0, compareSubtotal - subtotal);
}

/**
 * Grand total = subtotal (savings already baked in).
 */
export function calculateGrandTotal(subtotal) {
  return subtotal;
}

/**
 * Helper: find a product by id across all catalog categories.
 */
export function findProduct(allProducts, productId) {
  const categories = ['cameras', 'sensors', 'accessories', 'plans'];
  for (const cat of categories) {
    if (!allProducts[cat]) continue;
    const found = allProducts[cat].find((p) => p.id === productId);
    if (found) return found;
  }
  return null;
}

/**
 * Count unique products selected (ignoring quantity).
 */
export function countSelectedInStep(selectedProducts, stepProductIds) {
  return stepProductIds.filter((id) => {
    const sel = selectedProducts[id];
    if (!sel) return false;
    return getTotalQtyForProduct(sel) > 0;
  }).length;
}
