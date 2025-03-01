import React, { useState } from "react";
import workout from "../assets/img/workout.jpg";
import googleLogo from "../assets/img/google.png";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      navigate("/success-login/dashboard");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center font-poppins">
      <div className="bg-white shadow-lg rounded-2xl flex w-full max-w-4xl h-[80vh] overflow-hidden mt-12">
        {/* Left Side - Form (Sign In / Register) */}
        <div
          className={`w-full md:w-1/2 flex flex-col justify-center p-6 ${
            isLogin ? "order-1" : "order-2"
          } bg-gradient-to-r from-blue-100 to-blue-50`}>
          <h2 className="text-lg font-bold text-blue-600 text-center mb-2">
            {isLogin ? "Sign In" : "Register"}
          </h2>

          {/* Auth Form */}
          <form className="space-y-3" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  className="mt-1 w-full px-2 py-1 text-xs border rounded focus:ring focus:ring-blue-300"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full px-2 py-1 text-xs border rounded focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 w-full px-2 py-1 text-xs border rounded focus:ring focus:ring-blue-300"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Re-Enter Password
                </label>
                <input
                  type="password"
                  className="mt-1 w-full px-2 py-1 text-xs border rounded focus:ring focus:ring-blue-300"
                />
              </div>
            )}

            {/* Checkbox for Register */}
            {!isLogin && (
              <div className="flex items-center text-xs">
                <input type="checkbox" className="mr-2 w-3 h-3" />
                <span className="text-gray-600">
                  I agree to the terms of service and privacy policy.
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-1 text-xs rounded hover:bg-blue-600 transition">
              {isLogin ? "Sign In" : "Register"}
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-2">
            <hr className="flex-1 border-gray-300" />
            <span className="px-2 text-gray-500 text-xs">
              Or {isLogin ? "Sign in with" : "Register with"}
            </span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Auth Button */}
          <div className="flex items-center justify-center">
            <button className="flex items-center justify-center border py-1 text-xs rounded hover:bg-gray-100 transition p-2">
              <img src={googleLogo} alt="Google" className="w-4 h-4 mr-2" />
              Gmail
            </button>
          </div>

          {/* Toggle Between Forms */}
          <p className="text-xs text-center mt-3">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 underline">
              {isLogin ? "Register" : "Sign In"}
            </button>
          </p>
        </div>

        {/* Right Side - Image */}
        <div
          className={`hidden md:flex w-1/2 ${isLogin ? "order-2" : "order-1"}`}>
          <img
            src={workout}
            alt="workout"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
