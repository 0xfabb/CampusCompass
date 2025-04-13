import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/check-auth", {
          withCredentials: true,
        });
        if (!res.data.auth) {
          navigate("/cclogin");
        }
      } catch (err) {
        navigate("/cclogin");
      }
    };
    checkAuth();
  }, [navigate]);

  return children;
};

export default RequireAuth;
