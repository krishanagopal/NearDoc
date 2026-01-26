import {BrowserRouter,Routes,Route} from "react-router-dom";

// Layouts
import PublicLayout from "./Layouts/PublicLayout";
import PatientLayout from "./Layouts/PatientLayout";
import DoctorLayout from "./Layouts/DoctorLayout";

// Public pages
import Landing from "./Pages/public/Landing";
import Login from "./Pages/public/Login";
import Register from "./Pages/public/Register";

// Patient pages
import DoctorList from "./Pages/patient/DoctorList";
import MyAppointments from "./Pages/patient/MyAppointments";

// Doctor pages
import CreateAvailability from "./Pages/doctor/CreateAvailability";
import DoctorAppointments from "./Pages/doctor/DoctorAppointments";




function App () {
  return(
     <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Patient Routes */}
        <Route element={<PatientLayout />}>
          <Route path="/patient/doctors" element={<DoctorList />} />
          <Route path="/patient/appointments" element={<MyAppointments />} />
        </Route>

        {/* Doctor Routes */}
        <Route element={<DoctorLayout />}>
          <Route path="/doctor/availability" element={<CreateAvailability />} />
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;