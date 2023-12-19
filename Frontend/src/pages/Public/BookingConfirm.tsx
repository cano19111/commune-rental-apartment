import React, { useState } from 'react';
import { Image, Steps, Tabs } from 'antd';
import { CustomerInfo, Payment } from '@/components';

const BookingConfirm: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('customerInformation');
    const [step, setStep] = useState<number>(1);
    return (
        <div className="w-full flex items-center justify-center mt-3 mb-10">
            <div className="max-w-main w-full mt-5">
                <Steps
                    size="small"
                    current={step}
                    items={[
                        { title: 'Your selection' },
                        { title: 'Your details' },
                        { title: 'Confirm your reservation' },
                    ]}
                />
                <div className="grid grid-cols-3 gap-7 mt-7">
                    <div className="col-span-1 flex flex-col items-center justify-center gap-5">
                        <div className="w-full flex flex-col items-start gap-3 border border-gray-300 rounded-lg p-4">
                            <div className="font-semibold text-lg">Khách Sạn LUCIEN HOTEL Quy Nhơn</div>
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
                            <h3 className="font-semibold text-lg">Your booking deatils</h3>
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
                                <div className="font-semibold">1 night</div>
                            </div>
                            <div className="border-t border-gray-400"></div>
                            <div>
                                <div>You selected</div>
                                <div className="font-semibold">1 room 2 adults</div>
                            </div>
                        </div>
                        <div className="w-full rounded-lg border border-gray-300 overflow-hidden">
                            <div className="w-full p-5">
                                <div className="font-semibold text-lg mb-3">Your price summary</div>
                                <div className="flex items-center justify-between">
                                    <span>Original price</span>
                                    <span>300,000 VND</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Including taxes and fees 11%</span>
                                    <span>+ 30,000 VND</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-5 bg-blue-50">
                                <div>
                                    <span className="text-3xl font-bold">Total</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="font-semibold text-2xl">600,000 VND</div>
                                    <div>Includes taxes and charges</div>
                                </div>
                            </div>
                            <div className=""></div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <Tabs
                            activeKey={activeTab}
                            items={[
                                {
                                    key: 'customerInformation',
                                    label: null,
                                    children: <CustomerInfo setActiveTab={setActiveTab} setStep={setStep} />,
                                },
                                {
                                    key: 'checkout',
                                    label: null,
                                    children: <Payment />,
                                },
                            ]}
                            renderTabBar={() => null}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirm;
