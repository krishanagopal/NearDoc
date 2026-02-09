import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav
      className="
        sticky top-2 z-50
        mx-auto
        flex items-center justify-between
        px-10 py-4
        rounded-full
        bg-neutral-950
        border border-neutral-800
        w-[90%] max-w-5xl
      "
    >
      {/* Logo */}
      <h1 className="font-semibold text-lg tracking-tight text-white">
        AppointYourDoc
      </h1>

      {/* Nav Links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link
          to="/"
          className="hidden sm:block text-neutral-400 hover:text-white transition"
        >
          Home
        </Link>

        {/* Services Dropdown */}
        <div className="relative hidden sm:block group">
          <span className="cursor-pointer text-neutral-400 hover:text-white transition">
            Services
          </span>

          {/* Dropdown */}
          <div
            className="
              absolute left-1/2 top-full mt-3
              -translate-x-1/2
              min-w-[220px]
              rounded-xl
              bg-neutral-950
              border border-neutral-800
              shadow-xl
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200
            "
          >
            <div className="flex flex-col py-2">
              <Link
                to="/services/book-doctor"
                className="px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900 hover:text-white transition"
              >
                Book Doctor
              </Link>

              <Link
                to="/services/check-availability"
                className="px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900 hover:text-white transition"
              >
                Check Availability
              </Link>

              <Link
                to="/services/manage-appointments"
                className="px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900 hover:text-white transition"
              >
                Manage Appointments
              </Link>

              <Link
                to="/services/verified-doctors"
                className="px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900 hover:text-white transition"
              >
                Verified Doctors
              </Link>
            </div>
          </div>
        </div>

        <Link
          to="/login"
          className="text-neutral-400 hover:text-white transition"
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
