
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const PublicNavbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b 
                    bg-white dark:bg-gray-950">
      <h1 className="font-bold text-lg text-gray-900 dark:text-white">
        AppointYourDoc
      </h1>

      <div className="flex items-center gap-4">
        <Link to="/" className="text-blue-600">
          Home
        </Link>
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
        <Link to="/register" className="text-blue-600">
          Register
        </Link>

        <button
          onClick={toggleTheme}
          className="ml-4 px-3 py-1 rounded border text-sm
                     text-gray-700 dark:text-gray-200
                     bg-gray-100 dark:bg-gray-800"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
};

export default PublicNavbar;
