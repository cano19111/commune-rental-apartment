import React from 'react';
import background from '@/assets/background.jpg';
import { Input, DatePicker, Dropdown, Button, InputNumber } from 'antd';
import { FaLocationDot } from 'react-icons/fa6';
import { AiOutlinePlus } from 'react-icons/ai';

import type { MenuProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <div className="flex items-center justify-between w-[200px] mt-3 px-3 cursor-default">
                <div className="flex font-main font-semi">Guest</div>
                <div className="flex items-center gap-2">
                    <Button
                        className="w-[30px] h-[30px] rounded-full border border-gray-900 flex items-center justify-center"
                        icon={<AiOutlinePlus />}
                    />
                    <span>1</span>
                    <Button
                        className="w-[30px] h-[30px] rounded-full border border-gray-900 flex items-center justify-center"
                        icon={<AiOutlinePlus />}
                    />
                </div>
            </div>
        ),
    },
    {
        key: '2',
        label: (
            <div className="flex items-center justify-between w-[200px] mt-3 px-3">
                <div className="flex">Rooms</div>
                <div className="flex items-center gap-2">
                    <Button
                        className="w-[30px] h-[30px] rounded-full border border-gray-900 flex items-center justify-center"
                        icon={<AiOutlinePlus />}
                    />
                    <span>1</span>
                    <Button
                        className="w-[30px] h-[30px] rounded-full border border-gray-900 flex items-center justify-center"
                        icon={<AiOutlinePlus />}
                    />
                </div>
            </div>
        ),
    },
];
const Home: React.FC = () => {
    return (
        <div className="h-[1500px]">
            <div
                className="bg-cover bg-center relative h-[960px] w-screen"
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="absolute inset-0 flex items-center flex-col justify-center text-white px-[15px]">
                    <div className="text-[3rem] font-main font-semibold">Find Your Dream Home</div>
                    <div className="text-lg font-main font-semi">
                        From as low as $10 per day with limited time offer discounts.
                    </div>
                    <div className="max-w-[900px] w-full min-h-[100px] bg-white rounded-2xl mt-[30px] flex justify-start items-center px-10 gap-5 flex-wrap py-10  lg:rounded-full">
                        <Input
                            size="large"
                            placeholder="Location"
                            prefix={
                                <i className="mr-5">
                                    <FaLocationDot />
                                </i>
                            }
                            className="rounded-full p-3 w-[200px]"
                        />
                        <DatePicker.RangePicker className="font-main rounded-full px-5 py-3 min-w-[200px] max-w-[270px]" />
                        <Dropdown menu={{ items }} placement="bottomLeft" trigger="click">
                            <Button className="font-main px-5 h-[50px] rounded-full">Number of guest</Button>
                        </Dropdown>
                        <Button
                            className="font-main px-5 h-[50px] rounded-full"
                            danger
                            type="primary"
                            icon={<SearchOutlined />}
                        >
                            Search
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
