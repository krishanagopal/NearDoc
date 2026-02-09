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
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 p-6">

      {/* Landing-style background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:72px_100%] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-white text-center">
          My Appointments
        </h2>

        <div className="space-y-6">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="
                bg-neutral-900/10
                backdrop-blur-lg
                p-6
                shadow-xl
                transition
                hover:bg-neutral-900/30
              "
            >
              <h3 className="font-semibold text-lg text-white">
                Dr. {appt.doctor.name}
              </h3>

              <p className="mt-1 text-sm text-neutral-400">
                {appt.doctor.specialization} · {appt.doctor.city}
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
    </div>
  );
};

export default MyAppointments;
