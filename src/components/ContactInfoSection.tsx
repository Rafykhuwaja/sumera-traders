import React from 'react';
import { Building2, MapPin, Phone, Mail, Package, Sparkles } from 'lucide-react';

const ContactInfoSection: React.FC = () => {
  const contactItems = [
    {
      id: 1,
      icon: Building2,
      label: 'Company Name',
      value: 'CrystalSalt Exports',
      href: null
    },
    {
      id: 2,
      icon: MapPin,
      label: 'Address',
      value: 'Karachi, Pakistan',
      href: null
    },
    {
      id: 3,
      icon: Phone,
      label: 'Phone',
      value: '+92 300 1234567',
      href: 'tel:+923001234567'
    },
    {
      id: 4,
      icon: Mail,
      label: 'Email',
      value: 'info@crystalsalt.com',
      href: 'mailto:info@crystalsalt.com'
    },
    {
      id: 5,
      icon: Package,
      label: 'Export Inquiries',
      value: 'export@crystalsalt.com',
      href: 'mailto:export@crystalsalt.com'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-3">
              <Sparkles className="h-6 w-6 text-white/60" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <Sparkles className="h-6 w-6 text-white/60" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Get in <span className='text-[#e87b51]'>Touch</span>
          </h2>
          
          <p className="text-white/80 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Connect with us for premium Himalayan salt products and worldwide export services
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="backdrop-blur-md  border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {contactItems.map((item) => {
              const IconComponent = item.icon;
              const content = (
                <div className="flex items-center space-x-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
                  {/* Icon Container */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="h-6 w-6 text-[#e87b51]" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow min-w-0">
                    <h3 className="text-[#e87b51] text-sm font-medium mb-1 uppercase tracking-wide">
                      {item.label}
                    </h3>
                    <p className="text-white text-lg font-semibold group-hover:text-white/90 transition-colors duration-300 break-words">
                      {item.value}
                    </p>
                  </div>
                  
                  {/* Hover Indicator */}
                  {item.href && (
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                    </div>
                  )}
                </div>
              );

              return item.href ? (
                <a
                  key={item.id}
                  href={item.href}
                  className="block transform hover:scale-105 transition-transform duration-300"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={item.id}
                  className="transform hover:scale-105 transition-transform duration-300"
                >
                  {content}
                </div>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-white/70 text-base leading-relaxed max-w-2xl mx-auto">
              We specialize in premium Himalayan salt products including decorative lamps, 
              cooking blocks, and therapeutic items. Contact us for bulk orders and international shipping.
            </p>
            
            {/* Business Hours */}
            <div className="mt-6 inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm font-medium">
                Business Hours: Mon - Fri, 9:00 AM - 6:00 PM PKT
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex items-center justify-center mt-12 space-x-6">
          <div className="w-3 h-3 bg-white/20 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-white/30 rounded-full animate-bounce delay-100"></div>
          <div className="w-5 h-5 bg-white/40 rounded-full animate-bounce delay-200"></div>
          <div className="w-4 h-4 bg-white/30 rounded-full animate-bounce delay-300"></div>
          <div className="w-3 h-3 bg-white/20 rounded-full animate-bounce delay-400"></div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;