"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { AuthService } from "../services/AuthService";
import type { IUser } from "../types/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

interface TokenPayload extends JwtPayload {
  role: string;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isExpired = (exp: number) => {
    if (exp > new Date().getTime()) {
      logout();
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token", token);

    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      if (decoded.exp) {
        isExpired(decoded.exp);
      }
      setUser({ token: token, role: decoded.role });
    }

    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const response = await AuthService.login(username, password);

    const token = response.data.token;
    console.log(response);
    localStorage.setItem("token", token.result);

    const decoded = await jwtDecode<TokenPayload>(token.result);
    console.log(decoded);
    setUser({ token: token, role: decoded.role });

    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
