import { useState } from "react";
import api from "../../api/axios";

const CreateAvailability = () => {
  const [date, setDate] = useState("");
  const [slotInput, setSlotInput] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addSlot = () => {
    if (!slotInput) return;

    if (slots.includes(slotInput)) {
      alert("Slot already added");
      return;
    }

    setSlots([...slots, slotInput]);
    setSlotInput("");
  };

  const removeSlot = (slot) => {
    setSlots(slots.filter((s) => s !== slot));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!date || slots.length === 0) {
      setError("Please select date and add slots");
      return;
    }

    setLoading(true);

    try {
      await api.post("/availability", {
        date,
        slots,
        isHoliday: false,
      });

      alert("Availability created successfully!");
      setDate("");
      setSlots([]);
    } catch (err) {
      setError("Failed to create availability");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="relative z-10 mx-auto max-w-lg pt-20">
        <div className="liquid-glass rounded-[2rem] p-8 sm:p-10 shadow-2xl border border-white/5 animate-fade-rise">
          <h2 
            className="text-4xl text-white mb-8 text-center font-normal"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Create Availability
          </h2>

          {error && (
            <p className="text-xs text-red-400 mb-6 bg-red-400/10 p-3 rounded-xl border border-red-400/20 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground ml-1">
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="
                  w-full rounded-2xl bg-white/5 border border-white/10
                  px-5 py-3 text-sm text-white
                  focus:outline-none focus:ring-1 focus:ring-white/20 transition-all cursor-pointer
                "
                style={{ colorScheme: "dark" }}
              />
            </div>

            {/* Slot input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground ml-1">
                Add Time Slot
              </label>
              <div className="flex gap-3">
                <input
                  type="time"
                  value={slotInput}
                  onChange={(e) => setSlotInput(e.target.value)}
                  className="
                    flex-1 rounded-2xl bg-white/5 border border-white/10
                    px-5 py-3 text-sm text-white
                    focus:outline-none focus:ring-1 focus:ring-white/20 transition-all cursor-pointer
                  "
                  style={{ colorScheme: "dark" }}
                />
                <button
                  type="button"
                  onClick={addSlot}
                  className="
                    liquid-glass rounded-2xl bg-white/10 hover:bg-white/20
                    px-6 py-3 text-sm font-medium text-white
                    transition-all active:scale-95 cursor-pointer border border-white/5
                  "
                >
                  Add
                </button>
              </div>
            </div>

            {/* Slots list */}
            {slots.length > 0 && (
              <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
                <p className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  Added Slots
                </p>
                <div className="flex flex-wrap gap-2">
                  {slots.map((slot) => (
                    <div
                      key={slot}
                      className="
                        flex items-center gap-2
                        rounded-full bg-white/10 border border-white/5
                        px-4 py-1.5 text-sm text-white shadow-sm
                      "
                    >
                      <span className="font-medium tracking-wide">{slot}</span>
                      <button
                        type="button"
                        onClick={() => removeSlot(slot)}
                        className="text-red-400 hover:text-red-300 transition-colors ml-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full liquid-glass rounded-2xl
                py-3.5 text-sm font-medium text-white
                transition-all hover:scale-[1.02] active:scale-[0.98]
                disabled:opacity-50 mt-4 border border-white/10 cursor-pointer
              "
            >
              {loading ? "Saving..." : "Save Availability"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAvailability;

