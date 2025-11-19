import { useState, useContext } from "react";
import { login as loginAPI } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await loginAPI(username, password);
      login(res.username, res.token);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-800 rounded-lg text-white">
      <h1 className="text-2xl mb-4">Login</h1>

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

      <button onClick={submit} className="bg-blue-500 w-full p-2 rounded">
        Login
      </button>

      <p className="mt-3 text-sm">
        Don’t have an account? <Link to="/register" className="text-blue-300">Register</Link>
      </p>
    </div>
  );
}
