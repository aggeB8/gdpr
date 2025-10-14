import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />; // om användaren inte är inloggad -> skicka till login
  }
  
  return children; // om inloggad -> visa skyddad sida
}