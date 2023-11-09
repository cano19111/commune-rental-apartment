import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Home, MainLayout } from '@/pages/Public';
import { path } from '@/utils/constant';
import { CreateApartment, MyFavorites } from '@/pages/User';

const Router = () => {
    const routes: RouteObject[] = [
        {
            path: path.HOME,
            element: <Home />,
        },
        {
            path: path.CREATE_APARTMENT,
            element: <CreateApartment />,
        },
        {
            path: path.FAVORITES,
            element: <MyFavorites />,
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
