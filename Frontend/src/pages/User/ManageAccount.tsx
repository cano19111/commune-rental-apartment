import SideBarSetting from '@/components/SideBarSetting/SideBarSetting';
import React from 'react';
import { Outlet } from 'react-router-dom';

const ManageAccount: React.FC = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="max-w-main w-full min-h-screen flex mt-10 gap-10">
                <div className="max-w-[300px] w-full">
                    <SideBarSetting />
                </div>
                <div className="w-full pl-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ManageAccount;
