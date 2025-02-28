import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import LoginNav from "../layouts/LoginNav";
import Carousel_1 from "../assets/img/carousel-1.jpg";
import Carousel_2 from "../assets/img/Carousel-2.jpg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const navigate = useNavigate();

  const images = [Carousel_1, Carousel_2];
  const texts = ["Stay on Track, Stay Ahead.", "Plan. Track. Achieve."];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        const newImageIndex = (prev + 1) % images.length;
        return newImageIndex;
      });

      setCurrentText((prev) => {
        const newTextIndex = (prev + 1) % texts.length;
        return newTextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (
        storedUser &&
        storedUser.username === username &&
        storedUser.password === password
      ) {
        setErrorMessage("");
        navigate("/dashboard");
      } else {
        setErrorMessage(`Username or password doesn't match!`);
      }
    } else {
      const newUser = { username, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      setIsLogin(true);
      setUsername("");
      setPassword("");
      setErrorMessage("");
    }
  };

  return (
    <>
      <LoginNav />
      <div className="flex h-screen pt-16 bg-gray-900 text-white">
        {/* Left Side - Image/Carousel */}
        <div className="w-3/5 flex items-center justify-center p-4 pl-17">
          <div className="relative w-full h-[70%] flex items-center justify-center bg-gray-800 rounded-lg">
            <img
              src={images[currentImage]}
              className="w-full h-full object-cover opacity-80 object-[50%_100%]"
            />
            <div className="absolute bottom-8 w-full text-center text-white">
              <h2 className="text-3xl font-bold">{texts[currentText]}</h2>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
            <p className="text-center text-gray-400 mb-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrorMessage("");
                  setUsername("");
                  setPassword("");
                  setShowPassword(false);
                }}
                className="text-blue-400 ml-1 cursor-pointer">
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-gray-700 text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-gray-700 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm mb-4 font-semibold">
                  {errorMessage}
                </p>
              )}

              {isLogin ? null : (
                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 cursor-pointer"
                    required
                  />
                  <span className="text-gray-400">
                    I agree to the{" "}
                    <a href="#" className="text-blue-400">
                      Terms & Conditions
                    </a>
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition duration-300 cursor-pointer"
                onClick={() => setShowPassword(false)}>
                {isLogin ? "Login" : "Create account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
