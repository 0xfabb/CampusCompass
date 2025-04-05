import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CCLogin = () => {
  const [formData, setFormData] = useState({
    teacherEmail: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/ccdata", { withCredentials: true }, formData);
      if (response.data.success) {
        navigate("/dashboard"); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-1">
      <div className="bg-dark-2 shadow-lg rounded-lg p-8 w-full max-w-md border-2 border-white">
        <h2 className="text-2xl font-bold text-center text-white mb-6 ">
          Class Coordinator Login
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="teacherEmail"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              name="teacherEmail"
              id="teacherEmail"
              placeholder="Email"
              value={formData.teacherEmail}
              onChange={handleChange}
              required
              className="mt-1 text-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-100"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 text-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-100 mt-4">
          Don&apos;t have an account?{" "}
          <Link
            to="/ccsignup"
            className="text-red-600 hover:text-red-500 font-medium"
          >
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CCLogin;