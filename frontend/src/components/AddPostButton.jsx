import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddPostButton = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Link
      to="/create"
      className="fixed bottom-6 right-6 btn btn-primary rounded-full shadow-lg text-white"
    >
      +
    </Link>
  );
};

export default AddPostButton;
