import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const slideshowImages = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
];

const words = ["Discover", "Your", "Dream", "Home", "with", "AI", "Intelligence"];

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ['0%', '30%']);
  const bgOpacity = useTransform(scrollY, [0, 480], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-20 pb-32 overflow-hidden min-h-screen">

      {/* FULL BACKGROUND SLIDESHOW */}
      <motion.div style={{ y: bgY, opacity: bgOpacity }} className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <img
              src={slideshowImages[current]}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1117]/80 via-[#1a1208]/65 to-[#2C1810]/55" />
      </motion.div>

      {/* Decorative blurs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-14 w-64 h-64 bg-[rgba(212,117,91,0.2)] rounded-full blur-[48px] z-[1]"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2], x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[738px] bottom-22 w-64 h-64 bg-[rgba(180,120,60,0.15)] rounded-full blur-[48px] z-[1]"
      />

      <div className="max-w-[1280px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/10 border border-[#D4755B]/40 backdrop-blur-sm rounded-full px-4 py-2 mb-10"
            >
              <div className="w-2 h-2 bg-[#D4755B] rounded-full animate-pulse" />
              <span className="font-manrope font-bold text-xs text-[#D4755B] uppercase tracking-wider">
                AI-Powered Real Estate
              </span>
            </motion.div>

            {/* Staggered Headline */}
            <h1 className="font-fraunces text-[56px] lg:text-[70px] leading-[1.1] text-white mb-8">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: "easeOut" }}
                  className={`inline-block mr-[0.25em] ${
                    word === 'Dream' || word === 'Home' ? 'italic text-[#D4755B]' : ''
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="font-manrope font-light text-xl leading-7 text-white/75 mb-12 max-w-[520px]"
            >
              Experience the future of real estate. Our proprietary AI curates the market's
              finest listings tailored specifically to your lifestyle, removing the noise from
              your property search.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                to="/properties"
                className="bg-[#D4755B] text-white font-manrope font-bold text-lg px-8 py-4 rounded-xl shadow-[0px_10px_30px_-3px_rgba(212,117,91,0.5)] hover:bg-[#B86851] transition-all hover:shadow-[0px_15px_35px_-3px_rgba(212,117,91,0.6)] inline-flex items-center gap-2"
              >
                Explore Properties
                <span className="material-icons text-sm">arrow_forward</span>
              </Link>
              <Link
                to="/ai-hub"
                className="border border-white/25 text-white font-manrope font-bold text-lg px-8 py-4 rounded-xl hover:border-[#D4755B]/60 hover:bg-white/5 backdrop-blur-sm bg-white/8 transition-all inline-flex items-center gap-2"
              >
                <span className="material-icons text-xl text-[#D4755B]">smart_toy</span>
                {import.meta.env.PROD ? 'AI Property Hub' : 'Try AI Search'}
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="flex -space-x-2">
                {slideshowImages.slice(0, 3).map((img, i) => (
                  <img key={i} src={img} alt="" className="w-10 h-10 rounded-full border-2 border-white/20 object-cover" />
                ))}
                <div className="w-10 h-10 bg-[#D4755B]/20 border-2 border-[#D4755B]/40 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="font-manrope font-bold text-xs text-white">+2k</span>
                </div>
              </div>
              <div>
                <span className="font-manrope text-sm text-white/70">Join </span>
                <span className="font-manrope font-bold text-sm text-white">2,000+</span>
                <span className="font-manrope text-sm text-white/70"> happy homeowners</span>
              </div>
            </motion.div>

            {/* Dot Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="flex gap-2"
            >
              {slideshowImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full h-[3px] ${
                    i === current
                      ? 'w-8 bg-[#D4755B]'
                      : 'w-4 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </motion.div>
          </div>

          {/* Right — Property Card Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            {/* Glow effect behind card */}
            <div className="absolute -inset-4 bg-[#D4755B]/20 rounded-3xl blur-2xl" />

            <div className="relative rounded-2xl overflow-hidden shadow-[0px_32px_64px_-12px_rgba(0,0,0,0.6)] border border-white/10">
              <div className="relative h-[580px]">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={current}
                    src={slideshowImages[current]}
                    alt="Property"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1.0 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Card gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Property Info Overlay */}
                <motion.div
                  key={`info-${current}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/90 border border-white/30 rounded-xl p-4 shadow-[0px_10px_40px_-3px_rgba(0,0,0,0.3)] z-20"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-fraunces font-bold text-lg text-[#111827] mb-1">Villa Serenity</h3>
                      <p className="font-space-mono text-xs text-[#6b7280] uppercase tracking-wide">Beverly Hills, CA</p>
                    </div>
                    <div className="bg-[#D4755B]/10 border border-[#D4755B]/20 px-2 py-1 rounded-lg">
                      <span className="font-manrope font-bold text-xs text-[#D4755B]">AI MATCH: 98%</span>
                    </div>
                  </div>
                  <div className="border-t border-[#e5e7eb] pt-3 flex items-center justify-between">
                    <span className="font-space-mono text-sm font-bold text-[#111827]">$4,250,000</span>
                    <div className="flex items-center gap-4 text-[#6b7280]">
                      <div className="flex items-center gap-1">
                        <span className="material-icons text-xs">bed</span>
                        <span className="font-manrope text-sm">4</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-icons text-xs">shower</span>
                        <span className="font-manrope text-sm">3.5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-icons text-xs">square_foot</span>
                        <span className="font-manrope text-sm">4,200</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;