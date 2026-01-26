import { Outlet } from "react-router-dom";
import DoctorNavbar from "../Components/navbar/DoctorNavbar";
const DoctorLayout = () => {
  return (
    <div>
         <DoctorNavbar />
      {/* Doctor Navbar later */}
      <Outlet />
    </div>
  );
};

export default DoctorLayout;
