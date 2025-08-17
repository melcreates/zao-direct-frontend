import React, { createContext, useState, useEffect } from "react";

// 1️⃣ Create the context (the "box" that will hold the data)
export const UserContext = createContext();

// 2️⃣ Create the provider component (this wraps your app)
export const UserProvider = ({ children }) => {
  // Global state for the user
  const [user, setUser] = useState(null);

  // 3️⃣ Load user from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // 4️⃣ Function to handle login
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // 5️⃣ Function to handle logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // 6️⃣ Provide the values to all children
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
