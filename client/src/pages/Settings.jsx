import React, { useState, useEffect } from "react";
import SettingsButton from "../components/SettingsButton";
import {
  faWandMagicSparkles,
  faPerson,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-[#121212] text-white" : "bg-white text-black"
      }`}>
      <div
        className={`left-side pl-7 w-3/7 border-r ${
          darkMode ? "border-gray-700" : "border-gray-600"
        }`}>
        <p className="pt-9 font-semibold text-xl">Settings</p>
        <div
          className={`box-profile mt-8 bg-green-500 max-w-123 p-3 rounded-xl text-white mr-5`}>
          <div className="top-box flex p-2 justify-between items-center">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="251.2"
                  strokeDashoffset="62.8"
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-in-out"
                />
              </svg>
              <p className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                75%
              </p>
            </div>
            <div className="right ml-4">
              <h1 className="text-xl font-semibold mb-2">
                Profile Information
              </h1>
              <p>Complete your profile to unlock all features. Lorem, ipsum.</p>
            </div>
          </div>
          <button className="min-w-full mt-3 py-2 font-semibold bg-green-600 hover:bg-green-700 rounded-xl cursor-pointer">
            Complete My Profile
          </button>
        </div>
        <div className="settings-button mt-8 mr-5">
          <SettingsButton
            icon={faWandMagicSparkles}
            title={"Appearances"}
            description={"Click to Change Into Dark or Light Mode"}
            onClick={() => setDarkMode(!darkMode)}
            darkMode={darkMode}
          />
          <SettingsButton
            icon={faPerson}
            title={"Account Settings"}
            description={"Personal Informations, Email"}
            darkMode={darkMode}
          />
          <SettingsButton
            icon={faLock}
            title={"Security"}
            description={"Change Password, 2 Factor Authorization"}
            darkMode={darkMode}
          />
        </div>
      </div>
      <div className="right-side w-4/7 pl-7">
        <p className="py-9 font-semibold text-xl">
          Account Settings
          <span
            className={`block w-full mt-8 border-b-2 ${
              darkMode ? "border-gray-700" : "border-[#323444]"
            } opacity-50`}></span>
        </p>
        <p className="font-semibold text-xl mb-3">Personal Informations</p>
        <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <form>
          <div className="inline-name flex gap-4 mb-4">
            <div className="w-80">
              <label htmlFor="FirstName" className="block font-semibold mb-2">
                First Name
              </label>
              <input
                type="text"
                id="FirstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`border p-2 rounded-md w-full focus:ring focus:border-blue-500 ${
                  darkMode
                    ? "bg-gray-900 text-white border-gray-600"
                    : "border-gray-400"
                }`}
                required
              />
            </div>
            <div className="w-80">
              <label htmlFor="LastName" className="block font-semibold mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="LastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`border p-2 rounded-md w-full focus:ring focus:border-blue-500 ${
                  darkMode
                    ? "bg-gray-900 text-white border-gray-600"
                    : "border-gray-400"
                }`}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="Email" className="block font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border p-2 rounded-md w-164 focus:ring focus:border-blue-500 ${
                darkMode
                  ? "bg-gray-900 text-white border-gray-600"
                  : "border-gray-400"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="PhoneNumber" className="block font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="PhoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`border p-2 rounded-md w-164 focus:ring focus:border-blue-500 ${
                darkMode
                  ? "bg-gray-900 text-white border-gray-600"
                  : "border-gray-400"
              }`}
              required
            />
          </div>
          <div className="button-form w-164 flex justify-between mt-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhoneNumber("");
              }}
              className="bg-green-600 hover:bg-green-700 text-white p-3 font-semibold text-lg w-80 cursor-pointer rounded-2xl">
              Discard Changes
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white p-3 font-semibold text-lg w-80 cursor-pointer rounded-2xl">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
