import { Outlet } from "react-router-dom";
import PublicNavbar from "../Components/navbar/PublicNavbar";
const PublicLayout = () => {
  return (
    <div>
        <PublicNavbar />
      <h1>PUBLIC LAYOUT</h1>
      <Outlet />
    </div>
  );
};

export default PublicLayout;

