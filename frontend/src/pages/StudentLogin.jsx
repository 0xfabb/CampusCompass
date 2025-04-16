import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, } from "react";

const StudentLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/student/login",
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-1">
      <div className="bg-dark-2 shadow-lg rounded-lg p-8 w-full max-w-md border-2 border-white">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Student Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 text-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
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
              id="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 text-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
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
            to="/studentsignup"
            className="text-red-600 hover:text-red-500 font-medium"
          >
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;
