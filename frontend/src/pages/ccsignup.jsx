import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CCSignup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    department: "",
    section: "",
    teacherEmail: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/ccsignup", formData);
      if (response.data.success) {
        navigate("/login"); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-1">
      <div className="bg-dark-2 border-2 border-white    shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Class Coordinator Signup
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-100"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-100"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="teacherEmail"
              className="block text-sm font-medium text-gray-100"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-100"
            >
              Department
            </label>
            <input
              type="text"
              name="department"
              id="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="section"
              className="block text-sm font-medium text-gray-100"
            >
              Section
            </label>
            <input
              type="text"
              name="section"
              id="section"
              placeholder="Section"
              value={formData.section}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow cursor-pointer hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Signup
          </button>
        </form>
        <p className="text-sm text-center text-gray-100 mt-4">
          Already have an account?{" "}
          <Link 
            to="/cclogin"
            className="text-red-600 hover:text-white font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CCSignup;