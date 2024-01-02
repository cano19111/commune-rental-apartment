import { Footer, Header } from '@/components';
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <div className="w-full flex items-center flex-col justify-center z-50 font-main">
            <Header />
            <div className="w-full">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
