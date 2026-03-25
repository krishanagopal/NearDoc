import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav
      className="
        flex items-center justify-between
        w-[75%] max-w-5xl
        px-8 py-3
        rounded-full
        liquid-glass shadow-lg
      "
    >
      {/* Logo */}
      <h1 className="font-semibold text-lg tracking-tight text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
        Velorah<sup className="text-xs">®</sup>
      </h1>

      {/* Nav Links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link
          to="/"
          className="hidden sm:block text-neutral-400 hover:text-white transition"
        >
          Home
        </Link>
        <Link
          to="/patient/doctors"
          className="hidden sm:block text-neutral-400 hover:text-white transition"
        >
          Find Doctors
        </Link>
        <Link
          to="/patient/appointments"
          className="hidden sm:block text-neutral-400 hover:text-white transition"
        >
          Appointments
        </Link>

        <Link
          to="/login"
          className="text-neutral-400 hover:text-white transition ml-4"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="
            rounded-full
            px-5 py-2
           bg-gradient-to-r from-blue-900 to-cyan-500
          "
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;
