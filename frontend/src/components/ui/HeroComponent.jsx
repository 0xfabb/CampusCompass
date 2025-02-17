const HeroSection = () => {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-18 flex flex-col-reverse items-center gap-8 md:flex-row md:justify-between">
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-blue-400 sm:text-5xl">
            The best campus platform <br className="hidden sm:block" />
            for students and teams
          </h1>
          <p className="text-white text-lg leading-relaxed">
            Effortlessly find resources, join communities, and stay updated on
            everything happening in your college. CampusCompass helps you make
            the most of your campus experience with clubs, events, and
            networking opportunities – all in one place.
          </p>
          <div className="mt-4">
            <button className="bg-gray-800 border-white border-[1px] mt-6 text-xl font-primary font-normal  px-8 py-2 text-white  rounded-full cursor-pointer transition-all duration-200 0">
              Get Started
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-full max-w-md">
            <img
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1726218478458/e882a517-6e30-40bf-9a25-4ca273deda87.png?auto=format"
              alt="CampusCompass Screenshot"
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
