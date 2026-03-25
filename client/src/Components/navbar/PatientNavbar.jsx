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
    <nav className="relative z-50 pt-6 px-4 mb-4 flex justify-center">
      <div
        className="
          flex items-center justify-between
          w-full max-w-5xl
          px-8 py-3
          rounded-full
          liquid-glass shadow-xl
        "
      >
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link to="/" className="font-semibold text-xl tracking-tight text-white hover:opacity-80 transition" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Velorah<sup className="text-xs">®</sup>
          </Link>
          
          {/* Links */}
          <div className="hidden sm:flex gap-6 items-center">
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
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-neutral-300 hidden sm:inline-block">
            {user?.name}
          </span>

          <button
            onClick={handleLogout}
            className="
              rounded-full
              liquid-glass
              border border-white/10
              hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-200
              px-5
              py-2
              text-sm font-medium text-white
              transition-all
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

