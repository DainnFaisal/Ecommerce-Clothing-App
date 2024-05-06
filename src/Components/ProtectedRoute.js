import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
    const location = useLocation();

    if (!user) {

        alert('You need to log in first to access this page!');

        // Redirecting the user to the login page, but saving the current location they were trying to go to.
        return <Navigate to="/Login" state={{ from: location }} replace />;
       
    }

    return children;
};

export default ProtectedRoute;
