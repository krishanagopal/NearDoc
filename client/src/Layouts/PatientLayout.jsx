import { Outlet } from "react-router-dom";
import PatientNavbar from "../Components/navbar/PatientNavbar";

const PatientLayout = () => {
  return (
    <div>
       <PatientNavbar/>
      {/* Patient Navbar later */}
      <Outlet />
    </div>
  );
};

export default PatientLayout;

