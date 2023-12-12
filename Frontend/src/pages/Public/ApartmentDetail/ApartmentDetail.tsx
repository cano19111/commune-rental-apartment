import { DropDownItem } from '@/components';
import icons from '@/utils/icons';
import { Avatar, Button, DatePicker, Dropdown, Image, Space, Table, Tag } from 'antd';
import React from 'react';
import './ApartmentDetail.css';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { FiMinus, FiPlus } from 'react-icons/fi';
const { FaLocationDot, FaUser } = icons;
interface DataType {
    key: string;
    roomType: { roomType: string; services: string[] };
    numberOfGuest: number;
    price: number;
    roomNumber: number;
}
const reviews = [
    {
        author: 'Dino',
        date: '5 days ago',
        comment:
            'Nice hotel, near the beach, friendly staff, an ideal place to stay, everything is fine, delicious, fresh food.',
    },
    {
        author: 'Alice',
        date: '1 week ago',
        comment:
            'Great experience! The room was clean, and the view from the balcony was breathtaking. I highly recommend this place.',
    },
    {
        author: 'Bob',
        date: '2 weeks ago',
        comment:
            'Amazing hospitality! The staff went above and beyond to make our stay memorable. Will definitely come back.',
    },
];

const data: DataType[] = [
    {
        key: '1',
        roomType: {
            roomType: 'Double Room',
            services: ['Wifi', 'Air Condition', 'Television', 'Balcony'],
        },
        numberOfGuest: 32,
        price: 2000000,
        roomNumber: 1,
    },
    {
        key: '2',
        roomType: {
            roomType: 'Double Room',
            services: ['Wifi', 'Air Condition', 'Television', 'Balcony'],
        },
        numberOfGuest: 32,
        price: 2000000,
        roomNumber: 1,
    },
    {
        key: '3',
        roomType: {
            roomType: 'Double Room',
            services: ['Wifi', 'Air Condition', 'Television', 'Balcony'],
        },
        numberOfGuest: 32,
        price: 2000000,
        roomNumber: 1,
    },
];

const ApartmentDetail: React.FC = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'rent-apartment-407116',
        //googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_MAP,
        googleMapsApiKey: 'AIzaSyBqip7J60tcOjwbuPv7qege_NMoQoFyNag',
    });

    return (
        <div className="w-full flex justify-center font-main">
            <div className="max-w-main w-full">
                <div className="grid grid-cols-4 gap-2 mt-10 w-full overflow-hidden">
                    <div className="col-span-2">
                        <Image
                            preview={false}
                            className="rounded-s-lg"
                            height="100%"
                            src="https://a0.muscache.com/im/pictures/miso/Hosting-51733196/original/346278d9-0b86-48b5-a307-ff036ee4dcf7.jpeg?im_w=960"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Image
                            preview={false}
                            height="100%"
                            src="https://a0.muscache.com/im/pictures/miso/Hosting-51733196/original/346278d9-0b86-48b5-a307-ff036ee4dcf7.jpeg?im_w=960"
                        />
                        <Image
                            preview={false}
                            height="100%"
                            src="https://a0.muscache.com/im/pictures/miso/Hosting-51733196/original/346278d9-0b86-48b5-a307-ff036ee4dcf7.jpeg?im_w=960"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Image
                            preview={false}
                            height="100%"
                            className="rounded-tr-md"
                            src="https://a0.muscache.com/im/pictures/miso/Hosting-51733196/original/346278d9-0b86-48b5-a307-ff036ee4dcf7.jpeg?im_w=960"
                        />
                        <Image
                            preview={false}
                            height="100%"
                            className="rounded-br-md"
                            src="https://a0.muscache.com/im/pictures/miso/Hosting-51733196/original/346278d9-0b86-48b5-a307-ff036ee4dcf7.jpeg?im_w=960"
                        />
                    </div>
                </div>
                <div className="flex items-start gap-5 mt-5">
                    <div className="flex flex-col">
                        <div className="font-main mt-5 flex flex-col justify-center gap-2">
                            <div className="text-2xl">
                                Phòng riêng tại nhà nghỉ dưỡng tại Ildo 1(il)-dong, Jeju-si, Hàn Quốc
                            </div>
                            <div className="flex items-center gap-1 font-light text-sm font-main">
                                <FaLocationDot color="#1640D6" size={15} />
                                <p className="hover:underline">Đường Huyền Trân Công Chúa, Da Lat, Vietnam</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 pt-7 flex-wrap">
                            <div className="px-3 py-2">Free parking</div>
                            <div className="px-3 py-2">Free parking</div>
                            <div className="px-3 py-2">Free parking</div>
                            <div className="px-3 py-2">Free parking</div>
                            <div className="px-3 py-2">Free parking</div>
                            <div className="px-3 py-2">Free parking</div>
                        </div>
                        <div className="mt-3">
                            <p className="text-sm font-light">
                                Offering a garden and mountain view, Lengkeng Da Lat Homestay is set in Da Lat, 2.6 km
                                from Xuan Huong Lake and 2.6 km from Yersin Park Da Lat. Private parking is available on
                                site at this sustainable property. The homestay offers inner courtyard views, a sun
                                terrace, a 24-hour front desk, and free WiFi is available throughout the property. The
                                units in the homestay are fitted with a kettle. There is a private bathroom with shower
                                in some units, along with slippers, a hair dryer and free toiletries. All units at the
                                homestay come with a seating area. A minimarket is available at the homestay.
                                Sightseeing tours are available within easy reach of the property. The homestay has an
                                outdoor fireplace and a children's playground. Lam Vien Square is 2.8 km from Lengkeng
                                Da Lat Homestay, while Dalat Flower Gardens is 3.3 km from the property. The nearest
                                airport is Lien Khuong, 29 km from the accommodation, and the property offers a paid
                                airport shuttle service. Couples particularly like the location — they rated it 9.6 for
                                a two-person trip. Distance in property description is calculated using © OpenStreetMap
                            </p>
                        </div>
                        <div className="my-7">
                            <Table
                                bordered
                                size="large"
                                sticky={true}
                                columns={[
                                    {
                                        title: 'Room type',
                                        dataIndex: 'roomType',
                                        key: 'roomType',
                                        render: (data) => (
                                            <div className="flex flex-col gap-3">
                                                <h3 className="text-lg font-medium text-blue-600">{data.roomType}</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {(data.services || []).map((service: string, index) => (
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
                                        render: (numberOfGuest) => (
                                            <span className="flex items-center justify-start gap-2">
                                                <FaUser />
                                                <span>{`x ${numberOfGuest}`}</span>
                                            </span>
                                        ),
                                    },
                                    {
                                        title: 'Price for 3 nights',
                                        dataIndex: 'price',
                                        key: 'price',
                                        render: (price) => <span className="">{`VND ${price?.toLocaleString()}`}</span>,
                                    },
                                    {
                                        title: 'Room number',
                                        key: 'roomNumber',
                                        dataIndex: 'roomNumber',
                                        render: (roomNumber) => (
                                            <div className="flex items-center gap-3">
                                                <span>
                                                    <FiPlus size={18} />
                                                </span>
                                                <span className="">{roomNumber}</span>
                                                <span>
                                                    <FiMinus size={18} />
                                                </span>
                                            </div>
                                        ),
                                    },
                                    {
                                        title: 'Total',
                                        key: 'total',
                                        render: (_, record) => (
                                            <a>VND {(record.price * record.roomNumber)?.toLocaleString()}</a>
                                        ),
                                    },
                                ]}
                                dataSource={data}
                                pagination={false}
                            />
                        </div>
                    </div>
                    <div className="min-w-[310px] p-7 shadow shadow-gray-400 rounded-xl sticky top-[140px] mt-5">
                        <div className="w-full flex flex-col gap-3 items-center justify-center">
                            <div>400,000 VND/ đêm</div>
                            <div className="flex flex-col justify-center">
                                <DatePicker.RangePicker
                                    format="YYYY-MM-DD"
                                    className="font-main rounded-xl px-5 py-3 min-w-[200px] max-w-[270px] "
                                    inputReadOnly={true}
                                    superNextIcon={null}
                                    superPrevIcon={null}
                                    placeholder={['Check in', 'Check out']}
                                    popupClassName="show-card-md rounded-md"
                                />
                                <Dropdown
                                    dropdownRender={() => <DropDownItem />}
                                    placement="bottomLeft"
                                    trigger={['click']}
                                >
                                    <Button className="font-main px-5 h-[48px] rounded-xl">Number of guest</Button>
                                </Dropdown>
                                <Button className="rounded-xl bg-blue-500 h-[48px] font-main text-md mt-3">
                                    Booking
                                </Button>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex items-center justify-between">
                                    <span>400,000 VND/đêm</span>
                                    <span>400,000 VND</span>
                                </div>
                                <div>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[480px] my-7 google-map">
                    {isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={{
                                width: '100%',
                                height: '480px',
                                borderRadius: '10px',
                            }}
                            center={{
                                lat: 13.755734463406828,
                                lng: 109.21495999261536,
                            }}
                            zoom={14}
                        >
                            <MarkerF
                                position={{
                                    lat: 13.755734463406828,
                                    lng: 109.21495999261536,
                                }}
                            ></MarkerF>
                        </GoogleMap>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="flex flex-col gap-4 mb-5">
                    <h3 className="text-2xl font-semibold mb-2">Guest Reviews</h3>
                    <div className="flex items-center">
                        <span className="p-2 text-md font-semibold bg-blue-500 text-white rounded-md mr-2">9.5</span>
                        <span className="text-sm">5 reviews</span>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        {reviews.map((review, index) => (
                            <div key={index} className="flex flex-col w-full md:w-[calc(50%-30px)] px-2 mb-4">
                                <div className="flex items-center mb-2">
                                    <Avatar />
                                    <div className="flex flex-col ml-2">
                                        <span className="font-semibold">{review.author}</span>
                                        <span className="text-xs">{review.date}</span>
                                    </div>
                                </div>
                                <div className="text-sm">{review.comment}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApartmentDetail;
