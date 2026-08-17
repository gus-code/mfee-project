import React, {createContext, useState, useContext, ReactNode } from 'react';

interface ProviderProps {
    isAuthenticated: boolean;
    token:  string | null;
    loginAuth: (token: string) => void;
    //logout:() => void;
}

const AuthContext = createContext<ProviderProps>({
    isAuthenticated: false,
    token: null,
    loginAuth: () => {},
    //logout: () => {},
})

const AuthProvider = ({ children }: {children: ReactNode}) => {
 
    const [ token, setToken ] = useState<string | null>(()=>localStorage.getItem("token"));

    const loginAuth = (newToken: string ) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    {/*
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };*/}

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, token, loginAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext)
}