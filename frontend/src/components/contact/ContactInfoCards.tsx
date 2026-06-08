import React from 'react';

const ContactInfoCards: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Visit Our Office Card */}
      <div className="bg-[#0D1B35] border border-[#1E3A5F] rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[rgba(212,117,91,0.1)] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="material-icons text-2xl text-[#D4755B]">
              location_on
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-syne font-bold text-lg text-white mb-2">
              Visit Our Office
            </h3>
            <p className="font-manrope font-extralight text-sm text-[#CBD5E1] leading-relaxed mb-3">
              12, Highlands Residency,<br />
              Near Botanical Garden,<br />
              Garden Road, Ooty – 643 001
            </p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Botanical+Garden+Ooty+Tamil+Nadu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-manrope font-medium text-sm text-[#D4755B] hover:text-[#C05621] transition-colors"
            >
              <span>Get Directions</span>
              <span className="material-icons text-sm">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Call or Email Us Card */}
      <div className="bg-[#0D1B35] border border-[#1E3A5F] rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[rgba(212,117,91,0.1)] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="material-icons text-2xl text-[#D4755B]">
              phone
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-syne font-bold text-lg text-white mb-3">
              Call or Email Us
            </h3>
            <div className="space-y-2">
              <a 
                href="tel:+919876543210" 
                className="flex items-center gap-2 font-manrope font-extralight text-sm text-[#CBD5E1] hover:text-[#D4755B] transition-colors"
              >
                <span className="material-icons text-base">
                  call
                </span>
                <span>+91 98765 43210</span>
              </a>
              <a 
                href="mailto:hello@rivaproperties.com" 
                className="flex items-center gap-2 font-manrope font-extralight text-sm text-[#CBD5E1] hover:text-[#D4755B] transition-colors"
              >
                <span className="material-icons text-base">
                  email
                </span>
                <span>hello@rivaproperties.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Business Hours Card */}
      <div className="bg-[#0D1B35] border border-[#1E3A5F] rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[rgba(212,117,91,0.1)] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="material-icons text-2xl text-[#D4755B]">
              schedule
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-syne font-bold text-lg text-white mb-3">
              Business Hours
            </h3>
            <div className="space-y-2 font-manrope font-extralight text-sm text-[#CBD5E1]">
              <div className="flex justify-between items-center">
                <span>Mon - Fri:</span>
                <span className="font-medium text-white">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Saturday:</span>
                <span className="font-medium text-white">10:00 - 16:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Sunday:</span>
                <span className="font-medium text-white">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCards;