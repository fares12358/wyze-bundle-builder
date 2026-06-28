import React from 'react';
import Accordion from '../components/Accordion/Accordion';
import ReviewPanel from '../components/ReviewPanel/ReviewPanel';

export default function BuilderLayout() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <header className="px-6 py-5 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-obsidian tracking-tight">
          Let's get started!
        </h1>
      </header>

      {/* Main content: builder + review */}
      <main className="flex flex-col lg:flex-row gap-5 px-4 sm:px-6 lg:px-8 py-6 max-w-[1440px] mx-auto">
        {/* Builder (accordion) column */}
        <div className="flex-1 min-w-0 order-1">
          <Accordion />
        </div>

        {/* Review panel column */}
        <div className="w-full lg:w-[420px] shrink-0 order-2 ">
          <div className="lg:sticky lg:top-6">
            <ReviewPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
