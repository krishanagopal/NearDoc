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
    return <p className="p-6">Loading appointments...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  if (appointments.length === 0) {
    return <p className="p-6">No appointments booked yet.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">
        My Appointments
      </h2>

      <div className="space-y-4">
        {appointments.map((appt) => (
          <div
            key={appt._id}
            className="border rounded-lg p-4 bg-white dark:bg-gray-800"
          >
            <h3 className="font-semibold text-lg">
              Dr. {appt.doctor.name}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              {appt.doctor.specialization} · {appt.doctor.city}
            </p>

            <p className="mt-2">
              📅 {new Date(appt.date).toDateString()}
            </p>

            <p>
              ⏰ {appt.timeSlot}
            </p>

            <p className="mt-2 text-sm">
              Status:{" "}
              <span className="font-medium text-green-600">
                {appt.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;

