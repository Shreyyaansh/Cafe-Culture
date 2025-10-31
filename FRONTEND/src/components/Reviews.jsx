import React, { useRef, useState } from 'react';
import googleIcon from '../assets/google.png';

const reviews = [
  {
    initials: 'N D',
    name: 'Nishant Dantare',
    rating: 5,
    timeAgo: 'a month ago',
    visitType: 'Dine in',
    priceRange: '₹200–400',
    text: "Perfect atmosphere, lovely beverages, although I work sometimes here, but it's also cool place to hang around with friends. Highly recommend."
  },
  {
    initials: 'A K',
    name: 'Ananya Kumar',
    rating: 5,
    timeAgo: '2 months ago',
    visitType: 'Dine in',
    priceRange: '₹200–400',
    text: 'Best experience over here. Just the great food served here.'
  },
  {
    initials: 'P',
    name: 'Pratham',
    rating: 5,
    timeAgo: '2 months ago',
    visitType: 'Dine in',
    priceRange: undefined,
    text: 'Great ambience. A great place to chill with friends. MYOB is a relatively new concept in this area and they are the first ones to offer it. Their freshly brewed coffees are a must try for sure.'
  },
  {
    initials: 'S',
    name: 'Sushi',
    rating: 5,
    timeAgo: '2 months ago',
    visitType: 'Brunch',
    priceRange: '₹400–600',
    text: 'Best service ever. The owner is very humble and I really like that. The food was also on point. Moreover best place for friends and even couples to eat here.'
  },
  {
    initials: 'M J',
    name: 'Mayuri Joshi',
    rating: 5,
    timeAgo: 'Edited 2 weeks ago',
    visitType: 'Dinner',
    priceRange: undefined,
    text: 'The food was very good.. As a coffee lover the coffee was on point.. The food was delicious and on point taste.. I will visit again and again.. As per me we should visit once.... Thxx.'
  }
];

const StarRow = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5 text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${i < rating ? '' : 'opacity-30'}`}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const Reviews = () => {
  const row = [...reviews, ...reviews, ...reviews];
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef(null);

  const kickResume = (delay = 600) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), delay);
  };

  return (
    <section className="py-12 overflow-x-hidden">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#7c3f00]">What people say</h3>
        <p className="text-[#7c3f00]/70 text-sm">Real reviews from our guests</p>
      </div>

      {/* Mobile: swipeable scroller */}
      <div
        className="relative block md:hidden overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth hide-scrollbar"
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => kickResume(500)}
        onTouchCancel={() => kickResume(500)}
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => kickResume(500)}
        onScroll={() => { setPaused(true); kickResume(800); }}
      >
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#FBF9F4] to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#FBF9F4] to-transparent z-10"></div>

        <div className={`flex gap-4 animate-[scroll_30s_linear_infinite] will-change-transform ${paused ? 'pause-anim' : ''}`}>
          {row.map((r, idx) => (
            <div
              key={idx}
              className="min-w-[280px] max-w-[280px] bg-white border border-[#7c3f00]/10 rounded-xl p-4 shadow-sm transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:scale-[1.03] hover:-translate-y-1 hover:shadow-md hover:shadow-[#7c3f00]/20 will-change-transform snap-start"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  {r.avatarUrl ? (
                    <img
                      src={r.avatarUrl}
                      alt="Reviewer avatar"
                      className="w-7 h-7 rounded-full object-cover shrink-0 border border-[#7c3f00]/20"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#7c3f00]/10 text-[#7c3f00] shrink-0 flex items-center justify-center border border-[#7c3f00]/20">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
                      </svg>
                    </div>
                  )}
                  <div className="font-semibold text-[#7c3f00] truncate max-w-[150px]">
                    {r.name || 'Google Reviewer'}
                  </div>
                </div>
                <StarRow rating={r.rating} />
              </div>
              {(r.visitType || r.priceRange || r.timeAgo) && (
                <div className="text-[11px] text-[#7c3f00]/60 mb-1 truncate">
                  {[r.visitType, r.priceRange, r.timeAgo].filter(Boolean).join(' • ')}
                </div>
              )}
              <p className="text-sm text-[#7c3f00]/80 line-clamp-4">{r.text}</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-[#7c3f00]/60">
                <img alt="Google" src={googleIcon} className="w-4 h-4" />
                <span>Google Review</span>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          /* Simple global clamp to prevent any horizontal scrollbar */
          html, body { overflow-x: hidden; }
          @keyframes scroll {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-33.333333%, 0, 0); }
          }
          .pause-anim { animation-play-state: paused; }
          .scroll-smooth { -webkit-overflow-scrolling: touch; touch-action: pan-x; }
          /* Hide horizontal scrollbar while keeping scroll enabled */
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .hide-scrollbar::-webkit-scrollbar { width: 0 !important; height: 0 !important; background: transparent; }
          .hide-scrollbar::-webkit-scrollbar-thumb { background: transparent; }
          .hide-scrollbar::-webkit-scrollbar-track { background: transparent; }
          /* Phones */
          @media (max-width: 640px) {
            .animate-[scroll_30s_linear_infinite] { animation: scroll 22s linear infinite; }
          }
          /* Small tablets */
          @media (min-width: 641px) and (max-width: 768px) {
            .animate-[scroll_30s_linear_infinite] { animation: scroll 30s linear infinite; }
          }
          /* Desktop */
          @media (min-width: 769px) {
            .animate-[scroll_30s_linear_infinite] { animation: scroll 40s linear infinite; }
          }
        `}</style>
      </div>

      {/* Desktop: overflow-hidden wrapper with absolutely positioned track (no scrollbar) */}
      <div className="relative hidden md:block overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#FBF9F4] to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#FBF9F4] to-transparent z-10"></div>

        <div className={`flex gap-4 animate-[scroll_30s_linear_infinite] will-change-transform`}>
          {row.map((r, idx) => (
            <div
              key={idx}
              className="min-w-[280px] max-w-[280px] bg-white border border-[#7c3f00]/10 rounded-xl p-4 shadow-sm transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:scale-[1.03] hover:-translate-y-1 hover:shadow-md hover:shadow-[#7c3f00]/20 will-change-transform"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  {r.avatarUrl ? (
                    <img
                      src={r.avatarUrl}
                      alt="Reviewer avatar"
                      className="w-7 h-7 rounded-full object-cover shrink-0 border border-[#7c3f00]/20"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#7c3f00]/10 text-[#7c3f00] shrink-0 flex items-center justify-center border border-[#7c3f00]/20">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
                      </svg>
                    </div>
                  )}
                  <div className="font-semibold text-[#7c3f00] truncate max-w-[150px]">
                    {r.name || 'Google Reviewer'}
                  </div>
                </div>
                <StarRow rating={r.rating} />
              </div>
              {(r.visitType || r.priceRange || r.timeAgo) && (
                <div className="text-[11px] text-[#7c3f00]/60 mb-1 truncate">
                  {[r.visitType, r.priceRange, r.timeAgo].filter(Boolean).join(' • ')}
                </div>
              )}
              <p className="text-sm text-[#7c3f00]/80 line-clamp-4">{r.text}</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-[#7c3f00]/60">
                <img alt="Google" src={googleIcon} className="w-4 h-4" />
                <span>Google Review</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
