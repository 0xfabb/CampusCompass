const LandingNav = () => {
  return (
    <div>
      <div className="fixed w-2/3 left-1/2 top-5 rounded-full translate-x-[-50%] px-8 py-2 flex justify-between items-center shadow-lg z-50 bg-white/30 backdrop-blur-xl transition-all duration-300 text-gray-900">
        <div className="text-xl cursor-pointer font-extrabold whitespace-nowrap text-white">
          CampusCompass
        </div>

        <ul className="flex gap-8  text-white text-lg font-medium flex-grow justify-center">
          <li className="mt-1 font-primary font-bold cursor-pointer hover:text-red-500 transition duration-200">
            Home
          </li>
          <li className="mt-1 font-primary font-bold cursor-pointer hover:text-red-500 transition duration-200">
            Features
          </li>
          <li className="mt-1 font-primary font-bold cursor-pointer hover:text-red-500 transition duration-200">
            Explore
          </li>
          <li className="mt-1 font-primary font-bold cursor-pointer hover:text-red-500 transition duration-200">
            Services
          </li>
        </ul>

        <button className="bg-gradient-to-r font-primary font-bold from-blue-500 to-purple-600 px-6 py-2 text-white  rounded-full cursor-pointer hover:bg-gradient-to-l transition-all duration-200 hover:from-purple-600 hover:to-blue-500">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingNav;
