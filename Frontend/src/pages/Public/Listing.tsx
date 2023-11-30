import icons from '@/utils/icons';
import { Button, Checkbox, Flex, Image, Slider } from 'antd';
import React from 'react';
import mapImage from '@/assets/map.png';
import { useQuery } from '@tanstack/react-query';
import { apiSearchRoom } from '@/apis';
import { useSearchParams } from 'react-router-dom';
const { GoLocation, FaLocationDot } = icons;

const Listing: React.FC = () => {
    const params = useSearchParams();
    const { data } = useQuery({
        queryKey: ['listing'],
        queryFn: () => apiSearchRoom(params[0]),
        staleTime: 0,
    });
    return (
        <div className="w-full flex items-center justify-center font-main">
            <div className="max-w-main w-full min-h-screen flex mt-10 gap-5">
                <div className="max-w-[265px] w-full bg-slate-100 px-3 py-5">
                    <div
                        className="bg-cover bg-no-repeat w-full h-[150px] rounded-md flex flex-col items-center justify-center gap-2"
                        style={{ backgroundImage: `url(${mapImage})` }}
                    >
                        <FaLocationDot size={34} color="#0047ab" />
                        <Button type="primary" className="bg-blue-600">
                            Show on map
                        </Button>
                    </div>
                    <div className="w-full border">
                        <h2 className="text-lg m-2">Filter by</h2>
                        <div className="p-3 flex flex-col justify-center gap-3">
                            <h2>Your budget (per night)</h2>
                            <div className="">
                                <div className="font-light">VND 300,000 - VND 2,000,000+</div>
                                <Slider
                                    range={{ draggableTrack: true }}
                                    min={100}
                                    max={2000}
                                    defaultValue={[400, 700]}
                                />
                            </div>
                        </div>
                        <div className="p-3 flex flex-col justify-center gap-3">
                            <h2>Star rating</h2>
                            <Checkbox.Group>
                                <Flex vertical justify="center" gap={3}>
                                    <Checkbox value="5">5 star</Checkbox>
                                    <Checkbox value="4">4 star</Checkbox>
                                    <Checkbox value="3">3 star</Checkbox>
                                    <Checkbox value="2">2 star</Checkbox>
                                    <Checkbox value="1">1 star</Checkbox>
                                </Flex>
                            </Checkbox.Group>
                        </div>
                        <div className="p-3 flex flex-col justify-center gap-3">
                            <h2>Popular filters</h2>
                            <Checkbox.Group>
                                <Flex vertical justify="center" gap={3}>
                                    <Checkbox value="Breakfast included">Breakfast included</Checkbox>
                                    <Checkbox value="Hotels">Hotels</Checkbox>
                                    <Checkbox value="Double bed">Double bed</Checkbox>
                                    <Checkbox value="Hostels">Hostels</Checkbox>
                                    <Checkbox value="Homestays">Homestays</Checkbox>
                                </Flex>
                            </Checkbox.Group>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                    <div className="h-[60px] bg-slate-100 flex items-center p-5 rounded-xl">
                        <div className="">9 Search results</div>
                    </div>
                    <div className="w-full h-full bg-slate-100 flex flex-col gap-5 p-2 rounded-lg">
                        {(data?.data?.rooms || []).map((room) => (
                            <div key={room._id} className="flex items-start gap-10 bg-white p-1 rounded-lg">
                                <div className="w-2/5">
                                    <Image src={room.image} className="rounded-lg" preview={false} />
                                </div>
                                <div className="w-3/5 flex h-full py-3">
                                    <div className="w-7/12 flex flex-col mt-3 gap-3">
                                        <div className="font-medium text-lg overflow-hidden line-clamp-2">
                                            {room.name}
                                        </div>
                                        <div className="text-xs font-light flex items-start justify-center gap-1">
                                            <GoLocation size={15} />
                                            <span className="hover:underline line-clamp-2 text-blue-700">
                                                {`${room.address.street} ${room.address.ward} ${room.address.district} ${room.address.province}`}
                                            </span>
                                        </div>
                                        <div className="font-light text-sm ml-3">
                                            {(room?.services || []).map((service, index) => (
                                                <span key={index}>{index === 0 ? service : ` • ${service}`}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-5/12 flex flex-col justify-between items-end">
                                        <div className="flex gap-2 min-w-[150px]">
                                            <div className="flex flex-col items-end">
                                                <span className=" font-medium">Review score</span>
                                                <span className=" font-light">1 reviews</span>
                                            </div>
                                            <div className="rounded-score bg-blue-600 w-[40px] h-[40px] relative">
                                                <span className="absolute top-2 right-3 text-white">8.7</span>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col justify-end items-end mt-2 pr-5">
                                            <div className="font-light text-xs">1 night, 2 people</div>
                                            <div className="text-lg">VND 463,386</div>
                                            <div className="font-light text-xs">+VND 114,409 taxes and fees</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Listing;
