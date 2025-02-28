import { useState } from "react";

const SecuritySettings = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement password change logic
    console.log("Password form submitted:", passwordForm);
  };

  const handleRecoveryEmailSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement recovery email update logic
    console.log("Recovery email updated:", recoveryEmail);
  };

  const handleToggle2FA = () => {
    if (!twoFactorEnabled) {
      setShowQRCode(true);
    } else {
      // TODO: Implement 2FA disable logic
      setTwoFactorEnabled(false);
      setShowQRCode(false);
    }
  };

  const handle2FASetup = () => {
    // TODO: Implement 2FA setup logic
    setTwoFactorEnabled(true);
    setShowQRCode(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 overflow-y-auto h-[calc(100vh-10rem)] pr-4 pb-4 no-scrollbar">
      {/* Password Change Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Change Password
        </h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add an extra layer of security to your account
            </p>
          </div>
          <button
            onClick={handleToggle2FA}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${twoFactorEnabled ? "bg-blue-600" : "bg-gray-200"}`}>
            <span className="sr-only">Enable 2FA</span>
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${twoFactorEnabled ? "translate-x-6" : "translate-x-1"}`}
            />
          </button>
        </div>

        {showQRCode && (
          <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Scan this QR code with your authenticator app:
            </p>
            <div className="bg-white p-4 inline-block rounded">
              {/* Placeholder for QR Code */}
              <div className="w-48 h-48 bg-gray-200 dark:bg-gray-600" />
            </div>
            <div className="mt-4">
              <button
                onClick={handle2FASetup}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Complete Setup
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recovery Email */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recovery Email
        </h3>
        <form onSubmit={handleRecoveryEmailSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Backup Email Address
            </label>
            <input
              type="email"
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter backup email address"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Update Recovery Email
            </button>
          </div>
        </form>
      </div>

      {/* Security Log */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Security Log
        </h3>
        <div className="space-y-4">
          <div className="border-t dark:border-gray-700">
            {/* Sample log entries */}
            {[
              {
                event: "Password changed",
                date: "2024-02-28 10:30 AM",
                location: "Jakarta, Indonesia",
              },
              {
                event: "New device logged in",
                date: "2024-02-27 03:15 PM",
                location: "Jakarta, Indonesia",
              },
              {
                event: "2FA enabled",
                date: "2024-02-26 09:45 AM",
                location: "Jakarta, Indonesia",
              },
            ].map((log, index) => (
              <div
                key={index}
                className="py-3 flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {log.event}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {log.location}
                  </p>
                </div>
                <p className="text-gray-500 dark:text-gray-400">{log.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
