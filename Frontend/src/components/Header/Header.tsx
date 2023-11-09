import React, { useState } from 'react';
import logo from '@/assets/header-logo1.png';
import { navigates, path } from '@/utils/constant';
import { SignIn, SignUp } from '@/components';
import { NavLink, useNavigate } from 'react-router-dom';
import { Flex, Button, Modal, Tabs, Drawer, Image } from 'antd';
import type { TabsProps } from 'antd';
import icons from '@/utils/icons';

const Header: React.FC = () => {
    const { SlClose, AiOutlineUsergroupAdd, PiSignInBold, BsPersonCircle, CgMenuLeft, AiOutlinePlus } = icons;
    const [modalOpen, setModalOpen] = useState<{ isOpen: boolean; activeTab: string }>({
        isOpen: false,
        activeTab: 'signin',
    });
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const tabItems: TabsProps['items'] = [
        {
            key: 'signin',
            label: (
                <div
                    className="font-main text-xl w-[120px] flex items-center justify-center lg:w-[390px] md:w-[350px] sm:w-[300px]"
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
                    className="font-main text-xl w-[120px] flex items-center justify-center lg:w-[390px] md:w-[350px] sm:w-[300px]"
                    onClick={() => setModalOpen({ isOpen: true, activeTab: 'signup' })}
                >
                    Sign Up
                </div>
            ),
            children: <SignUp />,
        },
    ];
    return (
        <header className="w-full h-[90px] sticky top-0 flex items-center justify-center shadow-md bg-white z-10 ">
            <div className="w-full  flex justify-between px-3 md:px-10 select-none">
                <div className="lg:hidden" onClick={() => setOpen(true)}>
                    <CgMenuLeft size={30} />
                </div>
                <Image src={logo} className="w-[110px] md:w-[150px]" preview={false} />
                <Flex gap={40} align="center">
                    <div className="hidden lg:block">
                        <Flex gap={15} align="center">
                            {navigates.map((navigate, index) => (
                                <NavLink className="font-main text-[20px] font-medium" key={index} to={navigate.path}>
                                    {navigate.title}
                                </NavLink>
                            ))}
                        </Flex>
                    </div>

                    <Flex gap={10} align="center">
                        <Button
                            type="primary"
                            icon={<AiOutlinePlus size={20} />}
                            className="bg-blue-500 font-main h-10 px-2 md:px-4 hidden lg:flex rounded-full items-center"
                            onClick={() => {
                                navigate(`/${path.CREATE_APARTMENT}`);
                            }}
                        >
                            Create
                        </Button>
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
                closeIcon={<SlClose size={25} />}
                styles={{
                    mask: {
                        backdropFilter: 'blur(10px)',
                    },
                }}
            >
                <Tabs centered={true} activeKey={modalOpen.activeTab} items={tabItems} tabBarGutter={0} />
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
                    <Button
                        type="primary"
                        icon={<AiOutlinePlus size={20} />}
                        className="bg-blue-500 font-main h-10 px-2 flex rounded-full items-center justify-center w-full"
                        onClick={() => {
                            navigate(`/${path.CREATE_APARTMENT}`);
                        }}
                    >
                        Create apartment
                    </Button>
                </div>
            </Drawer>
        </header>
    );
};

export default Header;
