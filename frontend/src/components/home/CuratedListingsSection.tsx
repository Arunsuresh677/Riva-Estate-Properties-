import React from 'react';
import { Link } from 'react-router-dom';
import glassPavilion from '../../images/The Glass Pavilion.jpg';
import skylinePenthouse from '../../images/Skyline Penthouse.jpg';
import desertOasis from '../../images/Desert Oasis.jpg';
import coastalRetreat from '../../images/Coastal Retreat.jpg';

const CuratedListingsSection: React.FC = () => {
  const propertyImages = [glassPavilion, skylinePenthouse, desertOasis, coastalRetreat];

  return (
    <section className="bg-[#F9F7F2] py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10 md:mb-16">
          <div>
            <div className="font-space-mono text-sm text-[#D4755B] uppercase tracking-widest mb-3 md:mb-4">Exclusive Selection</div>
            <h2 className="font-fraunces text-3xl md:text-5xl text-[#111827]">Curated Listings</h2>
          </div>
          <Link to="/properties" className="inline-flex items-center gap-2 font-manrope font-bold text-[#D4755B] hover:gap-4 transition-all self-start sm:self-auto">
            View All Properties
            <span className="font-material-icons text-sm">arrow_forward</span>
          </Link>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6">

          {/* Large Featured Property */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] relative group">
            <div className="relative h-[280px] sm:h-[380px] lg:h-[500px]">
              <img
                src={propertyImages[0]}
                alt="The Glass Pavilion luxury villa in Ooty Tamil Nadu"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <div className="bg-[#D4755B] inline-block px-3 py-1 rounded text-white font-manrope font-bold text-xs mb-3 md:mb-4">FEATURED</div>
                <h3 className="font-fraunces text-2xl md:text-3xl text-white mb-1 md:mb-2">The Glass Pavilion</h3>
                <p className="font-manrope font-light text-white/80 mb-3 md:mb-4">Ooty, Tamil Nadu</p>
                <div className="border-t border-white/20 pt-3 md:pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="font-space-mono text-white text-lg">₹12.50 Cr</span>
                  <div className="flex items-center gap-4 md:gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                      <span className="font-material-icons text-sm">bed</span>
                      <span className="font-space-mono text-sm">6 Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-material-icons text-sm">square_foot</span>
                      <span className="font-space-mono text-sm">8,200 sqft</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skyline Penthouse */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] relative group">
            <div className="relative h-[250px] sm:h-[300px] lg:h-[500px]">
              <img
                src={propertyImages[1]}
                alt="Skyline Penthouse luxury apartment in Ooty Hills Tamil Nadu"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="font-fraunces text-xl text-white mb-1">Skyline Penthouse</h3>
                <p className="font-manrope text-sm text-white/70 mb-2 md:mb-3">Ooty Hills, Tamil Nadu</p>
                <span className="font-space-mono text-sm text-white">₹8.95 Cr</span>
              </div>
            </div>
          </div>

          {/* Desert Oasis */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)]">
            <div className="relative h-[250px] sm:h-[300px] lg:h-full lg:min-h-[400px]">
              <img
                src={propertyImages[2]}
                alt="Desert Oasis modern home in Coonoor Tamil Nadu"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="font-fraunces text-xl text-white mb-1">Desert Oasis</h3>
                <p className="font-manrope text-sm text-white/70 mb-2 md:mb-3">Coonoor, Tamil Nadu</p>
                <span className="font-space-mono text-sm text-white">₹3.20 Cr</span>
              </div>
            </div>
          </div>

          {/* Coastal Retreat */}
          <div className="md:col-span-2 lg:col-span-8 rounded-2xl overflow-hidden shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] relative">
            <div className="relative h-[280px] sm:h-[380px] lg:h-[500px]">
              <img
                src={propertyImages[3]}
                alt="Coastal Retreat mansion in Kotagiri Tamil Nadu"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <h3 className="font-fraunces text-2xl text-white mb-1 md:mb-2">Coastal Retreat</h3>
                <p className="font-manrope text-white/70 mb-4 md:mb-6">Kotagiri, Tamil Nadu</p>
                <div className="border-t border-white/20 pt-4 md:pt-6 flex items-center justify-between">
                  <span className="font-space-mono text-white text-lg">₹15.00 Cr</span>
                  <Link to="/properties" className="text-white hover:bg-white/10 p-2 rounded-full transition-all">
                    <span className="font-material-icons text-2xl">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CuratedListingsSection;
