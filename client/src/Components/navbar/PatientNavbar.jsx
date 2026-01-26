import { Link } from "react-router-dom";

const PatientNavbar = () => {
  return (
    <nav className="flex gap-6 px-6 py-4 border-b">
      <Link to="/patient/doctors" className="text-blue-600">
        Doctors
      </Link>
      <Link to="/patient/appointments" className="text-blue-600">
        My Appointments
      </Link>
    </nav>
  );
};

export default PatientNavbar;
