import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import heroImage from '../../images/Hero Section.jpg';
import aboutImage from '../../images/Main about image.jpg';
import heritageImage from '../../images/Heritage section.jpg';
import happyImage from '../../images/Happy Homeowners_1.jpg';

const slides = [heroImage, aboutImage, heritageImage, happyImage];
const slideshowImages = [heroImage, aboutImage, heritageImage];
const avatarImages = [heroImage, aboutImage, heritageImage];

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ['0%', '30%']);
  const bgOpacity = useTransform(scrollY, [0, 480], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const words = ['Dream', 'Perfect', 'Ideal'];

  return (
    <section ref={sectionRef} className="relative pt-20 pb-16 md:pb-32 overflow-hidden min-h-screen">
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
            <img src={slides[current]} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Decorative blurs — hidden on mobile */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute right-0 top-14 w-64 h-64 bg-[rgba(212,117,91,0.2)] rounded-full blur-[48px] z-[1]"
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT COLUMN */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/10 border border-[#D4755B]/40 backdrop-blur-sm rounded-full px-4 py-2 mb-6 md:mb-10"
            >
              <div className="w-2 h-2 bg-[#D4755B] rounded-full animate-pulse" />
              <span className="font-space-mono text-xs text-white/80 uppercase tracking-wider">Ooty's Premier Real Estate</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-fraunces text-4xl sm:text-5xl lg:text-[70px] leading-[1.1] text-white mb-6 md:mb-8"
            >
              Find Your{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={current}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-[#D4755B] italic block"
                >
                  {words[current % words.length]}
                </motion.span>
              </AnimatePresence>
              Home in Ooty
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="font-manrope font-light text-base md:text-xl leading-7 text-white/75 mb-8 md:mb-12 max-w-[520px]"
            >
              Discover luxury villas, heritage bungalows, and estates across the Nilgiris. Let us guide your property search.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8 md:mb-10"
            >
              <Link
                to="/properties"
                className="bg-[#D4755B] text-white font-manrope font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-xl shadow-[0px_10px_30px_-3px_rgba(212,117,91,0.5)] hover:bg-[#B86851] transition-all inline-flex items-center justify-center gap-2"
              >
                Browse Properties
                <span className="material-icons text-sm">arrow_forward</span>
              </Link>
              <Link
                to="/contact"
                className="border border-white/25 text-white font-manrope font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-xl hover:border-[#D4755B]/60 hover:bg-white/5 backdrop-blur-sm bg-white/8 transition-all inline-flex items-center justify-center gap-2"
              >
                Contact Us
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="flex -space-x-2">
                {avatarImages.map((img, i) => (
                  <img key={i} src={img} alt="" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 object-cover" />
                ))}
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#D4755B]/20 border-2 border-[#D4755B]/40 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="font-space-mono text-white text-xs">+</span>
                </div>
              </div>
              <div>
                <div className="font-space-mono text-white text-xs md:text-sm">2,450+ Happy Homeowners</div>
                <div className="flex gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => <span key={i} className="material-icons text-[#FCD34D] text-xs">star</span>)}
                  <span className="font-manrope text-white/60 text-xs ml-1">5.0</span>
                </div>
              </div>
            </motion.div>

            {/* Dot Indicators */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full h-[3px] ${i === current ? 'w-8 bg-[#D4755B]' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Property Card Slideshow (hidden on small, shown md+) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden md:block relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0px_32px_64px_-12px_rgba(0,0,0,0.6)] border border-white/10">
              <div className="relative h-[400px] lg:h-[580px]">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={`img-${current}`}
                    src={slideshowImages[current % slideshowImages.length]}
                    alt="Property"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1.0 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
                      <p className="font-space-mono text-xs text-[#6b7280] uppercase tracking-wide">Ooty, Tamil Nadu</p>
                    </div>
                    <div className="bg-[#D4755B]/10 border border-[#D4755B]/20 px-2 py-1 rounded-lg">
                      <span className="font-manrope font-bold text-xs text-[#D4755B]">FEATURED</span>
                    </div>
                  </div>
                  <div className="border-t border-[#e5e7eb] pt-3 flex items-center justify-between">
                    <span className="font-space-mono text-sm font-bold text-[#111827]">₹4.25 Cr</span>
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
