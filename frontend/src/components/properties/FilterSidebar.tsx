import React, { useState, useEffect, useRef } from 'react';

interface FilterSidebarProps {
  onFilterChange?: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isFirstRender = useRef(true);

  const propertyTypes = [
    { id: 'apartment', label: 'Apartment', icon: 'apartment' },
    { id: 'house', label: 'House', icon: 'house' },
    { id: 'villa', label: 'Villa', icon: 'villa' },
    { id: 'office', label: 'Office', icon: 'business' },
  ];

  const amenitiesList = [
    'Parking', 'Swimming Pool', 'Gym', 'Garden', 'Security',
    'Clubhouse', 'Power Backup', 'Lift', 'Balcony', 'CCTV Surveillance',
    'Children Play Area', 'Gated Community',
  ];

  const formatPriceLabel = (value: number): string => {
    if (value >= 200) return '20+ Cr';
    if (value >= 10) return `${(value / 10).toFixed(value % 10 === 0 ? 0 : 1)} Cr`;
    return `${value * 10} L`;
  };

  const activeFilterCount = [
    selectedLocation,
    selectedAvailability,
    ...selectedPropertyType,
    ...selectedAmenities,
    bedrooms > 0 ? 'bed' : '',
    bathrooms > 0 ? 'bath' : '',
    priceRange[0] > 0 || priceRange[1] < 200 ? 'price' : '',
  ].filter(Boolean).length;

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const filters: any = {};
    if (selectedLocation) filters.location = selectedLocation;
    if (selectedPropertyType.length > 0) filters.propertyType = selectedPropertyType;
    if (selectedAvailability) filters.availability = selectedAvailability;
    if (priceRange[0] > 0 || priceRange[1] < 200) filters.priceRange = priceRange;
    if (bedrooms > 0) filters.bedrooms = bedrooms;
    if (bathrooms > 0) filters.bathrooms = bathrooms;
    if (selectedAmenities.length > 0) filters.amenities = selectedAmenities;
    onFilterChange?.(filters);
  }, [selectedLocation, selectedPropertyType, selectedAvailability, priceRange, bedrooms, bathrooms, selectedAmenities]);

  // Close drawer on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleReset = () => {
    setSelectedLocation('');
    setSelectedPropertyType([]);
    setSelectedAvailability('');
    setPriceRange([0, 200]);
    setBedrooms(0);
    setBathrooms(0);
    setSelectedAmenities([]);
    onFilterChange?.({});
  };

  const togglePropertyType = (type: string) => {
    setSelectedPropertyType(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const FilterContent = () => (
    <div className="p-5 md:p-6 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-manrope font-semibold text-base text-[#E2E8F0]">Refine Your Search</h2>
        <button onClick={handleReset} className="font-manrope text-sm text-[#D4755B] hover:underline">
          Reset all
        </button>
      </div>

      {/* Location */}
      <div className="mb-6 pb-6 border-b border-[#1E3A5F]">
        <h3 className="font-manrope font-bold text-xs text-[#E2E8F0] mb-3 uppercase tracking-wider">Location</h3>
        <div className="relative">
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-lg">location_on</span>
          <input
            type="text"
            value={selectedLocation}
            onChange={e => setSelectedLocation(e.target.value)}
            placeholder="City, neighborhood..."
            className="w-full pl-9 pr-4 py-2.5 border border-[#E6E0DA] rounded-xl font-manrope text-sm text-[#E2E8F0] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#D4755B] transition-colors"
          />
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6 pb-6 border-b border-[#1E3A5F]">
        <h3 className="font-manrope font-bold text-xs text-[#E2E8F0] mb-3 uppercase tracking-wider">Availability</h3>
        <div className="flex gap-3">
          {['buy', 'rent'].map(type => (
            <button
              key={type}
              onClick={() => setSelectedAvailability(selectedAvailability === type ? '' : type)}
              className={`flex-1 py-2.5 rounded-xl border font-manrope font-bold text-sm capitalize transition-all ${
                selectedAvailability === type
                  ? 'bg-[#D4755B] border-[#D4755B] text-white shadow-md'
                  : 'bg-[#0D1B35] border-[#1E3A5F] text-[#94A3B8] hover:border-[#D4755B]'
              }`}
            >
              {type === 'buy' ? 'Buy' : 'Rent'}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-[#1E3A5F]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-manrope font-bold text-xs text-[#E2E8F0] uppercase tracking-wider">Price Range</h3>
          <span className="font-manrope text-xs text-[#D4755B] font-semibold">
            ₹{formatPriceLabel(priceRange[0])} – {formatPriceLabel(priceRange[1])}
          </span>
        </div>
        <label className="font-manrope text-xs text-[#9CA3AF] mb-1 block">Min</label>
        <input type="range" min="0" max="200" step="1" value={priceRange[0]}
          onChange={e => { const v = parseInt(e.target.value); if (v < priceRange[1]) setPriceRange([v, priceRange[1]]); }}
          className="w-full h-1.5 bg-[#1E3A5F] rounded-full appearance-none cursor-pointer accent-[#D4755B] mb-3"
        />
        <label className="font-manrope text-xs text-[#9CA3AF] mb-1 block">Max</label>
        <input type="range" min="0" max="200" step="1" value={priceRange[1]}
          onChange={e => { const v = parseInt(e.target.value); if (v > priceRange[0]) setPriceRange([priceRange[0], v]); }}
          className="w-full h-1.5 bg-[#1E3A5F] rounded-full appearance-none cursor-pointer accent-[#D4755B]"
        />
        <div className="flex justify-between mt-1">
          <span className="font-manrope text-xs text-[#9CA3AF]">₹0</span>
          <span className="font-manrope text-xs text-[#9CA3AF]">₹20 Cr+</span>
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-6 pb-6 border-b border-[#1E3A5F]">
        <h3 className="font-manrope font-bold text-xs text-[#E2E8F0] mb-3 uppercase tracking-wider">Property Type</h3>
        <div className="grid grid-cols-2 gap-3">
          {propertyTypes.map(type => (
            <button key={type.id} onClick={() => togglePropertyType(type.label)}
              className={`h-[72px] rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                selectedPropertyType.includes(type.label)
                  ? 'bg-[#D4755B] border-[#D4755B] text-white shadow-md'
                  : 'bg-white border-[#E6E0DA] text-[#6B7280] hover:border-[#D4755B] hover:text-[#D4755B]'
              }`}
            >
              <span className="material-icons text-2xl">{type.icon}</span>
              <span className="font-manrope font-medium text-sm">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div className="mb-6 pb-6 border-b border-[#1E3A5F]">
        <h3 className="font-manrope font-bold text-xs text-[#E2E8F0] mb-3 uppercase tracking-wider">Bedrooms</h3>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5].map(num => (
            <button key={num} onClick={() => setBedrooms(num)}
              className={`flex-1 h-9 rounded-lg font-manrope font-bold text-sm border transition-all ${
                bedrooms === num ? 'bg-[#D4755B] border-[#D4755B] text-white' : 'bg-[#0D1B35] border-[#1E3A5F] text-[#94A3B8] hover:border-[#D4755B]'
              }`}
            >
              {num === 0 ? 'Any' : num === 5 ? '5+' : num}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div className="mb-6 pb-6 border-b border-[#1E3A5F]">
        <h3 className="font-manrope font-bold text-xs text-[#E2E8F0] mb-3 uppercase tracking-wider">Bathrooms</h3>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map(num => (
            <button key={num} onClick={() => setBathrooms(num)}
              className={`flex-1 h-9 rounded-lg font-manrope font-bold text-sm border transition-all ${
                bathrooms === num ? 'bg-[#D4755B] border-[#D4755B] text-white' : 'bg-[#0D1B35] border-[#1E3A5F] text-[#94A3B8] hover:border-[#D4755B]'
              }`}
            >
              {num === 0 ? 'Any' : num === 4 ? '4+' : num}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h3 className="font-manrope font-bold text-xs text-[#E2E8F0] mb-3 uppercase tracking-wider">Amenities</h3>
        <div className="grid grid-cols-2 gap-2">
          {amenitiesList.map(amenity => (
            <label key={amenity}
              className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
                selectedAmenities.includes(amenity)
                  ? 'bg-[rgba(212,117,91,0.05)] border-[#D4755B]'
                  : 'bg-[#0D1B35] border-[#1E3A5F] hover:border-[#D4755B]'
              }`}
            >
              <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                selectedAmenities.includes(amenity) ? 'bg-[#D4755B] border-[#D4755B]' : 'bg-[#0D1B35] border-[#1E3A5F]'
              }`}>
                {selectedAmenities.includes(amenity) && (
                  <span className="material-icons text-white" style={{ fontSize: '10px' }}>check</span>
                )}
              </div>
              <input type="checkbox" className="hidden" checked={selectedAmenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} />
              <span className={`font-manrope text-xs leading-tight ${selectedAmenities.includes(amenity) ? 'text-[#D4755B] font-semibold' : 'text-[#94A3B8]'}`}>
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button — visible only on small screens */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 bg-[#D4755B] text-white font-manrope font-bold px-6 py-3 rounded-full shadow-xl hover:bg-[#B86851] transition-all"
        >
          <span className="material-icons text-lg">tune</span>
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-white text-[#D4755B] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ml-1">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="relative ml-auto w-[88%] max-w-sm bg-[#0A1628] h-full overflow-y-auto shadow-2xl">
            {/* Drawer Header */}
            <div className="sticky top-0 bg-[#0A1628] border-b border-[#1E3A5F] px-5 py-4 flex items-center justify-between z-10">
              <h2 className="font-syne font-bold text-lg text-[#E2E8F0]">Filters</h2>
              <button onClick={() => setMobileOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F1E8] transition-colors">
                <span className="material-icons text-[#94A3B8]">close</span>
              </button>
            </div>
            <FilterContent />
            {/* Sticky Apply Button */}
            <div className="sticky bottom-0 bg-[#0A1628] border-t border-[#1E3A5F] p-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full bg-[#D4755B] text-white font-manrope font-bold py-3.5 rounded-xl hover:bg-[#B86851] transition-all shadow-lg"
              >
                Show Results {activeFilterCount > 0 ? `(${activeFilterCount} filters)` : ''}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-[280px] lg:w-[340px] bg-[#0A1628] border-r border-[#1E3A5F] h-screen sticky top-20 overflow-y-auto pb-24 shrink-0">
        <FilterContent />
        {/* Sticky Reset */}
        <div className="sticky bottom-0 bg-[#0A1628] border-t border-[#1E3A5F] p-4">
          <button
            onClick={handleReset}
            className="w-full bg-transparent border border-[#D4755B] text-[#D4755B] font-manrope font-bold text-base py-3.5 rounded-xl transition-all hover:bg-[#D4755B] hover:text-white"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
