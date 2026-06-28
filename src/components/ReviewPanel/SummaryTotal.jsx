import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import FinanceInfo from './FinanceInfo';

export default function SummaryTotal({ grandTotal, compareSubtotal, savings, financeInfo }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col items-end gap-2">
        {/* Finance badge */}
        {financeInfo && <FinanceInfo label={financeInfo.label} />}
      </div>

      {/* Price block */}
      <div className="flex items-baseline gap-2">
        {compareSubtotal > 0 && compareSubtotal !== grandTotal && (
          <span className="text-[18px] text-gray-400 line-through font-medium leading-5">
            {formatCurrency(compareSubtotal)}
          </span>
        )}
        <span className="text-[24px] font-bold text-wyze-purple leading-8 tracking-tight">
          {formatCurrency(grandTotal)}
        </span>
      </div>
    </div>
  );
}
