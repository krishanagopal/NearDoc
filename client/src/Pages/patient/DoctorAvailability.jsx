import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

const DoctorAvailability = () => {
  const { doctorId } = useParams();

  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // selection state
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

      // reset selection
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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Doctor Availability
      </h2>

      {availability.map((day) => (
        <div
          key={day._id}
          className="mb-6 p-4 border rounded bg-white dark:bg-gray-800"
        >
          <p className="font-medium mb-3">
            Date: {new Date(day.date).toDateString()}
          </p>

          <div className="flex flex-wrap gap-2">
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
                  className={`px-3 py-1 rounded border text-sm transition
                    ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700"
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
        <div className="mt-6 p-4 border rounded bg-gray-50 dark:bg-gray-800">
          <p className="mb-3">
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
            className="px-6 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {bookingLoading
              ? "Booking..."
              : "Book Appointment"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorAvailability;
