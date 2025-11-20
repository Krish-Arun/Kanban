import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Waves from "@/components/Waves";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/auth/login", form);

      // Save JWT + username via AuthContext
      login(res.data.user.username, res.data.token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

      {/* Waves Background */}
      <Waves
        lineColor="#ffffff"
        backgroundColor="rgba(0, 0, 0, 1)"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
        className="-z-10"
      />

      {/* Login Box */}
      <div className="bg-black/60 backdrop-blur-xl p-8 rounded-2xl shadow-xl max-w-md w-full border border-white/10">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Welcome Back</h1>

        {error && (
          <p className="text-red-400 text-center mb-3 text-sm">{error}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white"
          />

          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-400 text-black px-4 py-3 rounded-xl text-lg shadow"
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-gray-300 mt-4">
          New here?{" "}
          <Link to="/register" className="text-lime-200 hover:underline">
            Create an account
          </Link>
        </p>
      </div>

    </div>
  );
}
