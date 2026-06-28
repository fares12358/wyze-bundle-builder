import React from 'react';

/**
 * GuaranteeBadge
 * guarantee.badgePath → /public/images/guarantee-badge.png
 */
export default function GuaranteeBadge({ guarantee }) {
  return (
    <div className="flex items-center gap-4 w-full">
      {/* Badge image — guarantee.badgePath */}
      <div className="shrink-0 w-[78px] h-[78px] rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
        {guarantee.badgePath ? (
          <img
            src={guarantee.badgePath}
            alt="Satisfaction guarantee"
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.opacity = '0'; }}
          />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}
      </div>

      <p className="flex-1 text-[12px] text-gray-500 leading-[1.4]">
        {guarantee.text}
      </p>
    </div>
  );
}
