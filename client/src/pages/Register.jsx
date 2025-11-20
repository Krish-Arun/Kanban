import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Waves from "@/components/Waves";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        username: form.username,
        password: form.password,
      });

      // Auto-login after register
      login(res.data.user.username, res.data.token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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

      {/* Register Box */}
      <div className="bg-black/60 backdrop-blur-xl p-8 rounded-2xl shadow-xl max-w-md w-full border border-white/10">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">
          Create an Account
        </h1>

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

          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 text-white"
          />

          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-400 text-black px-4 py-3 rounded-xl text-lg shadow"
          >
            Register
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-lime-200 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
