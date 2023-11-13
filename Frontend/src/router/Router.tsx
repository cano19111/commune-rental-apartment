import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Home, MainLayout } from '@/pages/Public';
import { path } from '@/utils/constant';
import { CreateApartment, ManageAccount, MyFavorites } from '@/pages/User';
import PersonalDetail from '@/pages/User/PersonalDetail';
import ManagerApartment from '@/pages/User/ManagerApartment';

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
            path: path.ACCOUNT_SETTINGS,
            element: <ManageAccount />,
            children: [
                {
                    path: path.PERSONAL_DETAIL,
                    element: <PersonalDetail />,
                },
                {
                    path: path.MANAGE_APARTMENT,
                    element: <ManagerApartment />,
                },
            ],
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
