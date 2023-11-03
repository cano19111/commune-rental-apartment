import React, { useState } from 'react';
import logo from '@/assets/header-logo1.png';
import { navigates } from '@/utils/constant';
import { SignIn, SignUp } from '@/components';
import { NavLink } from 'react-router-dom';
import { Flex, Button, Modal, Tabs, Drawer, Image } from 'antd';
import type { TabsProps } from 'antd';
import icons from '@/utils/icons';

const Header: React.FC = () => {
    const { SlClose, AiOutlineUsergroupAdd, PiSignInBold, BsPersonCircle, CgMenuLeft } = icons;
    const [modalOpen, setModalOpen] = useState<{ isOpen: boolean; activeTab: string }>({
        isOpen: false,
        activeTab: 'signin',
    });
    const [open, setOpen] = useState(false);
    const tabItems: TabsProps['items'] = [
        {
            key: 'signin',
            label: (
                <div
                    className="font-main text-xl w-[150px] flex items-center justify-center lg:w-[390px]"
                    onClick={() => setModalOpen({ isOpen: true, activeTab: 'signin' })}
                >
                    Sign In
                </div>
            ),
            children: <SignIn />,
        },
        {
            key: 'signup',
            label: (
                <div
                    className="font-main text-xl w-[150px] flex items-center justify-center lg:w-[390px]"
                    onClick={() => setModalOpen({ isOpen: true, activeTab: 'signup' })}
                >
                    Sign Up
                </div>
            ),
            children: <SignUp />,
        },
    ];
    return (
        <div className="w-full h-[90px] sticky top-0 flex items-center justify-center shadow-md bg-white z-10">
            <div className="w-full  flex justify-between px-3 md:px-10 select-none">
                <div className="lg:hidden" onClick={() => setOpen(true)}>
                    <CgMenuLeft size={30} />
                </div>
                <Image src={logo} className="w-[110px] md:w-[150px]" preview={false} />
                <Flex gap={60}>
                    <div className="hidden lg:block">
                        <Flex gap={20}>
                            {navigates.map((navigate, index) => (
                                <NavLink className="font-main text-[22px] font-medium" key={index} to={navigate.path}>
                                    {navigate.title}
                                </NavLink>
                            ))}
                        </Flex>
                    </div>

                    <Flex gap={10}>
                        <Button
                            className="font-main h-10 px-2 md:px-7 hidden lg:block"
                            onClick={() => setModalOpen({ isOpen: true, activeTab: 'signin' })}
                        >
                            Sign in
                        </Button>
                        <Button
                            className="font-main h-10 px-2 md:px-7 hidden lg:block"
                            onClick={() => setModalOpen({ isOpen: true, activeTab: 'signup' })}
                        >
                            Sign up
                        </Button>
                        <span className="mt-1 lg:hidden mr-5 cursor-pointer">
                            <BsPersonCircle size={25} />
                        </span>
                    </Flex>
                </Flex>
            </div>

            <Modal
                centered
                open={modalOpen.isOpen}
                onOk={() => setModalOpen({ isOpen: false, activeTab: 'signin' })}
                onCancel={() => setModalOpen({ isOpen: false, activeTab: 'signin' })}
                width={840}
                footer={null}
                styles={{
                    mask: {
                        backdropFilter: 'blur(10px)',
                    },
                }}
            >
                <Tabs activeKey={modalOpen.activeTab} items={tabItems} tabBarGutter={0} />
            </Modal>
            <Drawer
                title={
                    <div className="w-full flex items-center justify-end cursor-pointer" onClick={() => setOpen(false)}>
                        <SlClose size={28} />
                    </div>
                }
                placement="left"
                width="100%"
                onClose={() => setOpen(false)}
                open={open}
                closeIcon={null}
            >
                <div className="flex flex-col gap-5 select-none" onClick={() => setOpen(false)}>
                    <Flex gap={20} vertical>
                        {navigates.map((navigate, index) => (
                            <NavLink
                                className="font-main text-[22px] font-medium flex items-center gap-5"
                                key={index}
                                to={navigate.path}
                            >
                                <span> {navigate.icon}</span>
                                <span> {navigate.title}</span>
                            </NavLink>
                        ))}
                    </Flex>
                    <Flex gap={20} vertical>
                        <span
                            className="font-main cursor-pointer text-[22px] font-medium flex items-center gap-5"
                            onClick={() => setModalOpen({ isOpen: true, activeTab: 'signin' })}
                        >
                            <PiSignInBold />
                            <span>Sign in</span>
                        </span>
                        <span
                            className="font-main cursor-pointer text-[22px] font-medium flex items-center gap-5"
                            onClick={() => setModalOpen({ isOpen: true, activeTab: 'signup' })}
                        >
                            <span>
                                <AiOutlineUsergroupAdd />
                            </span>
                            <span> Sign up</span>
                        </span>
                    </Flex>
                </div>
            </Drawer>
        </div>
    );
};

export default Header;
