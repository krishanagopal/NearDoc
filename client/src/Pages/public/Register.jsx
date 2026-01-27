
import { useState } from "react";
import api from "../../api/axios";

const Register = () => {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        city: formData.city,
        pincode: formData.pincode,
        specialization:
          formData.role === "doctor" ? formData.specialization : undefined,
      };

      await api.post("/auth/register", payload);
      alert("Registration successful. Please login.");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 
                      rounded-xl shadow-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Create account
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Enter your details to get started
        </p>

        {error && (
          <p className="text-sm text-red-600 mb-4">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-3">
          <input name="email" placeholder="Email" onChange={handleChange} required className="auth-input" />

          <div className="grid grid-cols-2 gap-3">
            <input name="firstName" placeholder="First name" onChange={handleChange} required className="auth-input" />
            <input name="lastName" placeholder="Last name" onChange={handleChange} required className="auth-input" />
          </div>

          <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="auth-input" />

          <select name="role" onChange={handleChange} className="auth-input bg-white dark:bg-gray-700">
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <input name="city" placeholder="City" onChange={handleChange} required className="auth-input" />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} required className="auth-input" />

          {formData.role === "doctor" && (
            <input name="specialization" placeholder="Specialization" onChange={handleChange} required className="auth-input" />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700
                       text-white py-2 rounded-md disabled:opacity-50 mt-2"
          >
            {loading ? "Creating account..." : "Continue"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
