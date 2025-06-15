import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
