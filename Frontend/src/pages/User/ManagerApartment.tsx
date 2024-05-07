import { Button, Card, Flex, Skeleton } from 'antd';
import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { apiGetApartmentByUser } from '@/apis';

const ManagerApartment: React.FC = () => {
    const { data: { data = {} } = {}, isFetching } = useQuery({
        queryKey: ['apartmentUser'],
        queryFn: apiGetApartmentByUser,
    });
    return isFetching ? (
        <div className="flex min-h-screen gap-5 w-full items-start flex-wrap font-main pb-10">
            {[1, 2, 3, 4].map((index) => (
                <Card key={index} style={{ width: 350, height: 460, marginTop: 16 }}>
                    <Skeleton loading={true} active>
                        <Card.Meta title="Card title" description="Description" />
                    </Skeleton>
                </Card>
            ))}
        </div>
    ) : (
        <div className="flex min-h-screen gap-5 w-full items-start flex-wrap font-main pb-10">
            {(data?.apartments || []).map((apartment) => (
                <div className="w-[350px] h-[460px] opacity-100 bg-white rounded-3xl shadow-card-sm p-2">
                    <div className="relative">
                        <img
                            src={apartment.image}
                            className="w-full h-[300px] object-cover rounded-xl"
                            alt="Apartment Image"
                        />
                        <span className="absolute top-2 left-2 px-4 py-1.5 bg-green-200 rounded-full text-xs uppercase text-center tracking-normal leading-4 whitespace-nowrap text-green-500">
                            9.6
                        </span>
                    </div>
                    <div className="text-lg mt-3 font-bold">{apartment.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{`${apartment.location.street}, ${apartment.location.ward}, ${apartment.location.district}, ${apartment.location.province}`}</div>
                    <div className="mt-1 text-base">Price: {apartment.price.toLocaleString()} VND</div>
                    <Flex align="center" justify="end" gap={5}>
                        <Button type="primary" size="large" icon={<EditOutlined />} className="bg-blue-500 font-main">
                            Edit
                        </Button>
                        <Button danger ghost size="large" className="font-main">
                            Delete
                        </Button>
                    </Flex>
                </div>
            ))}
        </div>
    );
};

export default ManagerApartment;
