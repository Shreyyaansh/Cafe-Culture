const Newsletter = () => {
  return (
    <div className="mt-16 mb-5 px-4 sm:px-6 flex flex-col items-center justify-center text-center space-y-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
        Never Miss a Deal!
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-500/70 pb-4">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </p>

      <form className="flex flex-col md:flex-row items-center justify-between max-w-2xl w-full gap-2 md:gap-0">
        <input
          className="border border-gray-300 rounded-md md:rounded-r-none md:border-r-0 outline-none w-full px-3 h-12 text-gray-500"
          type="email"
          placeholder="Enter your email id"
          required
        />
        <button
          type="submit"
          className="w-full md:w-auto px-8 md:px-12 h-12 text-white bg-indigo-500 hover:bg-indigo-600 transition-all cursor-pointer rounded-md md:rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
