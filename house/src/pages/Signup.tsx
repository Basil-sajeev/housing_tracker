import React, { useState } from "react";

import axios from  "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
    const [name, setName] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState(" ");
    const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        console.log("submitted");
     console.log(name,email)
       
        axios
            .post("http://localhost:3000/user/signup",{
  name,
  email,
  password,
} )
            .then((res) => {
                setLoading(false);
                navigate("/login");
                console.log(res.data);
                toast.success("Account Created")
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
                toast.error(err.response?.data?.error || "Something went wrong")
            })
    };
    return (
     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Property Finder
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Create an account to start finding your dream home 🏡
        </p>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          <input
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            value={name}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            value={email}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            value={password}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
    )


}


export default Signup;