import React, { useState } from 'react';
import logo from '@/assets/header-logo1.png';
import { navigates } from '@/utils/constant';
import { SignIn, SignUp } from '@/components';
import { NavLink } from 'react-router-dom';
import { Flex, Button, Modal, Tabs, Drawer, Image } from 'antd';
import { CgMenuLeft } from 'react-icons/cg';
import type { TabsProps } from 'antd';

const Header: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<{ isOpen: boolean; activeTab: string }>({
        isOpen: false,
        activeTab: 'signin',
    });
    const [open, setOpen] = useState(false);
    const tabItems: TabsProps['items'] = [
        {
            key: 'signin',
            label: (
                <div className="font-main text-xl w-[150px] flex items-center justify-center lg:w-[390px]">Sign In</div>
            ),
            children: <SignIn />,
        },
        {
            key: 'signup',
            label: (
                <div className="font-main text-xl w-[150px] flex items-center justify-center lg:w-[390px]">Sign Up</div>
            ),
            children: <SignUp />,
        },
    ];
    return (
        <div className="w-full h-[90px] sticky top-0 flex items-center justify-center shadow-md bg-white z-10">
            <div className="w-full  flex justify-between px-3 md:px-10">
                <div className="lg:hidden" onClick={() => setOpen(true)}>
                    <CgMenuLeft size={30} />
                </div>
                <Image src={logo} className="w-[110px] md:w-[150px]" preview={false} />
                <Flex gap={60}>
                    <div className="hidden lg:block">
                        <Flex gap={20}>
                            {navigates.map((navigate, index) => (
                                <NavLink className="text-[22px] font-semibold " key={index} to={navigate.path}>
                                    {navigate.title}
                                </NavLink>
                            ))}
                        </Flex>
                    </div>

                    <Flex gap={10}>
                        <Button
                            className="font-main h-10 px-2 md:px-7"
                            onClick={() => setModalOpen({ isOpen: true, activeTab: 'signin' })}
                        >
                            Sign in
                        </Button>
                        <Button
                            className="font-main h-10 px-2 md:px-7"
                            onClick={() => setModalOpen({ isOpen: true, activeTab: 'signup' })}
                        >
                            Sign up
                        </Button>
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
                // title={<div className="flex items-center justify-center font-main font-semibold text-2xl">Menu</div>}
                placement="left"
                width={250}
                closable={false}
                onClose={() => setOpen(false)}
                open={open}
            >
                <Flex gap={20} vertical>
                    {navigates.map((navigate, index) => (
                        <NavLink className="text-[22px] font-semibold" key={index} to={navigate.path}>
                            {navigate.title}
                        </NavLink>
                    ))}
                </Flex>
            </Drawer>
        </div>
    );
};

export default Header;
