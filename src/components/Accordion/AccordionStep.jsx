import React from 'react';
import SectionTitle from './SectionTitle';
import StepHeader from './StepHeader';
import CamerasStep from './steps/CamerasStep';
import PlanStep from './steps/PlanStep';
import SensorsStep from './steps/SensorsStep';
import AccessoriesStep from './steps/AccessoriesStep';

const STEP_CONTENT = {
  cameras: CamerasStep,
  plan: PlanStep,
  sensors: SensorsStep,
  accessories: AccessoriesStep,
};

/**
 * AccordionStep
 * One expandable step in the accordion.
 * Receives step.iconPath and passes it to StepHeader for <img> rendering.
 */
export default function AccordionStep({
  step,
  totalSteps,
  isOpen,
  selectedCount,
  onToggle,
  onNext,
}) {
  const StepContent = STEP_CONTENT[step.id];

  return (
    <div className={`${isOpen ? 'bg-blue-50' : ''} rounded-[10px] overflow-hidden`}>
      {/* "Step X of 4" label */}
      <SectionTitle stepNumber={step.step} totalSteps={totalSteps} />

      {/* Top divider */}
      <div className="border-t border-[#1f1f1f]/30 mx-0 mt-2" />

      {/* Clickable header — passes iconPath so StepHeader shows the img */}
      <StepHeader
        step={step}
        title={step.title}
        iconPath={step.iconPath}
        selectedCount={selectedCount}
        isOpen={isOpen}
        onToggle={onToggle}
      />

      {/* Expandable content */}
      {isOpen && StepContent && (
        <div className="">
          <StepContent onNext={onNext} />
        </div>
      )}

    </div>
  );
}
