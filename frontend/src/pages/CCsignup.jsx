import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CCSignup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/api/ccsignup", data);

      if (response.data.success) {
        navigate("/cclogin"); 
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (err) {
      // Handle error if request fails
      const errorMessage =
        err.response?.data?.message || "Something went wrong"; // Default error message
      setError(errorMessage);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-1">
      <div className="bg-dark-2 border-2 border-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Class Coordinator Signup
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-white">
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-100">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              placeholder="First Name"
              {...register("firstname", { required: "First Name is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
          </div>

          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-100">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              {...register("lastname", { required: "Last Name is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
            {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
          </div>

          <div>
            <label htmlFor="teacherEmail" className="block text-sm font-medium text-gray-100">
              Email
            </label>
            <input
              type="email"
              id="teacherEmail"
              placeholder="Email"
              {...register("teacherEmail", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email format" } })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
            {errors.teacherEmail && <p className="text-red-500 text-sm">{errors.teacherEmail.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-100">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-100">
              Department
            </label>
            <input
              type="text"
              id="department"
              placeholder="Department"
              {...register("department", { required: "Department is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
            {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
          </div>

          <div>
            <label htmlFor="section" className="block text-sm font-medium text-gray-100">
              Section
            </label>
            <input
              type="text"
              id="section"
              placeholder="Section"
              {...register("section", { required: "Section is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
            {errors.section && <p className="text-red-500 text-sm">{errors.section.message}</p>}
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
