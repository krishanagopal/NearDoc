import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      const res = await api.post("/auth/login", {
        email,
        password,
      });

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
    <div className="relative min-h-screen flex items-center justify-center bg-neutral-950 px-4 overflow-hidden">

      {/* Background lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* Transparent Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-neutral-900/40 backdrop-blur-lg p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white mb-1">
          Log in
        </h2>

        <p className="text-sm text-neutral-300 mb-8">
          Enter your email and password to continue
        </p>

        {error && (
          <p className="text-sm text-red-500 mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              className="
                peer
                w-full
                rounded-lg
                bg-neutral-950/60
                px-4 pt-5 pb-2
                text-sm text-white
                placeholder-transparent
                focus:outline-none
                focus:ring-1 focus:ring-blue-500
              "
            />
            <label
              className="
                pointer-events-none
                absolute left-4 top-3
                text-sm text-neutral-400
                transition-all
                peer-placeholder-shown:top-4
                peer-placeholder-shown:text-sm
                peer-focus:top-1.5
                peer-focus:text-xs
                peer-focus:text-blue-400
              "
            >
              Email address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              className="
                peer
                w-full
                rounded-lg
                bg-neutral-950/60
                px-4 pt-5 pb-2
                text-sm text-white
                placeholder-transparent
                focus:outline-none
                focus:ring-1 focus:ring-blue-500
              "
            />
            <label
              className="
                pointer-events-none
                absolute left-4 top-3
                text-sm text-neutral-400
                transition-all
                peer-placeholder-shown:top-4
                peer-placeholder-shown:text-sm
                peer-focus:top-1.5
                peer-focus:text-xs
                peer-focus:text-blue-400
              "
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-lg
              bg-blue-600
              py-2.5
              text-sm font-medium text-white
              transition
              hover:bg-blue-700
              disabled:opacity-50
              bg-gradient-to-r from-blue-900 to-cyan-500
            "
          >
            {loading ? "Logging in..." : "Continue"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-300">
          New here?{" "}
          <a href="/register" className="text-blue-400 hover:underline ">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;


