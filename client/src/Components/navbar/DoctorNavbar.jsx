import { Link } from "react-router-dom";

const DoctorNavbar = () => {
  return (
    <nav className="flex gap-6 px-6 py-4 border-b">
      <Link to="/doctor/availability" className="text-blue-600">
        Create Availability
      </Link>
      <Link to="/doctor/appointments" className="text-blue-600">
        Appointments
      </Link>
    </nav>
  );
};

export default DoctorNavbar;
