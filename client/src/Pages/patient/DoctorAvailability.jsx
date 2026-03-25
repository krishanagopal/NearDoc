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
          Doctor Availability
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {availability.map((day) => (
            <div
              key={day._id}
              className="liquid-glass rounded-[2rem] p-8 hover:-translate-y-1 transition-transform duration-500 border border-white/5 animate-fade-rise-delay"
            >
              <h3 className="font-medium text-xl text-white mb-6 text-center">
                {new Date(day.date).toDateString()}
              </h3>

              <div className="flex flex-wrap justify-center gap-3">
                {day.slots.map((slot) => {
                  const isSelected = selectedDayId === day._id && selectedSlot === slot;

                  return (
                    <button
                      key={slot}
                      onClick={() => {
                        setSelectedDayId(day._id);
                        setSelectedSlot(slot);
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer
                        ${
                          isSelected
                            ? "bg-white text-black scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                            : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                        }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {selectedDayId && selectedSlot && (
          <div className="mt-12 mx-auto max-w-md liquid-glass rounded-3xl p-8 text-center border border-white/5 animate-fade-rise shadow-2xl">
            <h3 className="text-xl font-medium text-white mb-2">Confirm Booking</h3>
            <p className="text-sm text-neutral-300 mb-6">
              You've chosen <span className="text-white font-semibold">{new Date(availability.find((d) => d._id === selectedDayId).date).toDateString()}</span> at <span className="text-white font-semibold">{selectedSlot}</span>
            </p>

            <button
              onClick={handleBookAppointment}
              disabled={bookingLoading}
              className="w-full liquid-glass bg-white/10 hover:bg-white/20 rounded-2xl py-3.5 text-sm font-medium text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {bookingLoading ? "Securing slot..." : "Book Appointment"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAvailability;
