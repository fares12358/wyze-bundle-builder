import React from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import SecondaryButton from '../../Buttons/SecondaryButton';
import { useBundle } from '../../../context/BundleContext';

export default function SensorsStep({ onNext }) {
  const { catalog } = useBundle();

  return (
    <div className="flex flex-col gap-4 px-4 pb-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {catalog.sensors.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center pt-2">
        <SecondaryButton onClick={onNext}>
          Next: Add extra protection
        </SecondaryButton>
      </div>
    </div>
  );
}
