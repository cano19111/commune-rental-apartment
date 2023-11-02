import { Footer, Header } from '@/components';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
    return (
        <div className="w-full flex items-center flex-col justify-center z-50">
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
//className="max-w-[1220px] w-full"
