import React from 'react';

const ContactHeroSection: React.FC = () => {
  return (
    <section className="bg-[#060D1F] border-b border-[rgba(230,224,218,0.5)] py-12 md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center">
          {/* Label */}
          <div className="flex justify-center mb-4">
            <span className="font-space-mono text-xs text-[#D4755B] uppercase tracking-widest">
              Contact & Support
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-fraunces text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            We'd Love to Hear From You
          </h1>

          {/* Subtitle */}
          <p className="font-manrope text-base md:text-lg text-white/70 leading-relaxed max-w-[672px] mx-auto">
            Whether you have a question about listings, need assistance with our AI tools, or
            want to explore partnership opportunities, our team is ready to help.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;