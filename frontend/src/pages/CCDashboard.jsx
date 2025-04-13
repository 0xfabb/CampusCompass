import { useNavigate } from "react-router-dom";
import axios from "axios";

const CCDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    setTimeout(async () => {
      try {
        await axios.get("http://localhost:3000/api/cclogout", {
          withCredentials: true,
        });
        navigate("/cclogin");
      } catch (error) {
        console.error("Logout failed", error);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Class Coordinator Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome, Class Coordinator!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Manage Classes */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Manage Classes
            </h3>
            <p className="text-gray-600">
              Add, edit, or remove class details and assign sections.
            </p>
            <button
              onClick={() => navigate("/manage-classes")}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
            >
              Go to Manage Classes
            </button>
          </div>

          {/* View Schedules */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              View Schedules
            </h3>
            <p className="text-gray-600">
              Check the schedules for your assigned classes and sections.
            </p>
            <button
              onClick={() => navigate("/view-schedules")}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
            >
              Go to Schedules
            </button>
          </div>

          {/* Announcements */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Announcements
            </h3>
            <p className="text-gray-600">
              Post announcements for students and staff.
            </p>
            <button
              onClick={() => navigate("/announcements")}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
            >
              Go to Announcements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCDashboard;
