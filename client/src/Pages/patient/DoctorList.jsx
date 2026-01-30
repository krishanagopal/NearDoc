
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors");
        setDoctors(res.data.doctors);
      } catch (err) {
        setError("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <p className="p-6">Loading doctors...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  if (doctors.length === 0) {
    return <p className="p-6">No doctors available.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Choose a Doctor
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="border rounded-lg p-4 bg-white dark:bg-gray-800"
          >
            <h3 className="text-lg font-bold">
              Dr. {doctor.name}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              {doctor.specialization}
            </p>

            <p className="text-sm">
              City: {doctor.city}
            </p>

            <button
              onClick={() =>
                navigate(`/patient/doctor/${doctor._id}`)
              }
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              View Availability
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
