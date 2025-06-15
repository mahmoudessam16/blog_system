import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, loginUser, registerUser } from "../features/auth/authAPI";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setLoading(false);

      try {
        const data = await getProfile();
        setUser(data.user);
      } catch {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (form) => {
    const data = await loginUser(form);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    navigate("/");
  };

  const register = async (form) => {
    const data = await registerUser(form);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
