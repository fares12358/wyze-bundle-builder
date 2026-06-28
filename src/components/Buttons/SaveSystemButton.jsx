import React from 'react';
import { saveConfiguration } from '../../utils/storage';

export default function SaveSystemButton({ selectedProducts, activeStep }) {
  function handleSave() {
    saveConfiguration({ selectedProducts, activeStep });
    // Optionally show a toast or feedback
    alert('Your system has been saved for later!');
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      className="w-full text-center text-[14px] italic text-[#484848] underline underline-offset-2 tracking-tight hover:text-wyze-purple transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded"
    >
      Save my system for later
    </button>
  );
}
