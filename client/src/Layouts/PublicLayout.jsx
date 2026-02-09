

import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/navbar/PublicNavbar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-950">
      <PublicNavbar />
      <Outlet />
    </div>
  );
};

export default PublicLayout;
