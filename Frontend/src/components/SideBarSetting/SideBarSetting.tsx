import { NavLink } from 'react-router-dom';
import { path } from '@/utils/constant';
import React from 'react';
import clsx from 'clsx';

const SideBarSetting: React.FC = () => {
    return (
        <div className="w-full flex flex-col gap-2">
            <NavLink
                to={`/${path.ACCOUNT_SETTINGS}/${path.PERSONAL_INFORMATION}`}
                end
                className={({ isActive }) =>
                    clsx(
                        'w-full py-5 px-4 rounded-3xl hover:bg-gray-100 font-semibold text-xl',
                        isActive ? ' bg-gray-200 text-blue-400' : 'text-gray-700 ',
                    )
                }
            >
                Personal Information
            </NavLink>

            <NavLink
                to={`/${path.ACCOUNT_SETTINGS}/${path.MANAGE_APARTMENT}`}
                className={({ isActive }) =>
                    clsx(
                        'w-full py-5 px-4 rounded-3xl hover:bg-gray-100 font-semibold text-xl',
                        isActive ? ' bg-gray-200 text-blue-400' : 'text-gray-700 ',
                    )
                }
            >
                Manage Apartment
            </NavLink>
        </div>
    );
};

export default SideBarSetting;
