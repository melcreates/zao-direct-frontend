import {React, useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import  {useUser} from "./UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500); // wait for context init
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/account" />;
};

export default ProtectedRoute;
