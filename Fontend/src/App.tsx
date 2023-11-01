// App.tsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from './router/Router';

const App: React.FC = () => {
    const router = Router();

    return (
        <div className="font-main">
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
