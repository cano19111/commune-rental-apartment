import { Footer, Header } from '@/components';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
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
