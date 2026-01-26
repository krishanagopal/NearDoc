import { Outlet } from "react-router-dom";

const DoctorLayout = () => {
  return (
    <div>
      {/* Doctor Navbar later */}
      <Outlet />
    </div>
  );
};

export default DoctorLayout;
