import React from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import PrimaryButton from '../../Buttons/PrimaryButton';
import { useBundle } from '../../../context/BundleContext';

export default function AccessoriesStep() {
  const { catalog } = useBundle();

  return (
    <div className="flex flex-col gap-4 px-4 pb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {catalog.accessories.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center pt-2">
        <PrimaryButton onClick={() => alert('Review your bundle and checkout!')}>
          Review &amp; Checkout
        </PrimaryButton>
      </div>
    </div>
  );
}
