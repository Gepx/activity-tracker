import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import LoginNav from '../layouts/LoginNav';
import Carousel_1 from '../assets/carousel-1.jpg'
import Carousel_2 from '../assets/Carousel-2.jpg'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentImage, setCurrentImage] = useState(0)
  const [currentText, setCurrentText] = useState(0)
  const navigate = useNavigate()

  const images = [Carousel_1, Carousel_2]
  const texts = ['Stay on Track, Stay Ahead.', 'Plan. Track. Achieve.']

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
      navigate('/dashboard')
    } else {
      setIsLogin(true)
      setUsername('')
      setPassword('')
    }
  };

  return (
    <>
      <LoginNav />
      <div className="flex h-screen pt-16 bg-gray-900 text-white">
        {/* Left Side - Image/Carousel */}
        <div className="w-1/2 flex items-center justify-center p-4 pl-17">
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
            <h2 className="text-2xl font-bold mb-4 text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
            <p className="text-center text-gray-400 mb-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}  
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-blue-400 ml-1"
              >
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
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-gray-700 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {isLogin? 
                null :
                <div className="mb-4 flex items-center">
                  <input type="checkbox" className="mr-2" required />
                  <span className="text-gray-400">I agree to the <a href="#" className="text-blue-400">Terms & Conditions</a></span>
                </div>
              }
              
              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition duration-300"
              >
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
