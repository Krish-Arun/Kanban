import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import ItemDetails from "./pages/ItemDetails";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <AddItem />
                </PrivateRoute>
              }
            />

            <Route
              path="/item/:id"
              element={
                <PrivateRoute>
                  <ItemDetails />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
