import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { DATA_BASE_URL } from "../api/axios";

interface AuthContextProps {
  authLoading: boolean;
  isAuthenticated: boolean;
  validateToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  authLoading: false,
  isAuthenticated: false,
  validateToken: async () => {},
});

interface AuthProviderProps {
  children: React.JSX.Element;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authLoading, setAuthLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      setAuthLoading(true);

      const response = await axios.get(
        `${DATA_BASE_URL}/auth/validate`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
      localStorage.removeItem("accessToken");
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return (
    <AuthContext.Provider
      value={{ authLoading, isAuthenticated, validateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}