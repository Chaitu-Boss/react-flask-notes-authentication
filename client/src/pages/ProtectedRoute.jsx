import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/@me", { withCredentials: true })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
