import React from 'react';
import { Button, Table, Tag } from 'antd';
import { FiMinus, FiPlus } from 'react-icons/fi';
import icons from '@/utils/icons';
const { FaUser, BsHouse } = icons;

interface RoomType {
    roomType: string;
    services: string[];
    sizeRoom: number;
}

interface DataTypeRooms {
    key: string;
    roomType: RoomType;
    numberOfGuest: number;
    price: number;
    roomNumber: number;
    quantity: number;
}

const TableSelectRoom: React.FC<{
    numberOfDay: number;
    onChange: (updatedRooms: DataTypeRooms[]) => void;
    value: DataTypeRooms[];
}> = ({ numberOfDay, onChange, value }) => {
    const [selectedRoomKey, setSelectedRoomKey] = React.useState<string | null>(
        value.some((room) => room.roomNumber > 0) ? value.find((room) => room.roomNumber > 0)?.key : null,
    );

    const increaseRoom = (roomId: string) => {
        const updatedRooms = value.map((room) => {
            if (room.key === roomId) {
                const newRoomNumber = room.roomNumber + 1;
                setSelectedRoomKey(newRoomNumber > 0 ? roomId : null);
                return newRoomNumber <= room.quantity ? { ...room, roomNumber: newRoomNumber } : room;
            }
            return room;
        });
        onChange(updatedRooms);
    };

    const decreaseRoom = (roomId: string) => {
        const updatedRooms = value.map((room) =>
            room.key === roomId && room.roomNumber > 0 ? { ...room, roomNumber: room.roomNumber - 1 } : room,
        );
        setSelectedRoomKey(updatedRooms.some((room) => room.roomNumber > 0) ? roomId : null);
        onChange(updatedRooms);
    };

    return (
        <div>
            <Table
                bordered
                size="large"
                sticky={{ offsetHeader: 90 }}
                columns={[
                    {
                        title: 'Room type',
                        dataIndex: 'roomType',
                        key: 'roomType',
                        render: (roomType: RoomType) => (
                            <div className="flex flex-col gap-3">
                                <h3 className="text-lg font-medium text-blue-600">{roomType.roomType}</h3>
                                <div className="flex flex-wrap gap-2">
                                    <Tag className="flex items-center gap-2">
                                        <BsHouse />
                                        {roomType.sizeRoom}
                                        {' m²'}
                                    </Tag>
                                    {(roomType.services || []).map((service: string, index: number) => (
                                        <Tag key={index}>{service}</Tag>
                                    ))}
                                </div>
                            </div>
                        ),
                    },
                    {
                        title: 'Number of guests',
                        dataIndex: 'numberOfGuest',
                        key: 'numberOfGuest',
                        render: (numberOfGuest: number) => (
                            <span className="flex items-center justify-start gap-2">
                                <FaUser />
                                <span>{`x ${numberOfGuest}`}</span>
                            </span>
                        ),
                    },
                    {
                        title: `Price for ${numberOfDay} nights`,
                        dataIndex: 'price',
                        key: 'price',
                        render: (price: number) => (
                            <span className="">{`${(numberOfDay * price)?.toLocaleString()} VND`}</span>
                        ),
                    },
                    {
                        title: 'Room number',
                        key: 'roomNumber',
                        dataIndex: 'roomNumber',
                        render: (_, record) => (
                            <div className="flex items-center justify-center px-2">
                                <Button
                                    type="primary"
                                    icon={<FiMinus size={18} />}
                                    className={`px-3 py-4 bg-blue-500 text-white rounded-none rounded-l-2xl flex items-center justify-center`}
                                    onClick={() => decreaseRoom(record.key)}
                                    disabled={selectedRoomKey !== null && selectedRoomKey !== record.key}
                                />
                                <span className="px-4 py-1.5 bg-gray-200">{record.roomNumber}</span>
                                <Button
                                    type="primary"
                                    icon={<FiPlus size={18} />}
                                    className={`px-3 py-4 bg-blue-500 text-white rounded-none rounded-r-2xl flex items-center justify-center`}
                                    onClick={() => increaseRoom(record.key)}
                                    disabled={selectedRoomKey !== null && selectedRoomKey !== record.key}
                                />
                            </div>
                        ),
                    },
                    {
                        title: 'Total',
                        key: 'total',
                        render: (_, record) => (
                            <span>{`${(record.price * record.roomNumber * numberOfDay)?.toLocaleString()} VND`}</span>
                        ),
                    },
                ]}
                dataSource={value}
                pagination={false}
            />
        </div>
    );
};

export default TableSelectRoom;
