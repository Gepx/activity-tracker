import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const AccountSettings = () => {
  const {theme} = useTheme()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    bio: "",
    profileComplete: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Calculate profile completion
    const totalFields =
      Object.keys(formData).length + Object.keys(formData.address).length - 1; // Subtract 1 for profileComplete
    const filledFields = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        if (key === "address") {
          return (
            acc + Object.values(value).filter((v) => v.trim() !== "").length
          );
        }
        if (key === "profileComplete") return acc;
        return acc + (value.toString().trim() !== "" ? 1 : 0);
      },
      0
    );

    const completion = Math.round((filledFields / totalFields) * 100);
    setFormData((prev) => ({ ...prev, profileComplete: completion }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call to save user data
    console.log("Form submitted:", formData);
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      role: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      bio: "",
      profileComplete: 0,
    });
  };

  return (
    <div className="max-w-4xl mx-auto overflow-y-auto h-[calc(100vh-10rem)] pr-4 pb-4 no-scrollbar">
      {/* Profile Completion Card */}
      <div className="mb-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="white"
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 45 * (1 - formData.profileComplete / 100)
                  }`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                {formData.profileComplete}%
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Profile Completion</h3>
              <p className="text-green-100">
                Complete your profile to unlock all features
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className={`${theme === "dark" ? "dark:bg-gray-800" : "bg-gray-100"} rounded-lg p-6 shadow-sm`}>
          <h3 className={`text-lg font-semibold ${theme === "dark" ? "dark:text-white" : "text-gray-900"} mb-4`}>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium ${theme === "dark" ? "dark:text-gray-300" : "text-gray-700"} mb-1`}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full rounded-md ${theme === "dark" ? "dark:border-gray-600 dark:bg-gray-700 dark:text-white" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === "dark" ? "dark:text-gray-300" : "text-gray-700"} mb-1`}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full rounded-md ${theme === "dark" ? "dark:border-gray-600 dark:bg-gray-700 dark:text-white" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === "dark" ? "dark:text-gray-300" : "text-gray-700"} mb-1`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-md ${theme === "dark" ? "dark:border-gray-600 dark:bg-gray-700 dark:text-white" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === "dark" ? "dark:text-gray-300" : "text-gray-700"} mb-1`}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full rounded-md ${theme === "dark" ? "dark:border-gray-600 dark:bg-gray-700 dark:text-white" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className={`${theme === "dark" ? "dark:bg-gray-800" : "bg-gray-100"} rounded-lg p-6 shadow-sm`}>
          <h3 className={`text-lg font-semibold ${theme === "dark" ? "dark:text-white" : "text-gray-900"} mb-4`}>
            Professional Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium ${theme === "dark" ? "dark:text-gray-300" : "text-gray-700"} mb-1`}>
                Company/Organization
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full rounded-md ${theme === "dark" ? "dark:border-gray-600 dark:bg-gray-700 dark:text-white" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === "dark" ? "dark:text-gray-300" : "text-gray-700"} mb-1`}>
                Role/Position
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full rounded-md ${theme === "dark" ? "dark:border-gray-600 dark:bg-gray-700 dark:text-white" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className={`${theme === "dark" ? "dark:bg-gray-800" : "bg-gray-100"} rounded-lg p-6 shadow-sm`}>
          <h3 className={`text-lg font-semibold ${theme === "dark" ? "dark:text-white" : "text-gray-900"} mb-4`}>
            Address Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium ${theme === "dark" ? "dark:text-gray-300" : "text-gray-700"} mb-1`}>
                Street Address
              </label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                className={`w-full rounded-md ${theme === "dark" ? "dark:border-gray-600 dark:bg-gray-700 dark:text-white" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === "dark" ? "dark:text-gray-300" : "text-gray-700"} mb-1`}>
                City
              </label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className={`w-full rounded-md ${theme === "dark" ? "dark:border-gray-600 dark:bg-gray-700 dark:text-white" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === "dark" ? "dark:text-gray-300" : "text-gray-700"} mb-1`}>
                State/Province
              </label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                className={`w-full rounded-md ${theme === "dark" ? "dark:border-gray-600 dark:bg-gray-700 dark:text-white" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === "dark" ? "dark:text-gray-300" : "text-gray-700"} mb-1`}>
                ZIP/Postal Code
              </label>
              <input
                type="text"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleChange}
                className={`w-full rounded-md ${theme === "dark" ? "dark:border-gray-600 dark:bg-gray-700 dark:text-white" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === "dark" ? "dark:text-gray-300" : "text-gray-700"} mb-1`}>
                Country
              </label>
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                className={`w-full rounded-md ${theme === "dark" ? "dark:border-gray-600 dark:bg-gray-700 dark:text-white" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className={`${theme === "dark" ? "dark:bg-gray-800" : "bg-gray-100"} rounded-lg p-6 shadow-sm`}>
          <h3 className={`text-lg font-semibold ${theme === "dark" ? "dark:text-white" : "text-gray-900"} mb-4`}>
            Bio
          </h3>
          <div>
            <label className={`block text-sm font-medium ${theme === "dark" ? "dark:text-gray-300" : "text-gray-700"} mb-1`}>
              About You
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className={`w-full rounded-md ${theme === "dark" ? "dark:border-gray-600 dark:bg-gray-700 dark:text-white" : "border-gray-300"} shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Discard Changes
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
