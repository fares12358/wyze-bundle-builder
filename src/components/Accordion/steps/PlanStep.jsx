import React from 'react';
import SecondaryButton from '../../Buttons/SecondaryButton';
import { useBundle } from '../../../context/BundleContext';
import { formatMonthlyPrice } from '../../../utils/formatCurrency';

/**
 * PlanStep
 * Renders plan selection cards.
 * Uses plan.iconPath → /public/icons/plan.png for the plan logo.
 */
export default function PlanStep({ onNext }) {
  const { catalog, selectedProducts, setProductQty } = useBundle();

  return (
    <div className="flex flex-col gap-4 px-4 pb-5">
      {catalog.plans.map((plan) => {
        const selection = selectedProducts[plan.id];
        const isSelected = (selection?.qty ?? 0) > 0;

        function handleSelect() {
          setProductQty(plan.id, isSelected ? 0 : 1);
        }

        return (
          <div
            key={plan.id}
            className={`bg-white rounded-[10px] p-4 border-2 cursor-pointer transition-all ${
              isSelected ? 'border-wyze-purple/70' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={handleSelect}
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSelect()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Plan logo — plan.iconPath */}
                {plan.iconPath ? (
                  <img
                    src={plan.iconPath}
                    alt={plan.name}
                    className="w-6 h-7 object-contain shrink-0"
                    onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                  />
                ) : (
                  <div className="w-6 h-7 bg-gray-200 rounded shrink-0" />
                )}
                <span className="text-[16px] font-bold text-black">
                  Cam <span className="text-wyze-purple">{plan.nameHighlight}</span>
                </span>
              </div>
              <div className="flex flex-col items-end">
                {plan.comparePrice && (
                  <span className="text-[14px] text-gray-400 line-through font-medium">
                    {formatMonthlyPrice(plan.comparePrice)}
                  </span>
                )}
                <span className="text-[14px] font-semibold text-wyze-purple">
                  {formatMonthlyPrice(plan.price)}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex justify-center pt-2">
        <SecondaryButton onClick={onNext}>
          Next: Choose your sensors
        </SecondaryButton>
      </div>
    </div>
  );
}
