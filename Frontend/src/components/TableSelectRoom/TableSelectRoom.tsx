import icons from '@/utils/icons';
import { Table, Tag, Space } from 'antd';
import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
const { FaUser } = icons;

interface RoomType {
    roomType: string;
    services: string[];
}

interface DataTypeRooms {
    key: string;
    roomType: RoomType;
    numberOfGuest: number;
    price: number;
    roomNumber: number;
}

const TableSelectRoom: React.FC<{ roomsData: DataTypeRooms[]; numberRoom: number }> = ({ roomsData, numberRoom }) => {
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
                        title: `Price for ${numberRoom} nights`,
                        dataIndex: 'price',
                        key: 'price',
                        render: (price: number) => <span className="">{`${price?.toLocaleString()} VND`}</span>,
                    },
                    {
                        title: 'Room number',
                        key: 'roomNumber',
                        dataIndex: 'roomNumber',
                        render: (roomNumber: number) => (
                            <Space size="middle">
                                <FiPlus size={18} />
                                <span>{roomNumber}</span>
                                <FiMinus size={18} />
                            </Space>
                        ),
                    },
                    {
                        title: 'Total',
                        key: 'total',
                        render: (_, record) => (
                            <span>{`${(record.price * record.roomNumber)?.toLocaleString()} VND`}</span>
                        ),
                    },
                ]}
                dataSource={roomsData}
                pagination={false}
            />
        </div>
    );
};

export default TableSelectRoom;
