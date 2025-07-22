import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export const ProtectedRouteLogin = () => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? <Navigate to="/formulario" replace /> : <Outlet />;
};

export const ProtectedAdmin = () => {
    const { rol } = useAuth();

    return rol === "admin" ? <Outlet /> : <Navigate to="/formulario" replace />;
};
