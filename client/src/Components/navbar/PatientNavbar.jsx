import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PatientNavbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="relative z-50 mt-2">
      <div
        className="
          mx-auto
          flex
          max-w-4xl
          items-center
          justify-between
          rounded-full
          bg-neutral-900/60
          backdrop-blur-md
          px-8
          py-3
          shadow-lg
        "
      >
        {/* Left links */}
        <div className="flex gap-6 items-center">
          <Link
            to="/patient/doctors"
            className="text-sm font-medium text-neutral-300 hover:text-white transition"
          >
            Doctors
          </Link>

          <Link
            to="/patient/appointments"
            className="text-sm font-medium text-neutral-300 hover:text-white transition"
          >
            My Appointments
          </Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-400">
            {user?.name}
          </span>

          <button
            onClick={handleLogout}
            className="
              rounded-full
              bg-red-500/90
              px-4
              py-1.5
              text-sm font-medium text-white
              transition
              hover:bg-red-600
            "
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PatientNavbar;

