import React from 'react'
import activityIcon from '../assets/activity_icon.png'
import { Link } from "react-router-dom";

const LoginNav = () => {
  return (
    <>
        <div className="flex items-center justify-between p-3 bg-black">
            <div className="left-side flex items-center">
                <img src={activityIcon} className='w-16 p-2 bg-green-300 rounded-full mr-3' />
                <p className='font-semibold text-2xl text-neutral-50'>Activity Tracker</p>
            </div>
            <div className="right-side">
                <div className="group inline-block relative">
                    <Link
                        to="/sign-up"
                        className="text-gray-100 font-semibold text-xl cursor-pointer relative inline-block">
                        <span className="relative z-10">Sign Up</span>
                        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-green-500 origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                    </Link>
                </div>
                <div className="group inline-block relative ml-9 mr-5">
                    <Link
                        to="/home"
                        className="text-gray-100 font-semibold text-xl cursor-pointer relative inline-block">
                        <span className="relative z-10">Home</span>
                        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-green-500 origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default LoginNav