import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

const DoctorAvailability = () => {
  const { doctorId } = useParams();

  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedDayId, setSelectedDayId] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await api.get(`/availability/${doctorId}`);
        setAvailability(res.data.availability || []);
      } catch (err) {
        setError("Failed to load availability");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [doctorId]);

  const handleBookAppointment = async () => {
    if (!selectedDayId || !selectedSlot) return;

    const selectedDay = availability.find(
      (day) => day._id === selectedDayId
    );

    if (!selectedDay) return;

    setBookingLoading(true);

    try {
      await api.post("/appointments", {
        doctorId,
        date: selectedDay.date,
        time: selectedSlot,
      });

      alert("Appointment booked successfully!");
      setSelectedDayId(null);
      setSelectedSlot(null);
    } catch (err) {
      alert("Failed to book appointment");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading availability...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (availability.length === 0)
    return <p className="p-6">No availability found.</p>;

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950">

      {/* Landing-style background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:72px_100%] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-blue-400/25 blur-3xl" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-6">
        <h2 className="text-2xl font-semibold mb-8 text-center text-blue-300">
          Doctor Availability
        </h2>

        {availability.map((day) => (
          <div
            key={day._id}
            className="
              mx-auto
              mb-8
              max-w-md
              p-5
              rounded-lg
              bg-blue-0
              backdrop-blur-lg
            "
          >
            <p className="font-medium mb-4 text-blue-900 text-center">
              {new Date(day.date).toDateString()}
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {day.slots.map((slot) => {
                const isSelected =
                  selectedDayId === day._id &&
                  selectedSlot === slot;

                return (
                  <button
                    key={slot}
                    onClick={() => {
                      setSelectedDayId(day._id);
                      setSelectedSlot(slot);
                    }}
                    className={`px-3 py-1 rounded text-sm transition
                      ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-700 border border-blue-200 hover:bg-blue-100"
                      }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {selectedDayId && selectedSlot && (
          <div
            className="
              mx-auto
              mt-10
              max-w-md
              p-5
              rounded-lg
           bg-neutral-900/10
                backdrop-blur-lg
                p-6
                shadow-xl
                transition
                hover:bg-neutral-900/30
              text-center
            "
          >
            <p className="mb-4 text-blue-900">
              Selected:
              <strong className="ml-2">
                {new Date(
                  availability.find(
                    (d) => d._id === selectedDayId
                  ).date
                ).toDateString()}{" "}
                at {selectedSlot}
              </strong>
            </p>

            <button
              onClick={handleBookAppointment}
              disabled={bookingLoading}
              className="px-6 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              {bookingLoading ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAvailability;
