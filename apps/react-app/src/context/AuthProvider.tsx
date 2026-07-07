import axios, { AxiosResponse } from "axios";
import React, { createContext, useCallback, useState } from "react";
import axiosInstance, { BASE_URL } from "../api/axios";

interface AuthContextProps {
  authLoading: boolean;
  isAuthenticated: boolean | null;
  validateToken: () => void;
  logout: ()=> void;
}

export const AuthContext = createContext<AuthContextProps>({
  authLoading: false,
  isAuthenticated: null,
  validateToken: () => {},
  logout: ()=> {},
});

interface AuthProviderProps {
  children: React.JSX.Element;
}

export function AuthProvider({
  children,
}: AuthProviderProps): React.JSX.Element {
  const [authLoading, setAuthLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if(!token){
      setIsAuthenticated(false); return;
    }
    setAuthLoading(true);

    try {
      const response: AxiosResponse = await axiosInstance.get("/posts");
      if(response.status === 200){setIsAuthenticated(true)};
    }
    catch {setIsAuthenticated(false);}
    finally{setAuthLoading(false);}
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ authLoading, isAuthenticated, validateToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
