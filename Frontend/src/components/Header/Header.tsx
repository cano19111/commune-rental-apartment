import React, { useState } from 'react';
import logo from '@/assets/header-logo1.png';
import { navigates, path } from '@/utils/constant';
import { MenuAccount, SignIn, SignUp } from '@/components';
import { NavLink, useNavigate } from 'react-router-dom';
import { Flex, Button, Modal, Tabs, Drawer, Image, Popover, Avatar } from 'antd';
import type { TabsProps } from 'antd';
import icons from '@/utils/icons';
import { useAuth } from '@/hooks';
import clsx from 'clsx';

const Header: React.FC = () => {
    const { SlClose, AiOutlineUsergroupAdd, PiSignInBold, CgMenuLeft, HiMenu } = icons;
    const navigate = useNavigate();
    const [openNavigate, setOpenNavigate] = useState(false);
    const { isAuthenticated, user: currentUser, authModel, setAuthModel } = useAuth();
    const tabItemsModal: TabsProps['items'] = [
        {
            key: 'signin',
            label: (
                <div
                    className="font-main text-xl w-[120px] flex items-center justify-center lg:w-[390px] md:w-[350px] sm:w-[300px]"
                    onClick={() => setAuthModel({ isOpen: true, activeTab: 'signin' })}
                >
                    Sign In
                </div>
            ),
            children: <SignIn setModalOpen={setAuthModel} />,
        },
        {
            key: 'signup',
            label: (
                <div
                    className="font-main text-xl w-[120px] flex items-center justify-center lg:w-[390px] md:w-[350px] sm:w-[300px]"
                    onClick={() => setAuthModel({ isOpen: true, activeTab: 'signup' })}
                >
                    Sign Up
                </div>
            ),
            children: <SignUp />,
        },
    ];
    return (
        <header className="w-full h-[90px] sticky top-0 flex items-center justify-center bg-white z-10 ">
            <div className="w-full  flex justify-between px-3 md:px-10 select-none">
                <div className="lg:hidden" onClick={() => setOpenNavigate(true)}>
                    <CgMenuLeft size={30} />
                </div>
                <Image
                    src={logo}
                    className="w-[110px] md:w-[150px] cursor-pointer"
                    preview={false}
                    onClick={() => navigate(`/${path.HOME}`)}
                />
                <Flex gap={40} align="center">
                    <div className="hidden lg:block">
                        <Flex gap={15} align="center">
                            {navigates.map((navigate, index) => (
                                <NavLink
                                    key={index}
                                    to={navigate.path}
                                    className={({ isActive }) =>
                                        clsx(
                                            'relative font-main text-[20px] font-medium text-black transition duration-500 ease-in-out',
                                            isActive ? 'navLink-active text-blue-500' : '',
                                            'navLink',
                                        )
                                    }
                                >
                                    {navigate.title}
                                </NavLink>
                            ))}
                        </Flex>
                    </div>

                    <Flex gap={10} align="center">
                        {!isAuthenticated && !currentUser ? (
                            <>
                                <Button
                                    className="font-main h-10 px-2 md:px-7 hidden lg:block rounded-full"
                                    onClick={() => setAuthModel({ isOpen: true, activeTab: 'signup' })}
                                >
                                    Sign up
                                </Button>
                                <Button
                                    type="primary"
                                    className="font-main h-10 px-2 md:px-7 hidden lg:block bg-blue-500 text-white rounded-full"
                                    onClick={() => setAuthModel({ isOpen: true, activeTab: 'signin' })}
                                >
                                    Sign in
                                </Button>
                            </>
                        ) : (
                            <Popover
                                placement="bottom"
                                content={<MenuAccount />}
                                arrow={true}
                                mouseLeaveDelay={0.3}
                                trigger={['hover']}
                            >
                                <span className="mt-3 mx-5 mb-3 cursor-pointer px-3 py-1.5 flex items-center gap-1.5 border border-gray-300 rounded-full justify-center">
                                    <HiMenu size={17} />
                                    <Avatar size={30} src={currentUser?.avatar} className="border border-blue-500 " />
                                </span>
                            </Popover>
                        )}
                    </Flex>
                </Flex>
            </div>

            <Modal
                centered
                open={authModel.isOpen}
                onOk={() => setAuthModel({ isOpen: false, activeTab: 'signin' })}
                onCancel={() => setAuthModel({ isOpen: false, activeTab: 'signin' })}
                width={840}
                footer={null}
                closeIcon={<SlClose size={25} />}
                styles={{
                    mask: {
                        backdropFilter: 'blur(10px)',
                    },
                }}
            >
                <Tabs centered={true} activeKey={authModel.activeTab} items={tabItemsModal} tabBarGutter={0} />
            </Modal>
            <Drawer
                title={
                    <div
                        className="w-full flex items-center justify-end cursor-pointer"
                        onClick={() => setOpenNavigate(false)}
                    >
                        <SlClose size={28} />
                    </div>
                }
                placement="left"
                width="100%"
                onClose={() => setOpenNavigate(false)}
                open={openNavigate}
                closeIcon={null}
            >
                <div className="flex flex-col gap-5 select-none" onClick={() => setOpenNavigate(false)}>
                    <Flex gap={20} vertical>
                        {navigates.map((navigate, index) => (
                            <NavLink
                                className="font-main text-[22px] font-medium flex items-center gap-5"
                                key={index}
                                to={navigate.path}
                            >
                                <span>{navigate.icon}</span>
                                <span>{navigate.title}</span>
                            </NavLink>
                        ))}
                    </Flex>
                    {!isAuthenticated && (
                        <Flex gap={20} vertical>
                            <span
                                className="font-main cursor-pointer text-[22px] font-medium flex items-center gap-5"
                                onClick={() => setAuthModel({ isOpen: true, activeTab: 'signin' })}
                            >
                                <PiSignInBold />
                                <span>Sign in</span>
                            </span>
                            <span
                                className="font-main cursor-pointer text-[22px] font-medium flex items-center gap-5"
                                onClick={() => setAuthModel({ isOpen: true, activeTab: 'signup' })}
                            >
                                <span>
                                    <AiOutlineUsergroupAdd />
                                </span>
                                <span> Sign up</span>
                            </span>
                        </Flex>
                    )}
                </div>
            </Drawer>
        </header>
    );
};

export default Header;
