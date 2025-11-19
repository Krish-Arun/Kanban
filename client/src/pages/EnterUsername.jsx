import { useState } from "react";

export default function EnterUsername({ setUsername }) {
  const [input, setInput] = useState("");

  const submit = () => {
    if (!input.trim()) return;
    localStorage.setItem("username", input.trim());
    setUsername(input.trim());
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl mb-6">Enter a Username</h1>
      <input
        className="px-4 py-2 rounded bg-gray-800 border border-gray-600 outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={submit}
        className="mt-4 bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
      >
        Continue
      </button>
    </div>
  );
}
