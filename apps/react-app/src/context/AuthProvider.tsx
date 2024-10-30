import axios, { AxiosResponse } from "axios";
import React, { createContext, useCallback, useState } from "react";

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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhdmlkQG91dGxvb2suY29tIiwiaWF0IjoxNzE1ODA1MTQzLCJleHAiOjE3MTU4MDg3NDN9.hsVhN9KdKhGeKZi7-ti-bAkGPS1vahx-qnCrpWMg0Bg";
      // ACT 11 - Get the token from localStorage
    const onLoading = (isLoading: boolean) => setAuthLoading(isLoading);

    onLoading(true);
    await axios({
      url: "https://test.neuraac.com/api/posts",
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
