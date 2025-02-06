import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserPage from "../pages/users";
import ProtectedRoute from "../components/protected-route";
import HomePage from "../pages/home";


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<ProtectedRoute action={"view"} resource={"users"} redirectTo={'/'} />}>
               <Route path="/users" element={<UserPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
