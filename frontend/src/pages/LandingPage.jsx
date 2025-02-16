import LandingNav from "../components/ui/LandingNav";

const LandingPage = () => {
  return (
    <>
      <LandingNav />
      <div className="bg-black bg-opacity-75 backdrop-blur-md min-h-screen">
        <div className="bg-gradient-to-r from-black via-blue-600 to-black text-white w-screen h-screen relative">
          <div className=" fixed left-1/2 top-1/3 translate-x-[-50%] text-white text-center  font-primary font-bold">
            <h1 className="text-4xl">
              {" "}
              Connect, Collaborate, and Navigate Your Campus Life
            </h1>
            <p className="text-lg mt-6 font-primary font-normal">
              Effortlessly find resources, join communities, and stay updated on
              everything happening in your college. CampusCompass helps you make
              the most of your campus experience with clubs, events, and
              networking opportunities – all in one place.
            </p>
            <div className="flex mt-4 gap-9 justify-center">
              <button className="bg-gray-800 mt-6 text-xl font-primary font-normal  px-8 py-2 text-white  rounded-full cursor-pointer transition-all duration-200 0">
                Get Started
              </button>
              <button className="border-[1px] border-white mt-6 text-xl font-primary font-normal px-8 py-2 text-white  rounded-full cursor-pointer transition-all duration-200 ">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
