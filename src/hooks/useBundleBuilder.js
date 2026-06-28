import { useState, useCallback, useEffect } from 'react';
import catalog from '../data/products.json';
import { buildInitialSelection } from '../utils/productHelpers';
import { saveConfiguration, loadConfiguration } from '../utils/storage';
import {
  calculateSubtotal,
  calculateCompareSubtotal,
  calculateSavings,
  calculateGrandTotal,
  findProduct,
} from '../utils/calculateTotals';
import { buildReviewItems } from '../utils/reviewHelpers';

const allProducts = {
  cameras: catalog.cameras,
  plans: catalog.plans,
  sensors: catalog.sensors,
  accessories: catalog.accessories,
};

function getDefaultState() {
  return {
    selectedProducts: buildInitialSelection(catalog),
    activeStep: 0,
  };
}

export function useBundleBuilder() {
  const [selectedProducts, setSelectedProducts] = useState(() => {
    const saved = loadConfiguration();
    return saved?.selectedProducts ?? buildInitialSelection(catalog);
  });

  const [activeStep, setActiveStep] = useState(() => {
    const saved = loadConfiguration();
    return saved?.activeStep ?? 0;
  });

  // Persist to localStorage on change
  useEffect(() => {
    saveConfiguration({ selectedProducts, activeStep });
  }, [selectedProducts, activeStep]);

  /**
   * Update qty for a product without variants.
   */
  const setProductQty = useCallback((productId, qty) => {
    const product = findProduct(allProducts, productId);
    const minQty = product?.minQuantity ?? 0;
    const safeQty = Math.max(minQty, qty);

    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        qty: safeQty,
      },
    }));
  }, []);

  /**
   * Update qty for a specific variant of a product.
   */
  const setVariantQty = useCallback((productId, variantId, qty) => {
    const safeQty = Math.max(0, qty);
    setSelectedProducts((prev) => {
      const current = prev[productId] ?? { variants: {}, selectedVariant: variantId };
      return {
        ...prev,
        [productId]: {
          ...current,
          variants: {
            ...current.variants,
            [variantId]: safeQty,
          },
        },
      };
    });
  }, []);

  /**
   * Change selected variant (for display in the stepper).
   */
  const setSelectedVariant = useCallback((productId, variantId) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        selectedVariant: variantId,
      },
    }));
  }, []);

  /**
   * Go to a specific accordion step.
   */
  const goToStep = useCallback((stepIndex) => {
    setActiveStep(stepIndex);
  }, []);

  /**
   * Advance to next step.
   */
  const goToNextStep = useCallback(() => {
    setActiveStep((prev) => Math.min(prev + 1, catalog.steps.length - 1));
  }, []);

  /**
   * Toggle accordion open/close.
   */
  const toggleStep = useCallback((stepIndex) => {
    setActiveStep((prev) => (prev === stepIndex ? -1 : stepIndex));
  }, []);

  // Derived data
  const reviewGroups = buildReviewItems(selectedProducts, catalog);

  const subtotal = calculateSubtotal(selectedProducts, allProducts, catalog.shipping);
  const compareSubtotal = calculateCompareSubtotal(selectedProducts, allProducts, catalog.shipping);
  const savings = calculateSavings(subtotal, compareSubtotal);
  const grandTotal = calculateGrandTotal(subtotal);

  return {
    catalog,
    selectedProducts,
    activeStep,
    reviewGroups,
    subtotal,
    compareSubtotal,
    savings,
    grandTotal,
    setProductQty,
    setVariantQty,
    setSelectedVariant,
    goToStep,
    goToNextStep,
    toggleStep,
  };
}
