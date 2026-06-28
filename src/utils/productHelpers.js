/**
 * Build the initial selectedProducts state from catalog defaults.
 */
export function buildInitialSelection(catalog) {
  const result = {};

  const addProducts = (products) => {
    products.forEach((product) => {
      if (product.hasVariants && product.variants.length > 0) {
        const variantQtys = {};
        product.variants.forEach((v) => {
          variantQtys[v.id] = 0;
        });
        // Set default quantity on the default variant
        if (product.defaultVariant && product.defaultQuantity > 0) {
          variantQtys[product.defaultVariant] = product.defaultQuantity;
        }
        result[product.id] = {
          variants: variantQtys,
          selectedVariant: product.defaultVariant,
        };
      } else {
        result[product.id] = {
          qty: product.defaultQuantity ?? 0,
        };
      }
    });
  };

  if (catalog.cameras) addProducts(catalog.cameras);
  if (catalog.plans) addProducts(catalog.plans);
  if (catalog.sensors) addProducts(catalog.sensors);
  if (catalog.accessories) addProducts(catalog.accessories);

  return result;
}

/**
 * Get quantity for a specific variant.
 */
export function getVariantQty(selection, variantId) {
  if (!selection || !selection.variants) return 0;
  return selection.variants[variantId] ?? 0;
}

/**
 * Get the currently displayed qty for a product in its active variant.
 */
export function getDisplayQty(selection) {
  if (!selection) return 0;
  if (selection.variants) {
    const activeVariant = selection.selectedVariant;
    return selection.variants[activeVariant] ?? 0;
  }
  return selection.qty ?? 0;
}
