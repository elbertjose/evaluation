import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from "../components/layouts/main";
import AppRoutes from "../routes";


const App: React.FC = () => {
    return (
        <Router>
            <MainLayout>
                <AppRoutes />
            </MainLayout>
        </Router>
    );
};

export default App;
