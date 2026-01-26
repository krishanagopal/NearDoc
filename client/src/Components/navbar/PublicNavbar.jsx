import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      <h1 className="font-bold text-lg">AppointYourDoc</h1>

      <div className="space-x-4">
        <Link to="/" className="text-blue-600">
          Home
        </Link>
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
        <Link to="/register" className="text-blue-600">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;
