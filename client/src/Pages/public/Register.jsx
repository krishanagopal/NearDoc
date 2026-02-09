import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "patient",
    city: "",
    pincode: "",
    specialization: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        city: formData.city,
        pincode: formData.pincode,
        specialization:
          formData.role === "doctor"
            ? formData.specialization
            : undefined,
      });

      const loginRes = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      await login(loginRes.data.token);

      if (formData.role === "patient") {
        navigate("/patient/doctors");
      } else {
        navigate("/doctor/availability");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen  mt-10 flex items-center justify-center bg-neutral-950 px-4 overflow-hidden">

      {/* Background lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[480px] w-[480px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* Transparent Register Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-neutral-900/40 backdrop-blur-lg p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white mb-1">
          Create account
        </h2>

        <p className="text-sm text-neutral-300 mb-8">
          Enter your details to get started
        </p>

        {error && (
          <p className="text-sm text-red-500 mb-4">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="
              w-full rounded-lg bg-neutral-950/60
              px-4 py-2.5 text-sm text-white
              placeholder-neutral-500
              focus:outline-none focus:ring-1 focus:ring-blue-500
            "
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              name="firstName"
              placeholder="First name"
              onChange={handleChange}
              required
              className="
                w-full rounded-lg bg-neutral-950/60
                px-4 py-2.5 text-sm text-white
                placeholder-neutral-500
                focus:outline-none focus:ring-1 focus:ring-blue-500
              "
            />
            <input
              name="lastName"
              placeholder="Last name"
              onChange={handleChange}
              required
              className="
                w-full rounded-lg bg-neutral-950/60
                px-4 py-2.5 text-sm text-white
                placeholder-neutral-500
                focus:outline-none focus:ring-1 focus:ring-blue-500
              "
            />
          </div>

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="
              w-full rounded-lg bg-neutral-950/60
              px-4 py-2.5 text-sm text-white
              placeholder-neutral-500
              focus:outline-none focus:ring-1 focus:ring-blue-500
            "
          />

          <select
            name="role"
            onChange={handleChange}
            className="
              w-full rounded-lg bg-neutral-950/60
              px-4 py-2.5 text-sm text-white
              focus:outline-none focus:ring-1 focus:ring-blue-500
            "
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            required
            className="
              w-full rounded-lg bg-neutral-950/60
              px-4 py-2.5 text-sm text-white
              placeholder-neutral-500
              focus:outline-none focus:ring-1 focus:ring-blue-500
            "
          />

          <input
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
            required
            className="
              w-full rounded-lg bg-neutral-950/60
              px-4 py-2.5 text-sm text-white
              placeholder-neutral-500
              focus:outline-none focus:ring-1 focus:ring-blue-500
            "
          />

          {formData.role === "doctor" && (
            <input
              name="specialization"
              placeholder="Specialization"
              onChange={handleChange}
              required
              className="
                w-full rounded-lg bg-neutral-950/60
                px-4 py-2.5 text-sm text-white
                placeholder-neutral-500
                focus:outline-none focus:ring-1 focus:ring-blue-500
              "
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-lg bg-blue-600
              py-2.5 text-sm font-medium text-white
              transition hover:bg-blue-700
              disabled:opacity-50 mt-2
            "
          >
            {loading ? "Creating account..." : "Continue"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400  bg-gradient-to-r from-blue-900 to-cyan-500hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
