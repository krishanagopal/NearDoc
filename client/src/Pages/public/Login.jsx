import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      await login(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <span 
              className="tracking-tight text-white font-normal text-3xl block mb-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Velorah<sup className="text-xs">®</sup>
            </span>
            <h2 className="text-3xl font-medium text-white mb-2">Welcome back</h2>
            <p className="text-sm text-muted-foreground">
              Start your perfect journey. Enter your credentials.
            </p>
          </div>

          {error && (
            <p className="text-xs text-red-400 mb-6 bg-red-400/10 p-3 rounded-xl border border-red-400/20 text-center md:text-left">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground ml-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-3.5 text-sm text-white placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-body"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-3.5 text-sm text-white placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-body"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full liquid-glass rounded-2xl py-3.5 text-sm font-medium text-white transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 mt-4 cursor-pointer"
            >
              {loading ? "Verifying..." : "Start"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-white hover:underline transition-all font-medium">
              Register here
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

export default Login;
