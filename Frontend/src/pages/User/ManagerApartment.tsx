import { Button, Flex } from 'antd';
import React from 'react';
import { EditOutlined } from '@ant-design/icons';

const ManagerApartment: React.FC = () => {
    return (
        <div className="flex h-screen gap-5 w-full items-start flex-wrap">
            <div className="w-[350px] h-[460px] opacity-100 bg-white rounded-3xl shadow-card-sm p-2">
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw4MXx8SG90ZWx8ZW58MXx8fHwxNjYzMTYzMTI1&ixlib=rb-1.2.1&q=80&w=1080"
                        className="w-full h-[300px] object-cover rounded-xl"
                        alt="Apartment Image"
                    />
                    <span className="absolute top-2 left-2 px-4 py-1.5 bg-green-200 rounded-full text-xs uppercase text-center tracking-normal leading-4 whitespace-nowrap text-green-500">
                        9.6
                    </span>
                </div>
                <div className="text-lg mt-3 font-bold">Hotel Ta hoa</div>
                <div className="text-sm text-gray-500 mt-1">123 Main Street, City</div>
                <div className="text-sm text-gray-500 mt-1">Price: $120/night</div>
                <Flex align="center" justify="end" gap={5}>
                    <Button type="primary" size="large" icon={<EditOutlined />} className="bg-blue-500 font-main">
                        Edit
                    </Button>
                    <Button danger ghost size="large" className="font-main">
                        Delete
                    </Button>
                </Flex>
            </div>
            <div className="w-[350px] h-[460px] opacity-100 bg-white rounded-3xl shadow-card-sm p-2">
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHw4MXx8SG90ZWx8ZW58MXx8fHwxNjYzMTYzMTI1&ixlib=rb-1.2.1&q=80&w=1080"
                        className="w-full h-[300px] object-cover rounded-xl"
                        alt="Apartment Image"
                    />
                    <span className="absolute top-2 left-2 px-4 py-1.5 bg-green-200 rounded-full text-xs uppercase text-center tracking-normal leading-4 whitespace-nowrap text-green-500">
                        9.6
                    </span>
                </div>
                <div className="text-lg mt-3 font-bold">Hotel Ta hoa</div>
                <div className="text-sm text-gray-500 mt-1">123 Main Street, City</div>
                <div className="text-sm text-gray-500 mt-1">Price: $120/night</div>
                <Flex align="center" justify="end" gap={5}>
                    <Button type="primary" size="large" icon={<EditOutlined />} className="bg-blue-500 font-main">
                        Edit
                    </Button>
                    <Button danger ghost size="large" className="font-main">
                        Delete
                    </Button>
                </Flex>
            </div>
        </div>
    );
};

export default ManagerApartment;
