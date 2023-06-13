import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isAuthLoading } = useAuth();

  if (!isAuthLoading) {
    return user?._id ? children : <Navigate to="/signIn" replace></Navigate>;
  } else {
    return null;
  }
};

export default ProtectedRoute;
