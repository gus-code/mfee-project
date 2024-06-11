import { NewUser, User } from '../types';
import { createUser, login, logout, refreshToken } from '../api';
import { useCallback, createContext } from 'react';

interface AuthContextProps {
  authRegister: (user: NewUser) => void;
  openSession: (user: User) => void;
  closeSession: () => void;
  refresh: () => void;
}

interface AuthProviderProps {
  children: React.JSX.Element;
}

export const AuthContext = createContext<AuthContextProps>({
  authRegister: () => {},
  openSession: () => {},
  closeSession: () => {},
  refresh: () => {}
});

export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  const onLoading = (isLoading: boolean) => {};

  const onError = useCallback(() => {
    // createAlert({
    //   message: "Something went wrong.",
    //   severity: "error",
    // });
  }, []);

  const authRegister = useCallback(
    async (user: NewUser) => {
      const onSuccess = async () => {};

      await createUser({ newUser: user, onSuccess, onError, onLoading });
    },
    [onError]
  );

  const openSession = useCallback(async (user: User) => {
    const onSuccess = async () => {
      console.log('Success lolgin')
    };

    await login({ user, onSuccess, onError, onLoading })
  }, [onError]);

  const closeSession = useCallback(async () => {}, []);
  const refresh = useCallback(async () => {}, []);

  return (
    <AuthContext.Provider
      value={{
        authRegister,
        openSession,
        closeSession,
        refresh
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
