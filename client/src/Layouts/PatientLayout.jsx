import { Outlet } from "react-router-dom";

const PatientLayout = () => {
  return (
    <div>
      {/* Patient Navbar later */}
      <Outlet />
    </div>
  );
};

export default PatientLayout;

