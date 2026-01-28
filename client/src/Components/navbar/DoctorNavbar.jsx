import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DoctorNavbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b bg-white dark:bg-gray-950">
      <div className="flex gap-6 items-center">
        <Link to="/doctor/availability" className="text-blue-600">
          Availability
        </Link>
        <Link to="/doctor/appointments" className="text-blue-600">
          Appointments
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {user?.name}
        </span>

        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DoctorNavbar;

