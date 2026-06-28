import React from 'react';

export default function SectionTitle({ stepNumber, totalSteps }) {
  return (
    <div className="px-4 pt-4">
      <p className="text-[12px] font-medium text-[#484848] tracking-[1.6px] uppercase">
        Step {stepNumber} of {totalSteps}
      </p>
    </div>
  );
}
