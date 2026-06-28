import React from 'react';
import AccordionStep from './AccordionStep';
import { useBundle } from '../../context/BundleContext';
import { countSelectedInStep } from '../../utils/calculateTotals';

export default function Accordion() {
  const { catalog, selectedProducts, activeStep, toggleStep, goToNextStep } = useBundle();

  const steps = catalog.steps;
  const totalSteps = steps.length;

  // Map step id → product ids for counting selected
  const stepProductMap = {
    cameras: catalog.cameras.map((p) => p.id),
    plan: catalog.plans.map((p) => p.id),
    sensors: catalog.sensors.map((p) => p.id),
    accessories: catalog.accessories.map((p) => p.id),
  };

  return (
    <div className="flex flex-col gap-3">
      {steps.map((step, index) => {
        const isOpen = activeStep === index;
        const productIds = stepProductMap[step.id] || [];
        const selectedCount = countSelectedInStep(selectedProducts, productIds);

        return (
          <AccordionStep
            key={step.id}
            step={step}
            stepIndex={index}
            totalSteps={totalSteps}
            isOpen={isOpen}
            selectedCount={selectedCount}
            onToggle={() => toggleStep(index)}
            onNext={goToNextStep}
          />
        );
      })}
    </div>
  );
}
