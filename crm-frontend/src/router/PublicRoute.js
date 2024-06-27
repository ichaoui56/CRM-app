import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; 

const PublicRoute = ({ element: Component, ...rest }) => {
const { isAuthenticated } = useAuth();

if (!isAuthenticated()) {
    return <Component {...rest} />;
}

return <Navigate to="auth/sign-in" />;
};

export default PublicRoute;
