// App.tsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from './router/Router';
import { AuthProvider } from './contexts/auth/AuthContext';

const App: React.FC = () => {
    const router = Router();

    return (
        <div className="font-main">
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </div>
    );
};

export default App;
