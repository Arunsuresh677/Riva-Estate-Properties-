import React, { useState } from 'react';

interface PropertiesHeaderProps {
  totalProperties?: number;
  onSortChange?: (sort: string) => void;
  onViewChange?: (view: 'grid' | 'list') => void;
}

const PropertiesHeader: React.FC<PropertiesHeaderProps> = ({
  totalProperties = 0,
  onSortChange,
  onViewChange,
}) => {
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleSortChange = (value: string) => { setSortBy(value); onSortChange?.(value); };
  const handleViewChange = (mode: 'grid' | 'list') => { setViewMode(mode); onViewChange?.(mode); };

  return (
    <div className="border-b border-[#1E3A5F] bg-[#060D1F] sticky top-16 md:top-20 z-10">
      <div className="px-4 sm:px-6 md:px-8 py-3 md:py-5">
        <div className="flex items-center justify-between gap-3">
          {/* Left */}
          <div>
            <h1 className="font-syne text-xl md:text-3xl text-white leading-tight">All Properties</h1>
            <p className="font-manrope font-extralight text-xs md:text-sm text-[#6B7280]">
              Showing {totalProperties} {totalProperties === 1 ? 'property' : 'properties'}
            </p>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* Sort */}
            <div className="flex items-center gap-1 md:gap-2">
              <span className="hidden sm:block font-manrope font-extralight text-sm text-[#6B7280]">Sort:</span>
              <select
                value={sortBy}
                onChange={e => handleSortChange(e.target.value)}
                className="bg-[#0D1B35] border border-[#1E3A5F] rounded-lg px-2 md:px-4 py-1.5 md:py-2 font-manrope text-xs md:text-sm text-[#CBD5E1] cursor-pointer focus:outline-none focus:border-[#D4755B] appearance-none pr-6 md:pr-8 bg-no-repeat"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23221410' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.5rem center',
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low–High</option>
                <option value="price-high">Price: High–Low</option>
                <option value="newest">Newest</option>
                <option value="beds">Most Beds</option>
              </select>
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-0.5 bg-[#0D1B35] rounded-lg p-0.5 md:p-1">
              {(['grid', 'list'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => handleViewChange(mode)}
                  className={`p-1.5 md:p-2 rounded transition-all ${
                    viewMode === mode ? 'bg-[#1E3A5F] text-[#D4755B] shadow-sm' : 'text-[#6B7280] hover:text-[#D4755B]'
                  }`}
                >
                  <span className="material-icons text-lg md:text-xl">
                    {mode === 'grid' ? 'grid_view' : 'view_list'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesHeader;
