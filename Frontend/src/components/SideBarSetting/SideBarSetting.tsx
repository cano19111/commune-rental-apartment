import { NavLink } from 'react-router-dom';
import { path } from '@/utils/constant';
import React from 'react';

const SideBarSetting: React.FC = () => {
    return (
        <div className="w-full flex flex-col gap-2">
            <NavLink
                to={`/${path.ACCOUNT_SETTINGS}/${path.PERSONAL_INFORMATION}`}
                end
                className={({ isActive }) =>
                    isActive
                        ? 'w-full py-7 px-4 hover:bg-gray-100 bg-gray-200 text-blue-500 rounded-3xl'
                        : 'w-full py-7 px-4 text-gray-700 hover:bg-gray-100 rounded-3xl '
                }
            >
                Personal Information
            </NavLink>

            <NavLink
                to={`/${path.ACCOUNT_SETTINGS}/${path.MANAGE_APARTMENT}`}
                className={({ isActive }) =>
                    isActive
                        ? 'w-full py-7 px-4 hover:bg-gray-100 bg-gray-200 text-blue-500 rounded-3xl'
                        : 'w-full py-7 px-4 text-gray-700 hover:bg-gray-100 rounded-3xl'
                }
            >
                Manage Apartment
            </NavLink>
        </div>
    );
};

export default SideBarSetting;
