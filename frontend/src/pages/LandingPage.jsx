import Footer from "../components/ui/Footer";
import HeroSection from "../components/ui/HeroComponent";
import LandingNav from "../components/ui/LandingNav";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const LandingPage = () => {


  const navigate = useNavigate();

  useEffect(() => {
    const checkStudentAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/student/check-auth-student",
          {
            withCredentials: true,
          }
        );

        if (res.status == 200) {
          navigate("/home");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Student auth check failed:", err);
        navigate("/");
      }
    };
    checkStudentAuth();
  }, [navigate]);


  return (
    <div className="overflow-hidden hide-scrollbar">
      <LandingNav />
      <div className="bg-black bg-opacity-75 backdrop-blur-md h-screen">
        <div className="overflow-hidden bg-gradient-to-b from-red-600 via-black/50 to-dark-1 text-white w-screen h-screen relative backdrop-blur-lg">
          <div className=" fixed left-1/2 top-1/3 translate-x-[-50%] text-white text-center  font-primary font-bold">
            <h1 className="text-4xl">
              {" "}
              Connect, Collaborate, and Navigate Your Campus Life
            </h1>
            <p className="text-lg mt-6 font-primary font-normal">
              Effortlessly find resources, join communities, and stay updated on
              everything happening in your college. CampusCompass helps you make
              the most of your campus experience with clubs, events, and
              networking opportunities - all in one place.
            </p>
            <div className="flex mt-4 gap-9 justify-center">
             <Link to="/studentsignup"> <button className="bg-gradient-to-r  transform hover:scale-115 from-red-700 to-pink-900 border-white border-[1px] mt-6 text-xl font-primary font-normal  px-8 py-2 text-white  rounded-full cursor-pointer transition-all duration-200 0">
                Get Started
              </button> </Link>
              <button className="border-[1px] hover:underline transition-all duration-700 border-white mt-6 text-xl font-primary font-normal px-8 py-2 text-white  rounded-full cursor-pointer ">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black bg-opacity-75 backdrop-blur-md min-h-screen">
        <div className="overflow-hidden bg-gradient-to-b from-dark-1 via-dark-1 to-black text-white w-screen min-h-screen relative">
          <HeroSection />
          <HeroSection />
          <HeroSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
