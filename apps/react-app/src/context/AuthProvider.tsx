import axios, { AxiosResponse } from 'axios';
import React, { createContext, useCallback, useState } from 'react';

interface AuthContextProps {
  authLoading: boolean;
  isAuthenticated: boolean | null;
  validateToken: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  authLoading: false,
  isAuthenticated: null,
  validateToken: () => {}
});

interface AuthProviderProps {
  children: React.JSX.Element;
}

export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  const [authLoading, setAuthLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem('apiToken');
    const onLoading = (isLoading: boolean) => setAuthLoading(isLoading);

    onLoading(true);
    await axios({
      url: 'https://test.neuraac.com/api/posts',
      method: 'get',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => onLoading(false));
  }, []);

  return <AuthContext.Provider value={{ authLoading, isAuthenticated, validateToken }}>{children}</AuthContext.Provider>;
}
