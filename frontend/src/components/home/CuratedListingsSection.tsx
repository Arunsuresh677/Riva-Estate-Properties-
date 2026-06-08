import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import glassPavilion from '../../images/The Glass Pavilion.jpg';
import skylinePenthouse from '../../images/Skyline Penthouse.jpg';
import desertOasis from '../../images/Desert Oasis.jpg';
import coastalRetreat from '../../images/Coastal Retreat.jpg';

const properties = [
  {
    image: glassPavilion,
    title: 'The Glass Pavilion',
    location: 'Montecito, California',
    price: '$12,500,000',
    beds: 6,
    sqft: '8,200',
    tag: 'FEATURED',
  },
  {
    image: skylinePenthouse,
    title: 'Skyline Penthouse',
    location: 'New York, NY',
    price: '$8,950,000',
    beds: 4,
    sqft: '5,100',
    tag: 'LUXURY',
  },
  {
    image: desertOasis,
    title: 'Desert Oasis',
    location: 'Joshua Tree, CA',
    price: '$3,200,000',
    beds: 3,
    sqft: '3,400',
    tag: 'EXCLUSIVE',
  },
  {
    image: coastalRetreat,
    title: 'Coastal Retreat',
    location: 'Malibu, California',
    price: '$15,000,000',
    beds: 7,
    sqft: '10,500',
    tag: 'PREMIUM',
  },
];

const CuratedListingsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [displayed, setDisplayed] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number, dir: 'next' | 'prev') => {
    if (flipping) return;
    setDirection(dir);
    setFlipping(true);
    setTimeout(() => {
      setDisplayed(index);
      setCurrent(index);
      setFlipping(false);
    }, 500);
  };

  const next = () => goTo((current + 1) % properties.length, 'next');
  const prev = () => goTo((current - 1 + properties.length) % properties.length, 'prev');

  useEffect(() => {
    autoRef.current = setInterval(next, 4000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [current, flipping]);

  const prop = properties[displayed];

  return (
    <section className="bg-[#F9F7F2] py-24 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 relative z-10">

        {/* Section Header */}
        <div className="flex justify-between items-center mb-16">
          <div>
            <div className="font-space-mono text-sm text-[#D4755B] uppercase tracking-widest mb-4">Exclusive Selection</div>
            <h2 className="font-fraunces text-5xl text-[#111827]">Curated Listings</h2>
          </div>
          <Link to="/properties" className="flex items-center gap-2 font-manrope font-bold text-[#D4755B] hover:gap-4 transition-all">
            View All Properties
            <span className="material-icons text-sm">arrow_forward</span>
          </Link>
        </div>

        {/* 3D Flip Slideshow */}
        <div className="relative w-full" style={{ perspective: '1200px' }}>
          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
            style={{
              height: '580px',
              transformStyle: 'preserve-3d',
              transition: flipping ? 'transform 0.5s ease' : 'none',
              transform: flipping
                ? direction === 'next'
                  ? 'rotateY(-90deg)'
                  : 'rotateY(90deg)'
                : 'rotateY(0deg)',
            }}
          >
            {/* Image */}
            <img
              src={prop.image}
              alt={prop.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            {/* Tag */}
            <div className="absolute top-6 left-6">
              <span className="bg-[#D4755B] text-white font-manrope font-bold text-xs px-3 py-1 rounded">
                {prop.tag}
              </span>
            </div>

            {/* Slide Counter */}
            <div className="absolute top-6 right-6 font-space-mono text-white/70 text-sm">
              {String(displayed + 1).padStart(2, '0')} / {String(properties.length).padStart(2, '0')}
            </div>

            {/* Property Info */}
            <div className="absolute bottom-0 left-0 right-0 p-10">
              <h3 className="font-fraunces text-4xl text-white mb-2">{prop.title}</h3>
              <p className="font-manrope font-light text-white/75 mb-6">{prop.location}</p>
              <div className="border-t border-white/20 pt-6 flex items-center justify-between">
                <span className="font-space-mono text-2xl text-white">{prop.price}</span>
                <div className="flex items-center gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-sm">bed</span>
                    <span className="font-space-mono text-sm">{prop.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-icons text-sm">square_foot</span>
                    <span className="font-space-mono text-sm">{prop.sqft} sqft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prev / Next Buttons */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all shadow-lg"
          >
            <span className="material-icons">chevron_left</span>
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all shadow-lg"
          >
            <span className="material-icons">chevron_right</span>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {properties.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              className={`transition-all rounded-full ${
                i === current
                  ? 'w-8 h-2 bg-[#D4755B]'
                  : 'w-2 h-2 bg-[#D4755B]/30 hover:bg-[#D4755B]/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedListingsSection;