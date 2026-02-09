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
    <div className="relative min-h-screen bg-neutral-950 px-6 py-12 overflow-hidden">

      {/* Background lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* Glass container */}
      <div className="relative z-10 mx-auto max-w-lg rounded-2xl bg-neutral-900/40 backdrop-blur-lg p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Create Availability
        </h2>

        {error && (
          <p className="text-sm text-red-500 mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Date */}
          <div>
            <label className="block mb-2 text-sm font-medium text-neutral-300">
              Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="
                w-full rounded-lg bg-neutral-950/60
                px-4 py-2.5 text-sm text-white
                focus:outline-none focus:ring-1 focus:ring-blue-500
              "
            />
          </div>

          {/* Slot input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-neutral-300">
              Add Time Slot
            </label>
            <div className="flex gap-2">
              <input
                type="time"
                value={slotInput}
                onChange={(e) => setSlotInput(e.target.value)}
                className="
                  flex-1 rounded-lg bg-neutral-950/60
                  px-4 py-2.5 text-sm text-white
                  focus:outline-none focus:ring-1 focus:ring-blue-500
                "
              />
              <button
                type="button"
                onClick={addSlot}
                className="
                  rounded-lg bg-blue-600
                  px-5 py-2.5 text-sm font-medium text-white
                  transition hover:bg-blue-700
                "
              >
                Add
              </button>
            </div>
          </div>

          {/* Slots list */}
          {slots.length > 0 && (
            <div>
              <p className="mb-3 text-sm font-medium text-neutral-300">
                Added Slots
              </p>
              <div className="flex flex-wrap gap-2">
                {slots.map((slot) => (
                  <div
                    key={slot}
                    className="
                      flex items-center gap-2
                      rounded-full bg-neutral-950/60
                      px-4 py-1.5 text-sm text-white
                    "
                  >
                    <span>{slot}</span>
                    <button
                      type="button"
                      onClick={() => removeSlot(slot)}
                      className="text-red-400 hover:text-red-500"
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
              w-full rounded-lg bg-green-600
              py-2.5 text-sm font-medium text-white
              transition hover:bg-green-700
              disabled:opacity-50
            "
          >
            {loading ? "Saving..." : "Save Availability"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAvailability;

