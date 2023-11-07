import { AddRoom } from '@/components';
import { Flex, Input, Button } from 'antd';
import React, { useState } from 'react';

const CreateApartment: React.FC = () => {
    const [roomCount, setRoomCount] = useState(1);

    const addRoom = () => {
        setRoomCount(roomCount + 1);
    };

    return (
        <div className="max-w-main mx-auto p-10 flex flex-col gap-5">
            <h1 className="text-3xl font-bold mb-5">Create Apartment</h1>

            <div className="flex flex-col mb-5">
                <label className="text-lg mb-2">Title</label>
                <Input size="large" className="p-2 rounded-xl" placeholder="Enter the title" />
            </div>

            <div className="flex gap-5">
                <div className="flex flex-col">
                    <label className="text-lg mb-2">Province</label>
                    <Input size="large" className="p-2 rounded-xl" placeholder="Enter the title" />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg mb-2">District</label>
                    <Input size="large" className="p-2 rounded-xl" placeholder="Enter the title" />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg mb-2">Ward</label>
                    <Input size="large" className="p-2 rounded-xl" placeholder="Enter the title" />
                </div>
            </div>

            <Flex gap={20} align="center">
                <div className="flex flex-col">
                    <label className="text-lg mb-2">Longitude</label>
                    <Input size="large" className="p-2 rounded-xl" placeholder="Enter the longitude" />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg mb-2">Latitude</label>
                    <Input size="large" className="p-2 rounded-xl" placeholder="Enter the latitude" />
                </div>
            </Flex>

            <AddRoom />
            {[...Array(roomCount - 1)].map((_, index) => (
                <AddRoom key={index} />
            ))}
            <Button type="primary" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={addRoom}>
                Add Room
            </Button>
        </div>
    );
};

export default CreateApartment;
