import { createContext, useContext, useEffect, useState } from "react";

// Buat context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Simpan tema ke localStorage agar tetap setelah refresh
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook untuk menggunakan ThemeContext
export const useTheme = () => useContext(ThemeContext);
