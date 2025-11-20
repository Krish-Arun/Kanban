import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-black text-white px-4 py-4 m-0 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        RateEverything
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/add">Add Item</Link>

        {user && (
          <>
            <span className="text-gray-300">Logged in as {user}</span>
            <button
              onClick={logout}
              className="text-red-400 hover:text-red-500"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
