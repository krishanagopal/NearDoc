import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors");
        setDoctors(res.data.doctors);
      } catch (err) {
        setError("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <p className="p-6 text-neutral-400">Loading doctors...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  if (doctors.length === 0) {
    return <p className="p-6 text-neutral-400">No doctors available.</p>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 p-6">

      {/* Landing-style background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:72px_100%] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-white text-center">
          Choose a Doctor
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="
                bg-neutral-900/10
                backdrop-blur-lg
                p-6
                shadow-xl
                transition
                hover:bg-neutral-900/30
              "
            >
              <h3 className="text-lg font-semibold text-white">
                Dr. {doctor.name}
              </h3>

              <p className="mt-1 text-sm text-neutral-400">
                {doctor.specialization}
              </p>

              <p className="mt-1 text-sm text-neutral-300">
                City: {doctor.city}
              </p>

              <button
                onClick={() =>
                  navigate(`/patient/doctor/${doctor._id}`)
                }
                className="
                  mt-5
                  rounded-lg
                  bg-blue-600
                  px-4 py-2
                  text-sm font-medium text-white
                  transition hover:bg-blue-700
                "
              >
                View Availability
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;

