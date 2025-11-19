import { useState } from "react";
import { register as registerAPI } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await registerAPI(username, password);
      alert("Registered!");
      navigate("/login");
    } catch {
      alert("Username already exists");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-800 rounded-lg text-white">
      <h1 className="text-2xl mb-4">Register</h1>

      <input
        className="w-full p-2 mb-3 bg-gray-700 rounded"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="w-full p-2 mb-3 bg-gray-700 rounded"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submit} className="bg-green-500 w-full p-2 rounded">
        Register
      </button>

      <p className="mt-3 text-sm">
        Already have an account? <Link to="/login" className="text-blue-300">Login</Link>
      </p>
    </div>
  );
}
