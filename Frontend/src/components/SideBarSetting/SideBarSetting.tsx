import { NavLink } from 'react-router-dom';
import { path } from '@/utils/constant';
import React from 'react';
import clsx from 'clsx';
import icons from '@/utils/icons';
const { AiOutlineUser, BsHouses, CiCreditCard1, IoMdNotificationsOutline, IoSettingsOutline } = icons;

const SideBarSetting: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-start gap-3 border-r pr-5 h-full border-gray-300 font-main min-w-[250px]">
            <NavLink
                to={`/${path.ACCOUNT_SETTINGS}/${path.PERSONAL_INFORMATION}`}
                end
                className={({ isActive }) =>
                    clsx(
                        'w-full py-1 px-4 font-normal text-lg flex items-center gap-3',
                        isActive ? ' text-blue-600' : 'text-gray-700 ',
                    )
                }
            >
                <AiOutlineUser size={20} />
                <span>Personal Information</span>
            </NavLink>
            <NavLink
                to={`/${path.ACCOUNT_SETTINGS}/${path.MANAGE_APARTMENT}`}
                className={({ isActive }) =>
                    clsx(
                        'w-full py-1 px-4 font-normal text-lg flex items-center gap-3',
                        isActive ? ' text-blue-600' : 'text-gray-700 ',
                    )
                }
            >
                <BsHouses size={20} />
                <span>Manage Apartment</span>
            </NavLink>
            <NavLink
                to={`/${path.ACCOUNT_SETTINGS}/payment`}
                className={({ isActive }) =>
                    clsx(
                        'w-full py-1 px-4 font-normal text-lg flex items-center gap-3',
                        isActive ? ' text-blue-600' : 'text-gray-700 ',
                    )
                }
            >
                <CiCreditCard1 size={25} />
                <span className="-ml-1">Payment information</span>
            </NavLink>

            <NavLink
                to={`/${path.ACCOUNT_SETTINGS}/notification`}
                className={({ isActive }) =>
                    clsx(
                        'w-full py-1 px-4 font-normal text-lg flex items-center gap-3',
                        isActive ? ' text-blue-600' : 'text-gray-700 ',
                    )
                }
            >
                <IoMdNotificationsOutline size={25} />
                <span className="-ml-1">Notification</span>
            </NavLink>
            <NavLink
                to={`/${path.ACCOUNT_SETTINGS}/settings`}
                className={({ isActive }) =>
                    clsx(
                        'w-full py-1 px-4 font-normal text-lg flex items-center gap-3',
                        isActive ? ' text-blue-600' : 'text-gray-700 ',
                    )
                }
            >
                <IoSettingsOutline size={20} />
                <span>Settings</span>
            </NavLink>
        </div>
    );
};

export default SideBarSetting;
