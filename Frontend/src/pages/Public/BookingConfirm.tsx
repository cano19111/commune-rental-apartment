import React from 'react';
import { Image, Input, Steps } from 'antd';
import icons from '@/utils/icons';
import { Link } from 'react-router-dom';
const { PiUserThin, BsInfoCircle } = icons;
const BookingConfirm: React.FC = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="max-w-main w-full mt-5">
                <Steps
                    size="small"
                    current={1}
                    items={[
                        {
                            title: 'Your selection',
                        },
                        {
                            title: 'Your details',
                        },
                        {
                            title: 'Final step',
                        },
                    ]}
                />
                <div className="grid grid-cols-3 gap-7 mt-5">
                    <div className="col-span-1 flex flex-col items-center justify-center gap-5">
                        <div className="w-full flex flex-col items-start gap-3 border border-gray-300 rounded-lg p-4">
                            <div className="font-extrabold text-lg">Khách Sạn LUCIEN HOTEL Quy Nhơn</div>
                            <div>223 Trần Hưng Đạo, Quy Nhon, Vietnam</div>

                            <div className="flex items-center gap-2">
                                <span className="p-2 rounded-md bg-blue-500 text-white">9.3</span>
                                <span>173 reviews</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Image height={20} src="https://cdn-icons-png.flaticon.com/128/1/1848.png" />
                                    <span>Wifi</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image height={20} src="https://cdn-icons-png.flaticon.com/128/1/1848.png" />
                                    <span>Wifi</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image height={20} src="https://cdn-icons-png.flaticon.com/128/1/1848.png" />
                                    <span>Wifi</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 w-full border border-gray-300 rounded-lg space-y-5">
                            <h3 className="font-extrabold text-lg">Your booking deatils</h3>
                            <div className="flex items-center gap-3">
                                <div>
                                    <div>Check-in</div>
                                    <div className="font-semibold text-xl">Sat 16 Dec 2023</div>
                                    <div>14:00 - 20:00</div>
                                </div>
                                <div className="border-r border-gray-400 h-14"></div>
                                <div>
                                    <div>Check-out</div>
                                    <div className="font-semibold text-xl">Sat 16 Dec 2023</div>
                                    <div>14:00 - 20:00</div>
                                </div>
                            </div>
                            <div>
                                <div>Total length of stay:</div>
                                <div className="font-extrabold">1 night</div>
                            </div>
                            <div className="border-t border-gray-400"></div>
                            <div>
                                <div>You selected</div>
                                <div className="font-extrabold">1 room 2 adults</div>
                            </div>
                        </div>
                        <div className="w-full rounded-lg border border-gray-400">
                            <div className="flex items-center justify-between p-5 bg-blue-50">
                                <div>
                                    <span className="text-3xl font-bold">Total</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="font-extrabold text-2xl">600,000 VND</div>
                                    <div>Includes taxes and charges</div>
                                </div>
                            </div>
                            <div className=""></div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="w-full space-y-5">
                            <div className="w-full flex items-center gap-3 p-5 border border-gray-300 rounded-lg">
                                <PiUserThin size={20} />
                                <div>
                                    <Link className="text-blue-500 hover:underline" to="">
                                        Sign in
                                    </Link>{' '}
                                    to book with your saved details or
                                    <Link className="text-blue-500 hover:underline" to="">
                                        {' '}
                                        register
                                    </Link>{' '}
                                    to manage your bookings on the go!
                                </div>
                            </div>
                            <div className="p-5 space-y-5 border border-gray-300 rounded-lg">
                                <h2>Enter your details</h2>
                                <div className="p-5 border border-gray-500 bg-gray-100 rounded-lg flex items-center gap-3">
                                    <BsInfoCircle size={20} />
                                    <div>
                                        Almost done! Just fill in the <span className="text-red-500">*</span> required
                                        info
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-1">
                                        <div>
                                            <div className="flex gap-1">
                                                <span>First name</span>
                                                <span className="text-red-500">*</span>
                                            </div>
                                            <Input size="large" />
                                        </div>
                                        <div className="col-span-1">
                                            <div className="flex gap-1">
                                                <span>Email address</span>
                                                <span className="text-red-500">*</span>
                                            </div>
                                            <Input size="large" />
                                        </div>
                                        <div className="col-span-1">
                                            <div className="flex">
                                                <span>First name</span>
                                                <span className="text-red-500">*</span>
                                            </div>
                                            <Input size="large" />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="col-span-1">
                                            <div className="flex">
                                                <span>First name</span>
                                                <span className="text-red-500">*</span>
                                            </div>
                                            <Input size="large" />
                                        </div>

                                        <div className="col-span-1">
                                            <div className="flex gap-1">
                                                <span>Phone number</span>
                                                <span className="text-red-500">*</span>
                                            </div>
                                            <Input size="large" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirm;
