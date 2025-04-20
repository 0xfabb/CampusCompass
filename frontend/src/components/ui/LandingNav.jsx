// import { Link } from "react-router-dom";

// const LandingNav = () => {
//   return (
//     <div>
//       <div className="fixed w-2/3 left-1/2 top-5 rounded-full translate-x-[-50%] px-8 py-2 flex justify-between items-center shadow-lg z-50 bg-white/30 backdrop-blur-xl transition-all duration-300 text-gray-900">
//         <div className="text-xl cursor-pointer font-extrabold whitespace-nowrap text-white">
//           CampusCompass
//         </div>

//         <ul className="flex gap-8  text-white text-lg font-medium flex-grow justify-center">
//           <li className="mt-1 font-primary font-bold cursor-pointer hover:text-yellow-500 hover:animate-bounce transition duration-200">
//             <Link to="/home">Home</Link>
//           </li>
//           <li className="mt-1 font-primary font-bold cursor-pointer hover:text-yellow-500 hover:animate-bounce transition duration-200">
//             Features
//           </li>
//           <li className="mt-1 font-primary font-bold cursor-pointer hover:text-yellow-500 hover:animate-bounce transition duration-200">
//             Explore
//           </li>
//           <li className="mt-1 font-primary font-bold cursor-pointer hover:text-yellow-500 hover:animate-bounce transition duration-200">
//             Services
//           </li>
//         </ul>

//         <Link to="/studentsignup">
//           {" "}
//           <button className="bg-gradient-to-r font-primary font-bold from-red-700 to-pink-900 px-6 py-2 text-white  rounded-full cursor-pointer hover:bg-gradient-to-l transition-all duration-200 hover:from-red-700 hover:to-pink-900">
//             Sign Up
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LandingNav;




import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Optional: for hamburger icons

const LandingNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <div className="fixed w-11/12 md:w-2/3 left-1/2 top-5 rounded-full translate-x-[-50%] px-6 md:px-8 py-3 flex justify-between items-center shadow-lg z-50 bg-white/30 backdrop-blur-xl transition-all duration-300 text-gray-900">
        <div className="text-xl cursor-pointer font-extrabold whitespace-nowrap text-white">
          CampusCompass
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-white text-lg font-medium flex-grow justify-center">
          <li className="mt-1 font-primary font-bold cursor-pointer hover:text-yellow-500 hover:animate-bounce transition duration-200">
            <Link to="/home">Home</Link>
          </li>
          <li className="mt-1 font-primary font-bold cursor-pointer hover:text-yellow-500 hover:animate-bounce transition duration-200">
            Features
          </li>
          <li className="mt-1 font-primary font-bold cursor-pointer hover:text-yellow-500 hover:animate-bounce transition duration-200">
            Explore
          </li>
          <li className="mt-1 font-primary font-bold cursor-pointer hover:text-yellow-500 hover:animate-bounce transition duration-200">
            Services
          </li>
        </ul>

        {/* Sign Up Button (Always visible) */}
        <Link to="/studentsignup" className="hidden md:block">
          <button className="bg-gradient-to-r font-primary font-bold from-red-700 to-pink-900 px-5 py-2 text-white rounded-full cursor-pointer hover:bg-gradient-to-l transition-all duration-200 hover:from-red-700 hover:to-pink-900">
            Sign Up
          </button>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden text-white text-3xl cursor-pointer z-50" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="fixed top-20 left-1/2 translate-x-[-50%] w-11/12 max-w-sm bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-6 z-40 md:hidden">
          <ul className="flex flex-col gap-4 text-lg text-gray-900 font-semibold text-center">
            <li>
              <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li>
              Features
            </li>
            <li>
              Explore
            </li>
            <li>
              Services
            </li>
            <li>
              <Link to="/studentsignup" onClick={() => setMenuOpen(false)}>
                <button className="mt-3 w-full bg-gradient-to-r from-red-700 to-pink-900 px-5 py-2 text-white rounded-full cursor-pointer hover:bg-gradient-to-l transition-all duration-200 hover:from-red-700 hover:to-pink-900">
                  Sign Up
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LandingNav;
