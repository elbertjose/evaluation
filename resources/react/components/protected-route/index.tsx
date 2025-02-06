import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {usePermissions} from "../../permisions";

interface ProtectedRouteProps {
    action: string;
    resource: string;
    redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ action, resource, redirectTo = "/" }) => {
    const perm = usePermissions();

    // Si no tiene permisos, redirige
    if (perm.adapter && !perm.adapter?.can(action, resource)) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
