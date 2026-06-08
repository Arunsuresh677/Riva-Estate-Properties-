import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import happyHomeowner1 from '../../images/Happy Homeowners_1.jpg';
import happyHomeowner2 from '../../images/Happy Homeowners_2.jpg';
import happyHomeowner3 from '../../images/Team section.jpg';
import rightFeatureCard from '../../images/Right side feature card.jpg';

const slideshowImages = [
  happyHomeowner1,
  happyHomeowner2,
  happyHomeowner3,
  rightFeatureCard,
];

const headline = "Discover Your Dream Home with AI Intelligence";
const words = headline.split(" ");

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ['0%', '30%']);
  const bgOpacity = useTransform(scrollY, [0, 480], [1, 0]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#F8F6F6] pt-20 pb-32 overflow-hidden">

      {/* Parallax Background Slideshow */}
      <motion.div
        style={{ y: bgY, opacity: bgOpacity }}
        className="absolute inset-0 z-0"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.18, scale: 1.0 }}
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
        <div className="absolute inset-0 bg-[#F8F6F6]/75" />
      </motion.div>

      {/* Background decorative blurs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-14 w-64 h-64 bg-[rgba(236,70,19,0.1)] rounded-full blur-[32px] z-0"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2], x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[738px] bottom-22 w-64 h-64 bg-[rgba(254,215,170,0.2)] rounded-full blur-[32px] z-0"
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
              className="inline-flex items-center gap-3 bg-[rgba(212,117,91,0.1)] border border-[rgba(212,117,91,0.2)] rounded-full px-4 py-2 mb-10"
            >
              <div className="w-2 h-2 bg-[#D4755B] rounded-full" />
              <span className="font-manrope font-bold text-xs text-[#D4755B] uppercase tracking-wider">
                AI-Powered Real Estate
              </span>
            </motion.div>

            {/* Staggered Headline */}
            <h1 className="font-fraunces text-[56px] lg:text-[70px] leading-[1.1] text-[#111827] mb-8">
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
              className="font-manrope font-light text-xl leading-7 text-[#4b5563] mb-12 max-w-[676px]"
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
                className="bg-[#D4755B] text-white font-manrope font-bold text-lg px-8 py-4 rounded-xl shadow-[0px_10px_15px_-3px_rgba(212,117,91,0.25)] hover:bg-[#B86851] transition-all hover:shadow-xl inline-flex items-center"
              >
                Explore Properties
                <span className="font-material-icons text-sm ml-2">arrow_forward</span>
              </Link>
              <Link
                to="/ai-hub"
                className="border-2 border-[#d1d5db] text-[#374151] font-manrope font-bold text-lg px-8 py-4 rounded-xl hover:border-[#D4755B] hover:text-[#D4755B] transition-all inline-flex items-center"
              >
                <span className="font-material-icons text-2xl text-[#D4755B] mr-2">smart_toy</span>
                {import.meta.env.PROD ? 'AI Property Hub' : 'Try AI Search'}
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.6 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {slideshowImages.slice(0, 3).map((img, i) => (
                  <img key={i} src={img} alt="" className="w-10 h-10 rounded-full border-2 border-[#f8f6f6] object-cover" />
                ))}
                <div className="w-10 h-10 bg-[#111827] rounded-full border-2 border-[#f8f6f6] flex items-center justify-center">
                  <span className="font-manrope font-bold text-xs text-white">+2k</span>
                </div>
              </div>
              <span className="font-manrope text-sm text-[#6b7280]">Join 2,000+ happy homeowners</span>
            </motion.div>
          </div>

          {/* Right — Slideshow Card */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-[0px_25px_50px_-12px_#e5e7eb]">
              <div className="relative h-[625px]">

                {/* Crossfade + Zoom Slideshow */}
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

                {/* Dot Indicators */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {slideshowImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`transition-all duration-300 rounded-full h-2 ${
                        i === current
                          ? 'w-8 bg-white'
                          : 'w-2 bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>

                {/* Property Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/90 border border-white/20 rounded-xl p-4 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] z-20">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-fraunces font-bold text-lg text-[#111827] mb-1">Villa Serenity</h3>
                      <p className="font-space-mono text-xs text-[#6b7280] uppercase tracking-wide">Beverly Hills, CA</p>
                    </div>
                    <div className="bg-[rgba(212,117,91,0.1)] px-2 py-1 rounded">
                      <span className="font-manrope font-bold text-xs text-[#D4755B]">AI MATCH: 98%</span>
                    </div>
                  </div>
                  <div className="border-t border-[#e5e7eb] pt-3 flex items-center justify-between">
                    <span className="font-space-mono text-sm text-[#4b5563]">$4,250,000</span>
                    <div className="flex items-center gap-4 text-[#4b5563]">
                      <div className="flex items-center gap-1">
                        <span className="font-material-icons text-xs">bed</span>
                        <span className="font-manrope text-sm">4</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-material-icons text-xs">shower</span>
                        <span className="font-manrope text-sm">3.5</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;