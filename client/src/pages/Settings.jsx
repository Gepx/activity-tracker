import { useState } from "react";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import AccountSettings from "../components/settings/AccountSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import { useTheme } from "../context/ThemeContext";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("appearance");
  const {theme, setTheme} = useTheme();

  const tabs = [
    { id: "appearance", label: "Appearances" },
    { id: "account", label: "Account Settings" },
    { id: "security", label: "Security" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "appearance":
        return <AppearanceSettings theme={theme} setTheme={setTheme} />;
      case "account":
        return <AccountSettings />;
      case "security":
        return <SecuritySettings />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen overflow-y-hidden h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold ${theme === "dark" ? "dark:text-white" : "text-black"} mb-8`}>
          Settings
        </h1>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  pb-4 px-1 relative group
                  ${
                    activeTab === tab.id
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }
                `}>
                {tab.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-200 ease-out
                    ${
                      activeTab === tab.id
                        ? "bg-blue-600 dark:bg-blue-400 transform scale-x-100"
                        : "bg-blue-600 dark:bg-blue-400 transform scale-x-0 group-hover:scale-x-100"
                    }`}
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Content Section */}
        <div className="mt-8 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Settings;
