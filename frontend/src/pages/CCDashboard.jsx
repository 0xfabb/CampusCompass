import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Chat from "../components/ui/Chat";

const CCDashboard = () => {
  const navigate = useNavigate();
  const [ccName, setCcName] = useState("");
  const [verifyStatus, setVerifyStatus] = useState(null);
  const [stateDisable, setStateDisable] = useState(null);
  const [disabledText, setDisabledText] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/ccdata", {
          withCredentials: true,
        });
        const status = res.data.verificationStatus;
        console.log(res);
        setCcName(res.data.ccdata.firstname);
        setVerifyStatus(status);
        setStateDisable(!status); // this will work correctly
      } catch (err) {
        console.error("Failed to fetch ccdata:", err);
      }
    };

    fetchData();
  }, []);

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
    <div className="min-h-screen bg-dark-1">
      <nav className="bg-red-700 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Class Coordinator Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-200 mb-6">
          Welcome back, {ccName} <br />
        </h2>
        {disabledText && (
          <Alert severity="error" className="mt-4">
            You are not verified to access this section.
          </Alert>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-dark-2 shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-200 mb-4">
              Manage Your Class
            </h3>
            <p className="text-gray-200">
              Add, edit, or remove class members and other class details.
            </p>

            <button
              onClick={() => {
                if (stateDisable) {
                  console.log("Clicked but disabled");
                  setDisabledText(true);
                  setTimeout(() => setDisabledText(false), 1500);
                } else {
                  navigate("/manage-class");
                }
              }}
              className={`mt-4 py-2 px-4 rounded-md text-white ${
                stateDisable
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 cursor-pointer"
              }`}
            >
              Manage Class
            </button>
          </div>

          <div className="bg-dark-2 shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-200 mb-4">
              View Schedules
            </h3>
            <p className="text-gray-200">
              Check the schedules for your assigned classes and sections.
            </p>
            <button
              onClick={() => {
                if (stateDisable) {
                  console.log("Clicked but disabled");
                  setDisabledText(true);
                  setTimeout(() => setDisabledText(false), 1500);
                } else {
                  navigate("/schedule-class");
                }
              }}
              className={`mt-4 py-2 px-4 rounded-md text-white ${
                stateDisable
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 cursor-pointer"
              }`}
            >
              Go to Schedules
            </button>
          </div>

          <div className="bg-dark-2 shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-200 mb-4">
              Announcements
            </h3>
            <p className="text-gray-200">
              Post announcements for students and staff.
            </p>
            <button
              disabled={stateDisable}
              onClick={() => {
                if (stateDisable) {
                  console.log("Clicked but disabled");
                  setDisabledText(true);
                  setTimeout(() => setDisabledText(false), 1500);
                } else {
                  navigate("/announcement-class");
                }
              }}
              className={`mt-4 py-2 px-4 rounded-md text-white ${
                stateDisable
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 cursor-pointer"
              }`}
            >
              Go to Announcements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ManageClass = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/classdata",
          {
            withCredentials: true,
          }
        );
        setStudents(response.data.students || []);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleRemove = async (studentName) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/remove-student",
        { fullname: studentName },
        { withCredentials: true }
      );
      console.log("Student removed:", res.data);
      setStudents((prev) =>
        prev.filter((student) =>
          typeof student === "string"
            ? student !== studentName
            : student.fullname !== studentName
        )
      );
    } catch (error) {
      console.error("Failed to remove student:", error);
    }
  };

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
    <div className="min-h-screen bg-dark-1">
      <nav className="bg-red-700 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Manage Class</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-200 mb-6">Student List</h2>

        {students.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {students.map((student, index) => (
              <div
                key={index}
                className="bg-dark-2 text-gray-100 p-4 rounded-md shadow-md border flex justify-between border-gray-700"
              >
                <p className="text-xl font-semibold">
                  {typeof student === "string"
                    ? student
                    : student.fullname || "Unnamed Student"}
                </p>
                <button
                  onClick={() =>
                    handleRemove(
                      typeof student === "string" ? student : student.fullname
                    )
                  }
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded-md cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
};

export const AnnouncementClass = () => {
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
    <div className="min-h-screen bg-dark-1 text-white">
      <nav className="bg-red-700 py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Announcements</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Chat />
      </div>
    </div>
  );
};

export const ScheduleClass = () => {
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
    <div className="min-h-screen bg-dark-1 text-white">
      {/* Navbar */}
      <nav className="bg-red-700 py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Schedules</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Class Schedules</h2>
        <p className="text-gray-300">No schedules available yet.</p>
      </div>
    </div>
  );
};

export default CCDashboard;
