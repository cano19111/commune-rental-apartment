import React, { useState } from 'react';
import logo from '@/assets/header-logo.png';
import { navigates } from '@/utils/constant';
import { SignIn, SignUp } from '@/components';
import { NavLink } from 'react-router-dom';
import { Flex, Button, Modal, Tabs, Drawer, Space } from 'antd';
import { CgMenuLeft } from 'react-icons/cg';
import type { TabsProps } from 'antd';
const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: <div className="font-main text-xl w-[390px] flex items-center justify-center">Login</div>,
            children: <SignIn />,
        },
        {
            key: '2',
            label: <div className="font-main text-xl w-[390px] flex items-center justify-center">Register</div>,
            children: <SignUp />,
        },
    ];
    return (
        <div className="w-full h-[90px] fixed top-0 left-0 shadow-md flex items-center justify-center">
            <div className="w-full  flex justify-between px-10">
                <Flex align="center" gap={20}>
                    <div className="lg:hidden" onClick={() => setOpen(true)}>
                        <CgMenuLeft size={30} />
                    </div>
                    <img src={logo} />
                </Flex>

                <Flex gap={60}>
                    <div className="hidden lg:block">
                        <Flex gap={20}>
                            {navigates.map((navigate, index) => (
                                <NavLink className="text-[22px] font-semibold" key={index} to={navigate.path}>
                                    {navigate.title}
                                </NavLink>
                            ))}
                        </Flex>
                    </div>

                    <Flex gap={10}>
                        <Button className="font-main h-10 w-[100px]" onClick={() => setIsModalOpen(true)}>
                            Sign in
                        </Button>
                        <Button className="font-main h-10 w-[100px]">Sign up</Button>
                    </Flex>
                </Flex>
            </div>

            <Modal
                centered
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                width={840}
                footer={null}
                styles={{
                    mask: {
                        backdropFilter: 'blur(10px)',
                    },
                }}
            >
                <Tabs defaultActiveKey="1" items={tabItems} tabBarGutter={0} />
            </Modal>
            <Drawer
                title={<div className="flex items-center justify-center font-main font-semibold text-2xl">Menu</div>}
                placement="left"
                width={300}
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
