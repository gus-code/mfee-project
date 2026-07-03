import axios, { AxiosResponse } from "axios";
import React, { createContext, useCallback, useState } from "react";
import { BASE_URL } from "../api/axios";

interface AuthContextProps {
  authLoading: boolean;
  isAuthenticated: boolean | null;
  validateToken: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  authLoading: false,
  isAuthenticated: null,
  validateToken: () => {},
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
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsYW5yYyIsImlhdCI6MTc1ODUyMDc4OSwiZXhwIjoxNzYxMTEyNzg5fQ.pPtq1A9_3yzKlo0rW-mvXfTnYB65Hk2IyIW6qkexb2c";
      // ACT 11 - Get the token from localStorage
    const onLoading = (isLoading: boolean) => setAuthLoading(isLoading);

    onLoading(true);
    await axios({
      url: BASE_URL + "/posts",
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => onLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ authLoading, isAuthenticated, validateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
