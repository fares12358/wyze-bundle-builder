import React from 'react';
import ReviewItem from './ReviewItem';
import ShippingRow from './ShippingRow';
import GuaranteeBadge from './GuaranteeBadge';
import SummaryTotal from './SummaryTotal';
import PrimaryButton from '../Buttons/PrimaryButton';
import SaveSystemButton from '../Buttons/SaveSystemButton';
import { useBundle } from '../../context/BundleContext';
import { formatCurrency, formatMonthlyPrice } from '../../utils/formatCurrency';

const GROUP_LABELS = {
  cameras: 'Cameras',
  sensors: 'Sensors',
  accessories: 'Accessories',
  plan: 'Plan',
};

export default function ReviewPanel() {
  const {
    catalog,
    reviewGroups,
    subtotal,
    compareSubtotal,
    savings,
    grandTotal,
    selectedProducts,
    activeStep,
  } = useBundle();

  const hasItems = Object.values(reviewGroups).some((g) => g.length > 0);

  /* Find the plan product to get its iconPath */
  const planProduct = catalog.plans?.[0];

  return (
    <div className="bg-blue-50 rounded-[10px] flex flex-col pt-4">
      {/* Header label */}
      <div className="px-4 pb-0">
        <p className="text-[12px] font-medium text-[#484848] tracking-[1.6px] uppercase mb-0">
          Review
        </p>
      </div>

      <div className="px-5 pb-8 flex flex-col gap-4 mt-3">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <h2 className="text-[22px] font-semibold text-gray-900 tracking-wide leading-none">
            Your security system
          </h2>
          <p className="text-[14px] text-gray-500 leading-[1.3]">
            Review your personalized protection system designed to keep what matters most safe.
          </p>
        </div>

        {/* Review groups */}
        {!hasItems ? (
          <p className="text-[14px] text-gray-400 italic py-4 text-center">
            Add products to see your bundle here.
          </p>
        ) : (
          <div className="flex flex-col gap-0">
            {Object.entries(reviewGroups).map(([groupKey, items]) => {
              if (items.length === 0) return null;

              return (
                <div key={groupKey} className="border-t border-gray-200 pt-4 pb-2 flex flex-col gap-2">
                  <p className="text-[12px] self-start font-normal text-[#A8B2BD] uppercase tracking-[0.36px] text-center">
                    {GROUP_LABELS[groupKey]}
                  </p>

                  {groupKey === 'plan' ? (
                    /* Plan row — shows plan iconPath as logo */
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {planProduct?.iconPath ? (
                          <img
                            src={planProduct.iconPath}
                            alt={planProduct.name}
                            className="w-5 h-6 object-contain shrink-0"
                            onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                          />
                        ) : (
                          <div className="w-5 h-5 bg-gray-200 rounded shrink-0" />
                        )}
                        <span className="text-[16px] font-bold text-black">
                          Cam <span className="text-wyze-purple">Unlimited</span>
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        {items[0]?.comparePrice != null && (
                          <span className="text-[14px] text-gray-400 line-through leading-4">
                            {formatMonthlyPrice(items[0].comparePrice)}
                          </span>
                        )}
                        <span className="text-[14px] font-semibold text-wyze-purple leading-4">
                          {formatMonthlyPrice(items[0]?.price)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col  gap-3">
                      {items.map((item) => (
                        <ReviewItem key={item.id} item={item} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Shipping row — uses shipping.iconPath */}
            <ShippingRow shipping={catalog.shipping} />
          </div>
        )}

        {/* Summary section */}
        <div className="flex flex-col gap-2 pt-2">
          {/* Guarantee badge — uses guarantee.badgePath */}
          <GuaranteeBadge guarantee={catalog.guarantee} />

          {/* Finance + totals */}
          <SummaryTotal
            grandTotal={grandTotal}
            compareSubtotal={compareSubtotal}
            savings={savings}
            financeInfo={catalog.financeInfo}
          />

          {/* Savings message */}
          {savings > 0.01 && (
            <p className="text-[12px] font-semibold text-teal-600 text-center tracking-tight">
              Congrats! You're saving {formatCurrency(savings)} on your security bundle!
            </p>
          )}

          {/* Checkout */}
          <PrimaryButton onClick={() => alert('Proceeding to checkout!')}>
            Checkout
          </PrimaryButton>

          {/* Save system */}
          <SaveSystemButton selectedProducts={selectedProducts} activeStep={activeStep} />
        </div>
      </div>
    </div>
  );
}
