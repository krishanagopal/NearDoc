import { useEffect, useState } from "react";
import api from "../../api/axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get("/appointments/me");
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
    return <p className="p-6 text-neutral-400">No appointments booked yet.</p>;
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
      <div className="relative z-10 max-w-4xl mx-auto pt-20">
        <h2 
          className="text-4xl md:text-5xl font-normal mb-12 text-center text-white animate-fade-rise"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          My Appointments
        </h2>

        <div className="grid gap-6">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="liquid-glass flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-[2rem] p-8 hover:-translate-y-1 transition-transform duration-500 border border-white/5 animate-fade-rise-delay"
            >
              <div>
                <h3 className="font-medium text-2xl text-white mb-1">
                  Dr. {appt.doctor.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
                  {appt.doctor.specialization} <span className="mx-2 opacity-50">•</span> {appt.doctor.city}
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-2 bg-black/20 p-4 rounded-2xl border border-white/5">
                <p className="text-sm text-neutral-200">
                  <span className="opacity-60 mr-2">📅</span> {new Date(appt.date).toDateString()}
                </p>
                <p className="text-sm text-neutral-200">
                  <span className="opacity-60 mr-2">⏰</span> {appt.timeSlot}
                </p>
                <p className="text-sm text-neutral-200 mt-1">
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

export default MyAppointments;
