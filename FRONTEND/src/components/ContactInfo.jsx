import React from 'react';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const ContactInfo = () => {
  const address = "Salasar Enterprise, Shop no.GF.3 Akanksha, Sports Club, SAVVY SWARAAJ, Jagatpur Rd, Gota, Ahmedabad, Gujarat 382470";
  const phone = "+91 9979729687";
  const email = "salasarenterprise@gmail.com";
  const mapEmbedSrc = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d229.3632142134438!2d72.55012228725556!3d23.103997906286896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1749320172712!5m2!1sen!2sin";

  return (
    <section className="mt-12 bg-gradient-to-br from-indigo-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10 drop-shadow-sm">
          Connect With Us
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center lg:items-stretch">
          {/* Contact Info */}
          <div className="w-full lg:w-1/2 bg-white p-6 sm:p-8 rounded-xl shadow-lg flex flex-col justify-between transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 leading-snug">
                Have questions? <br /> We're here to help!
              </h3>

              <div className="space-y-5 sm:space-y-6 text-sm sm:text-base">
                {/* Location */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start text-gray-700 hover:text-indigo-600 transition duration-200 group"
                >
                  <MapPinIcon className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-indigo-500 group-hover:text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-gray-900 text-base sm:text-lg">Our Location:</span><br />
                    <span>{address}</span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition duration-200 group"
                >
                  <PhoneIcon className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-indigo-500 group-hover:text-indigo-600 flex-shrink-0" />
                  <span className="font-semibold text-gray-900 text-base sm:text-lg">Call Us:</span>
                  <span className="ml-2">{phone}</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${email}`}
                  className="flex items-center text-gray-700 hover:text-indigo-600 transition duration-200 group"
                >
                  <EnvelopeIcon className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-indigo-500 group-hover:text-indigo-600 flex-shrink-0" />
                  <span className="font-semibold text-gray-900 text-base sm:text-lg">Email Us:</span>
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
              title="Salasar Enterprise Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
