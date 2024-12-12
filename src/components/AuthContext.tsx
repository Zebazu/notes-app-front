import { createContext, useState, ReactNode, useContext } from "react";
import axios from "axios";

interface AuthContextProps {
  fetchToken: () => string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const fetchToken =   () => {
    const storedToken = localStorage.getItem('token');
    return storedToken;
  }
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/login", {
        username,
        password,
      });
      const token = response.data.access_token;
      setToken(token);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Falló el Login", error);
      throw new Error("Credenciales inválidas");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ fetchToken, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth tiene que ser usado con AuthProvider");
  }
  return context;
};
