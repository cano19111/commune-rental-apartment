import { NavLink } from 'react-router-dom';
import { path } from '@/utils/constant';
import React from 'react';
import clsx from 'clsx';
import icons from '@/utils/icons';
const { FaUser, FaEdit } = icons;

const SideBarSetting: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-start gap-3 border-r pr-5 h-full border-gray-300 font-main min-w-[250px]">
            <NavLink
                to={`/${path.ACCOUNT_SETTINGS}/${path.PERSONAL_INFORMATION}`}
                end
                className={({ isActive }) =>
                    clsx(
                        'w-full py-1 px-4 font-normal text-lg flex items-center gap-2',
                        isActive ? ' text-blue-600' : 'text-gray-700 ',
                    )
                }
            >
                <FaUser size={20} />
                <span>Personal Information</span>
            </NavLink>

            <NavLink
                to={`/${path.ACCOUNT_SETTINGS}/${path.MANAGE_APARTMENT}`}
                className={({ isActive }) =>
                    clsx(
                        'w-full py-1 px-4 font-normal text-lg flex items-center gap-2',
                        isActive ? ' text-blue-600' : 'text-gray-700 ',
                    )
                }
            >
                <FaEdit size={20} />
                <span>Manage Apartment</span>
            </NavLink>
        </div>
    );
};

export default SideBarSetting;
