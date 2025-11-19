import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("username");
    return saved || null;
  });

  const login = (username, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
