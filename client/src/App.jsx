import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";

// layouts
import PublicLayout from "./layouts/PublicLayout";
import PatientLayout from "./layouts/PatientLayout";
import DoctorLayout from "./layouts/DoctorLayout";

// pages
import Landing from "./pages/public/Landing";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import DoctorList from "./pages/patient/DoctorList";
import MyAppointments from "./pages/patient/MyAppointments";
import CreateAvailability from "./pages/doctor/CreateAvailability";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Patient protected */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/patient/doctors" element={<DoctorList />} />
          <Route path="/patient/appointments" element={<MyAppointments />} />
        </Route>

        {/* Doctor protected */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/doctor/availability"
            element={<CreateAvailability />}
          />
          <Route
            path="/doctor/appointments"
            element={<DoctorAppointments />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
