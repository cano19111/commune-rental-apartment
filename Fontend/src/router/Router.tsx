// router/Router.tsx
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Home, MainLayout } from '@/pages/Public';
import { path } from '@/utils/constant';

const Router = () => {
    const routes: RouteObject[] = [
        {
            path: path.HOME,
            element: <Home />,
        },
        {
            path: path.ALL,
            element: <h1>404</h1>,
        },
    ];

    const router = createBrowserRouter([
        {
            path: path.ROOT,
            element: <MainLayout />,
            children: routes,
        },
        {
            path: path.ALL,
            element: <h1>404</h1>,
        },
    ]);

    return router;
};

export default Router;
