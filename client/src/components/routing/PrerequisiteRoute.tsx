import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrerequisiteRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (!user?.answeredQuestions)
    return <Navigate to="/questions" replace></Navigate>;
  return children;
};

export default PrerequisiteRoute;
