
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
    <div className="p-6 max-w-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Create Availability
      </h2>

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Date */}
        <label className="block mb-2 font-medium">
          Select Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        {/* Slot input */}
        <label className="block mb-2 font-medium">
          Add Time Slot
        </label>
        <div className="flex gap-2 mb-4">
          <input
            type="time"
            value={slotInput}
            onChange={(e) => setSlotInput(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={addSlot}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>

        {/* Slots list */}
        {slots.length > 0 && (
          <div className="mb-4">
            <p className="font-medium mb-2">
              Added Slots:
            </p>
            <div className="flex flex-wrap gap-2">
              {slots.map((slot) => (
                <div
                  key={slot}
                  className="flex items-center gap-2 border px-3 py-1 rounded"
                >
                  <span>{slot}</span>
                  <button
                    type="button"
                    onClick={() => removeSlot(slot)}
                    className="text-red-500"
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
          className="px-6 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Availability"}
        </button>
      </form>
    </div>
  );
};

export default CreateAvailability;
