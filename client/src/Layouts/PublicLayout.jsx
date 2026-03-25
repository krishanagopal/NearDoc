

import { Outlet, useLocation } from "react-router-dom";
import PublicNavbar from "../components/navbar/PublicNavbar";

const PublicLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  
  const showNav = !isHomePage && !isAuthPage;

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-x-hidden">
      {showNav && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full z-50 flex justify-center">
          <PublicNavbar />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default PublicLayout;
