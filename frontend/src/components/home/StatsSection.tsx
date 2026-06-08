import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="bg-[#F0EBE5] border-y border-[rgba(212,117,91,0.05)] py-8 md:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 divide-x divide-[rgba(212,117,91,0.1)]">
          <div className="text-center px-2">
            <div className="font-space-mono font-bold text-2xl sm:text-3xl md:text-4xl text-[#D4755B] mb-1 md:mb-2">2,450+</div>
            <div className="font-syne font-medium text-xs sm:text-sm text-[#6b7280] uppercase tracking-wider">Properties Sold</div>
          </div>
          <div className="text-center px-2">
            <div className="font-space-mono font-bold text-2xl sm:text-3xl md:text-4xl text-[#D4755B] mb-1 md:mb-2">98%</div>
            <div className="font-syne font-medium text-xs sm:text-sm text-[#6b7280] uppercase tracking-wider">Client Satisfaction</div>
          </div>
          <div className="text-center px-2">
            <div className="font-space-mono font-bold text-2xl sm:text-3xl md:text-4xl text-[#D4755B] mb-1 md:mb-2">150+</div>
            <div className="font-syne font-medium text-xs sm:text-sm text-[#6b7280] uppercase tracking-wider">Cities Covered</div>
          </div>
          <div className="text-center px-2">
            <div className="font-space-mono font-bold text-xl sm:text-2xl md:text-4xl text-[#D4755B] mb-1 md:mb-2 leading-tight">₹1,200 Cr</div>
            <div className="font-syne font-medium text-xs sm:text-sm text-[#6b7280] uppercase tracking-wider">Market Value</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
