import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckAuthStudent = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false); // Track if auth check is done
  const navigate = useNavigate();

  useEffect(() => {
    const checkStudentAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/student/check-auth-student", {
          withCredentials: true,
        });

        if (!res.status === 200) {
          navigate("/studentlogin");
        } else {
          setAuthChecked(true); // Auth is valid, proceed with rendering children
        }
      } catch (err) {
        console.error("Student auth check failed:", err);
        navigate("/studentlogin");
      }
    };

    checkStudentAuth();
  }, [navigate]);

  // If auth check is still in progress, don't render anything (or a loading indicator)
  if (!authChecked) {
    return <div>Loading...</div>;
  }

  // Render children only after successful auth check
  return children;
};

export default CheckAuthStudent;
