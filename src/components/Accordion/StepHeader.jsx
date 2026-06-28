import React from 'react';

/**
 * StepHeader
 * Renders the clickable accordion header row.
 * step.iconPath → resolved from /public/icons/<name>.png
 */
export default function StepHeader({ step, title, iconPath, selectedCount, isOpen, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="w-full flex items-center justify-between px-4 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-400"
    >
      {/* Left: icon + title */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="shrink-0 w-[26px] h-[26px] flex items-center justify-center">
          {iconPath ? (
            <img
              src={iconPath}
              alt={title}
              className="w-full h-full object-contain"
            />
          ) : (
            /* Fallback placeholder if image missing */
            <div className="w-6 h-6 rounded bg-gray-300 opacity-60" />
          )}
        </div>
        <span className="text-[22px] font-semibold text-obsidian leading-none">
          {title}
        </span>
      </div>

      {/* Right: selected count + chevron */}
      <div className="flex items-center gap-1 shrink-0">
        {selectedCount > 0 && (
          <span className="text-[14px] font-medium text-wyze-purple whitespace-nowrap">
            {selectedCount} selected
          </span>
        )}
        <div className="w-3 h-3 flex items-center justify-center ml-1">
          <svg
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-[10px] h-[7px] transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`}
          >
            <path
              d="M1 6L5 2L9 6"
              stroke="#4E2FD2"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
