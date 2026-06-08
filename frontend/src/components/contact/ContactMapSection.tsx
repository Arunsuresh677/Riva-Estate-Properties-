import React from 'react';

const ContactMapSection: React.FC = () => {
  return (
    <section className="bg-[#F2EFE9] py-16">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="relative aspect-[1280/400] rounded-2xl overflow-hidden border border-[#E6E0DA] bg-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9!2d77.2195!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0x98fdea67c3f65c52!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Riva Properties Office Location"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="bg-white shadow-2xl rounded-xl px-8 py-4 flex items-center gap-3 hover:shadow-3xl transition-shadow group">
              <span className="material-icons text-2xl text-[#D4755B] group-hover:scale-110 transition-transform">location_on</span>
              <div className="text-left">
                <p className="font-syne font-bold text-base text-[#221410] mb-0.5">Riva Properties Office</p>
                <p className="font-manrope font-extralight text-xs text-[#64748B]">Click to view on Google Maps</p>
              </div>
              <span className="material-icons text-[#D4755B]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMapSection;