import { Header } from '@/components';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <Header />
            <div className="mt-[90px] max-w-[1170px] w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
