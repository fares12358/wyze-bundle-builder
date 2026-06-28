import React from 'react';

export default function FinanceInfo({ label }) {
  return (
    <div className="bg-wyze-purple text-white text-[12px] font-medium px-2 py-[5px] rounded-[3px] inline-flex items-center whitespace-nowrap tracking-tight">
      {label}
    </div>
  );
}
