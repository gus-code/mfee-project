import { useState } from "react";
import { AuthInterface, NewAuth } from "apps/react-app/src/types";
import { Button } from "@mui/material";
import { logout } from "../../../api";

const LogoutButton = () => {

    const handleLogout = async () => {
        await logout({
            onSuccess : () => {
                localStorage.removeItem("token");
                const { protocol, host } = window.location;
                const signInUrl = `${protocol}//${host}/login`;
                if (window.location.href !== signInUrl) {
                    window.location.assign(signInUrl);
                };
            },
            onError: (error) => {
                console.log("Logout falló", error);
            },
        });
    };

    return (
        <Button variant="contained" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
