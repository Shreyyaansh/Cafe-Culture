import React from 'react';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const ContactInfo = () => {
  const address = "Cafe Culture Aaryan Elan Ground floor Shop no: 07 near savvy sawaraj sports club Gota, Ahmedabad Gujarat 382470";
  const phone = "+91 9979729687";
  const email = "priyanshu123gehlot123@gmail.com";
  const mapEmbedSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.5!2d72.5504413!3d23.1036744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83423afc0d59%3A0x7aee721b883c5426!2sCafeCulture!5e0!3m2!1sen!2sin!4v1749320172712!5m2!1sen!2sin";

  return (
    <section className="mt-12 bg-gradient-to-br from-white to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#7c3f00] text-center mb-10 drop-shadow-sm">
          Connect With Us
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center lg:items-stretch">
          {/* Contact Info */}
          <div className="w-full lg:w-1/2 bg-[#faf0e6] p-6 sm:p-8 rounded-xl shadow-lg flex flex-col justify-between transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#7c3f00] mb-6 sm:mb-8 leading-snug">
                Have questions? <br /> We're here to help!
              </h3>

              <div className="space-y-5 sm:space-y-6 text-sm sm:text-base">
                {/* Location */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start text-[#7c3f00] hover:text-[#a0522d] transition duration-200 group"
                >
                  <MapPinIcon className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-[#7c3f00] group-hover:text-[#a0522d] flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#7c3f00] text-base sm:text-lg">Our Location:</span><br />
                    <span>{address}</span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center text-[#7c3f00] hover:text-[#a0522d] transition duration-200 group"
                >
                  <PhoneIcon className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-[#7c3f00] group-hover:text-[#a0522d] flex-shrink-0" />
                  <span className="font-semibold text-[#7c3f00] text-base sm:text-lg">Call Us:</span>
                  <span className="ml-2">{phone}</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${email}`}
                  className="flex items-center text-[#7c3f00] hover:text-[#a0522d] transition duration-200 group"
                >
                  <EnvelopeIcon className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-[#7c3f00] group-hover:text-[#a0522d] flex-shrink-0" />
                  <span className="font-semibold text-[#7c3f00] text-base sm:text-lg">Email Us:</span>
                  <span className="ml-2">{email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="w-full lg:w-1/2 h-72 sm:h-80 lg:h-[500px] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl">
            <iframe
              src={mapEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cafe Culture Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
