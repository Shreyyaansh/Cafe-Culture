import React from 'react';

const reviews = [
  {
    name: 'Priyanshu G.',
    rating: 5,
    text: 'Amazing coffee and cozy ambience. The staff is super friendly!'
  },
  {
    name: 'Aarav S.',
    rating: 5,
    text: 'Loved the desserts. Must try the Biscoff Latte and croissants.'
  },
  {
    name: 'Isha P.',
    rating: 4,
    text: 'Great place to hang out. Quick service and tasty snacks.'
  },
  {
    name: 'Rohan M.',
    rating: 5,
    text: 'Best cappuccino in town. Comfortable seating and music.'
  },
  {
    name: 'Neha K.',
    rating: 5,
    text: 'Clean, aesthetic and the menu has lots of options. Highly recommend.'
  },
  {
    name: 'Aditya V.',
    rating: 4,
    text: 'Good value for money. Fries and shakes were awesome.'
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
  const row = [...reviews, ...reviews];

  return (
    <section className="py-12">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#7c3f00]">What people say</h3>
        <p className="text-[#7c3f00]/70 text-sm">Real reviews from our guests</p>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#FBF9F4] to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#FBF9F4] to-transparent z-10"></div>

        <div className="flex gap-4 animate-[scroll_30s_linear_infinite] will-change-transform">
          {row.map((r, idx) => (
            <div key={idx} className="min-w-[260px] max-w-[260px] bg-white border border-[#7c3f00]/10 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-[#7c3f00] truncate max-w-[150px]">{r.name}</div>
                <StarRow rating={r.rating} />
              </div>
              <p className="text-sm text-[#7c3f00]/80 line-clamp-4">{r.text}</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-[#7c3f00]/60">
                <img alt="Google" src="https://www.gstatic.com/images/branding/product/2x/google_g_48dp.png" className="w-4 h-4" />
                <span>Google Review</span>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @media (max-width: 768px) {
            .animate-[scroll_30s_linear_infinite] { animation: scroll 30s linear infinite; }
          }
          @media (min-width: 769px) {
            .animate-[scroll_30s_linear_infinite] { animation: scroll 40s linear infinite; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Reviews;
