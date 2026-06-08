import React from 'react';

const ContactMapSection: React.FC = () => {
  return (
    <section className="bg-[#060D1F] py-10 md:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        {/* On mobile: fixed height so map is usable; on desktop: wide aspect ratio */}
        <div className="relative h-[280px] sm:h-[340px] md:aspect-[1280/400] md:h-auto rounded-2xl overflow-hidden border border-[#1E3A5F] bg-[#0A1628]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.4!2d76.6932!3d11.4102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7a7a7a7a7a7%3A0x1234567890abcdef!2sGovernment+Botanical+Garden%2C+Ooty%2C+Tamil+Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Riva Properties Office Location"
          />
          <div className="absolute inset-0 flex items-end sm:items-center justify-center pb-4 sm:pb-0">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Botanical+Garden+Ooty+Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0D1B35] shadow-2xl rounded-xl px-4 sm:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 hover:shadow-3xl transition-shadow group max-w-[90vw]"
            >
              <span className="material-icons text-xl sm:text-2xl text-[#D4755B] group-hover:scale-110 transition-transform flex-shrink-0">location_on</span>
              <div className="text-left min-w-0">
                <p className="font-syne font-bold text-sm sm:text-base text-white mb-0.5 truncate">Riva Properties Office</p>
                <p className="font-manrope font-extralight text-xs text-[#64748B] truncate">Click to view on Google Maps</p>
              </div>
              <span className="material-icons text-[#D4755B] flex-shrink-0">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMapSection;
