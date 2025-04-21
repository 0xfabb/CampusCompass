import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AuthLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authLogin = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/auth/getauth",
          {
            withCredentials: true,
          }
        );

        if (res.status !== 200) {
          navigate("/authlogin");
        } else {
          navigate("/authdashboard");
        }
      } catch (err) {
        console.error("Authority auth check failed:", err);
        navigate("/authlogin");
      }
    };
    authLogin();
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        data
      );
      if (response.status === 200) {
        navigate("/authdashboard");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-1">
      <div className="bg-dark-2 shadow-lg rounded-lg p-8 w-full max-w-md border-2 border-white">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Authority Login
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
              id="authEmail"
              placeholder="Email"
              {...register("authEmail", { required: "Email is required" })}
              className="mt-1 text-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
            {errors.authEmail && (
              <p className="text-red-500 text-xs mt-1">
                {errors.authEmail.message}
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

      </div>
    </div>
  );
};

export default AuthLogin;
