import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ')
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        axios.post("http://localhost:3000/user/login", {
            email: email,
            password:password
        })
            .then((res) => {
                setLoading(false)
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userId', res.data._id)
                localStorage.setItem('name', res.data.name)
                navigate("/index")
                toast.success("Welcome to Property Finder")
            }).catch((err) => {
                setLoading(false)
                console.log(err.res)
                toast.error(err.res);
            })
        
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to continue exploring properties 🏠
        </p>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
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
              "Login"
            )}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
    )
}

export default Login