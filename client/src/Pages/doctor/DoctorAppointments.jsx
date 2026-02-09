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
    <div className="relative min-h-screen bg-neutral-950 px-6 py-10 overflow-hidden">

      {/* Background lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <h2 className="relative z-10 text-2xl font-semibold text-white mb-8 text-center">
        My Appointments
      </h2>

      {/* Swipe container */}
      <div
        className="
          relative z-10
          flex
          gap-8
          overflow-x-auto
          snap-x snap-mandatory
          px-[10vw]
          scrollbar-hide
        "
      >
        {appointments.map((appt) => (
          <div
            key={appt._id}
            className="
              snap-center
              shrink-0
              w-full max-w-md
              bg-neutral-900/40
              backdrop-blur-lg
              p-8
              shadow-2xl
              transition-transform duration-300
            "
          >
            <h3 className="font-semibold text-lg text-white">
              Patient: {appt.patient.name}
            </h3>

            <p className="text-sm text-neutral-400">
              City: {appt.patient.city}
            </p>

            <p className="mt-4 text-sm text-neutral-300">
              📅 {new Date(appt.date).toDateString()}
            </p>

            <p className="text-sm text-neutral-300">
              ⏰ {appt.timeSlot}
            </p>

            <p className="mt-4 text-sm text-neutral-300">
              Status:{" "}
              <span className="font-medium text-green-400">
                {appt.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;



