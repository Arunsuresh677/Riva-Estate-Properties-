import React from 'react';
import { Building2, Users, MapPin, CheckCircle } from 'lucide-react';

const AboutStatsSection: React.FC = () => {
  const stats = [
    {
      icon: Building2,
      value: '2,450+',
      label: 'Properties'
    },
    {
      icon: Users,
      value: '12k+',
      label: 'Happy Clients'
    },
    {
      icon: MapPin,
      value: '18',
      label: 'Major Cities'
    },
    {
      icon: CheckCircle,
      value: '98%',
      label: 'Match Rate'
    }
  ];

  return (
    <section className="bg-[#0A1628] border-y border-[#1E3A5F] py-12 md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              {/* Icon */}
              <div className="flex items-center justify-center mb-6">
                <stat.icon className="w-10 h-10 text-[#C05621]" strokeWidth={1.5} />
              </div>
              
              {/* Value */}
              <div className="font-space-mono font-bold text-2xl md:text-4xl text-white mb-2">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="font-manrope font-extralight text-xs text-[#6b7280] uppercase tracking-[1.2px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStatsSection;
