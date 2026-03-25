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
    <div className="relative min-h-screen w-full bg-background p-6 font-body">

      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full z-0 bg-background pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto pt-20">
        <h2 
          className="text-4xl md:text-5xl font-normal mb-12 text-center text-white animate-fade-rise"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Choose a Doctor
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="liquid-glass rounded-3xl p-8 flex flex-col items-start hover:-translate-y-2 transition-transform duration-500 border border-white/5 animate-fade-rise-delay"
            >
              <h3 className="text-2xl font-medium mb-1 text-white">
                Dr. {doctor.name}
              </h3>

              <p className="text-sm text-muted-foreground mb-4">
                {doctor.specialization}
              </p>

              <p className="text-sm text-neutral-300 mb-6 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                📍 {doctor.city}
              </p>

              <button
                onClick={() =>
                  navigate(`/patient/doctor/${doctor._id}`)
                }
                className="w-full liquid-glass rounded-2xl py-3 text-sm font-medium text-white transition hover:scale-[1.02] active:scale-[0.98] mt-auto"
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

