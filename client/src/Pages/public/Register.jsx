import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
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
      const res = await api.post("/auth/register", formData);
      await login(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    if (user.role === "patient") {
      navigate("/patient/doctors");
    } else if (user.role === "doctor") {
      navigate("/doctor/availability");
    }
  }, [user, navigate]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 sm:p-8 overflow-hidden font-body">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 blur-xl opacity-30 scale-110 pointer-events-none"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-0 bg-background/60 pointer-events-none" />

      {/* Main Split Card */}
      <div className="relative z-10 w-full max-w-5xl liquid-glass rounded-[2rem] flex flex-col md:flex-row shadow-2xl md:p-2 animate-fade-rise border border-white/5">
        
        {/* Left Side (Form) */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="mb-6 text-center md:text-left">
            <span 
              className="tracking-tight text-white font-normal text-2xl block mb-1"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Velorah<sup className="text-[10px]">®</sup>
            </span>
            <h2 className="text-2xl font-medium text-white mb-1">Create Account</h2>
            <p className="text-sm text-muted-foreground">
              Start your perfect journey.
            </p>
          </div>

          {error && (
            <p className="text-xs text-red-400 mb-4 bg-red-400/10 p-2.5 rounded-xl border border-red-400/20 text-center md:text-left">{error}</p>
          )}

          <form onSubmit={handleRegister} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground ml-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-body"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground ml-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@example.com"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-body"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground ml-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-body"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground ml-1">I am a...</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-xl bg-neutral-950 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-body appearance-none cursor-pointer"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full liquid-glass rounded-xl py-3 text-sm font-medium text-white transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 mt-3 cursor-pointer"
            >
              {loading ? "Creating account..." : "Start"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline transition-all font-medium">
              Log in
            </Link>
          </p>
        </div>

        {/* Right Side (Image/Video) */}
        <div className="hidden md:block w-1/2 relative rounded-[1.5rem] overflow-hidden bg-black/20">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-105"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

      </div>
    </div>
  );
};

export default Register;
