import { useTheme } from "../../context/ThemeContext";
import "../../index.css";

const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme(); // Ambil theme dari context

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="space-y-8 overflow-y-auto h-[calc(100vh-10rem)] pr-4 pb-4 no-scrollbar">
      <div>
        <h2 className={`text-2xl font-semibold ${theme === "dark" ? "dark:text-white" : "text-black"} mb-6`}>
          Theme Settings
        </h2>

        {/* Theme Toggle */}
        <div className={`flex items-center justify-between p-4 ${theme === "dark" ? "dark:bg-gray-800" : "bg-gray-100"} rounded-lg`}>
          <div>
            <h3 className={`text-lg font-medium ${theme === "dark" ? "dark:text-white" : "text-gray-900"}`}>
              Dark Mode
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Toggle between light and dark themes
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${theme === "dark" ? "bg-blue-600" : "bg-gray-200"}`}>
            <span className="sr-only">Toggle theme</span>
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${theme === "dark" ? "translate-x-6" : "translate-x-1"}`}
            />
          </button>
        </div>
      </div>

      {/* Font Settings */}
      <div>
        <h3 className={`text-lg font-medium ${theme === "dark" ? "dark:text-white" : "text-black"} mb-4`}>
          Font Settings
        </h3>
        <div className="grid gap-4">
          <div className={`flex items-center justify-between p-4 ${theme === "dark" ? "dark:bg-gray-800" : "bg-gray-100"} rounded-lg`}>
            <div>
              <p className={`font-medium ${theme === "dark" ? "dark:text-white" : "text-gray-900"}`}>
                Font Size
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Adjust the base font size
              </p>
            </div>
            <select className={`form-select rounded-md ${theme === "dark" ? "dark:border-gray-600 dark:bg-gray-700 dark:text-white" : "border-gray-300"}`}>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Color Customization */}
      <div>
        <h3 className={`text-lg font-medium ${theme === "dark" ? "dark:text-white" : "text-black"} mb-4`}>
          Color Customization
        </h3>
        <div className="grid gap-4">
          <div className={`p-4 ${theme === "dark" ? "dark:bg-gray-800" : "bg-gray-100"} rounded-lg`}>
            <p className={`font-medium ${theme === "dark" ? "dark:text-white" : "text-gray-900"} mb-3`}>
              Accent Color
            </p>
            <div className="flex space-x-2">
              {["blue", "green", "purple", "red", "yellow"].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full bg-theme-${color} hover:ring-2 hover:ring-offset-2 focus:outline-none`}
                  aria-label={`Select ${color} theme`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
