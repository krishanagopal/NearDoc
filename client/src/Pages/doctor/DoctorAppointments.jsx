import { useEffect, useState } from "react";
import api from "../../api/axios";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get("/appointments/doctor");
        setAppointments(res.data.appointments);
      } catch (err) {
        setError("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <p className="p-6 text-neutral-400">Loading appointments...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  if (appointments.length === 0) {
    return <p className="p-6 text-neutral-400">No appointments yet.</p>;
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
      <div className="relative z-10 max-w-5xl mx-auto pt-20">
        <h2 
          className="text-4xl md:text-5xl font-normal mb-12 text-center text-white animate-fade-rise"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Patient Appointments
        </h2>

        {/* Vertical List instead of swipe container for desktop friendliness */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="liquid-glass rounded-3xl p-8 flex flex-col items-start hover:-translate-y-2 transition-transform duration-500 border border-white/5 animate-fade-rise-delay"
            >
              <h3 className="font-medium text-2xl text-white mb-1">
                {appt.patient.name}
              </h3>

              <p className="text-sm text-neutral-300 mb-6 bg-white/5 px-3 py-1 rounded-full border border-white/10 mt-2">
                📍 {appt.patient.city}
              </p>

              <div className="w-full space-y-3 bg-black/20 p-5 rounded-2xl border border-white/5 mb-4 mt-auto">
                <p className="text-sm text-neutral-200 flex justify-between">
                  <span className="opacity-60">Date</span>
                  <span className="font-medium">{new Date(appt.date).toDateString()}</span>
                </p>
                <div className="h-px w-full bg-white/5" />
                <p className="text-sm text-neutral-200 flex justify-between">
                  <span className="opacity-60">Time</span>
                  <span className="font-medium">{appt.timeSlot}</span>
                </p>
              </div>

              <div className="w-full rounded-2xl bg-white/5 py-3 text-center border border-white/10">
                <p className="text-sm text-neutral-300">
                  Status:{" "}
                  <span className={`font-medium ${appt.status === 'confirmed' ? 'text-green-400' : 'text-amber-400'}`}>
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;



