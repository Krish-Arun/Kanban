import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";
import NotFound from "./pages/NotFound";
import EnterUsername from "./pages/EnterUsername";

export default function App() {
  // Load username from localStorage at initialization (React-approved)
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username");
  });

  if (!username) {
    return <EnterUsername setUsername={setUsername} />;
  }

  return (
    <Router>
      <Navbar />

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/item/:id" element={<ItemDetails username={username} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
