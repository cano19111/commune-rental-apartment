import React, { useMemo, useState } from 'react';
import { Button, Image, Result, Steps, Tabs } from 'antd';
import { CustomerInfo, Payment } from '@/components';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiGetRoomCheckout } from '@/apis';
import moment from 'moment';
import { path } from '@/utils/constant';
const calculateTotalAmount = (numberOfDays: number, roomPrice: number, roomNumber: number) => {
    const baseAmount: number = (numberOfDays === 0 ? 1 : +numberOfDays) * roomPrice * roomNumber;
    const taxAmount: number = baseAmount * 0.11;
    const totalAmount: number = baseAmount + taxAmount;

    return {
        baseAmount: baseAmount,
        taxAmount: taxAmount,
        totalAmount: totalAmount,
        roomNumber: roomNumber,
    };
};

const BookingConfirm: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('customerInformation');
    const [step, setStep] = useState<number>(1);
    const { handleSubmit, control } = useForm<CustomerBooking>();
    const [searchParams] = useSearchParams();
    const [CustomerInfoData, setCustomerInfo] = useState(null);
    const navigate = useNavigate();

    const startDate: string | null = searchParams.get('start_date');
    const endDate: string | null = searchParams.get('end_date');
    const roomNumber: number = +searchParams.get('room_number') !== 0 ? +searchParams.get('room_number') ?? 1 : 1;
    const roomOfGuest: number =
        +searchParams.get('number_of_guest') !== 0 ? +searchParams.get('number_of_guest') ?? 1 : 1;
    const checkIn: Date | null = startDate ? new Date(startDate) : null;
    const checkOut: Date | null = endDate ? new Date(endDate) : null;
    const numberOfDays: number =
        checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 1;
    const { data: { data: roomData } = {}, isFetching } = useQuery({
        queryKey: ['apartment-confirm', searchParams.toString()],
        queryFn: () =>
            apiGetRoomCheckout({
                roomId: searchParams.get('room_id'),
                params: new URLSearchParams({
                    start_date: startDate,
                    end_date: endDate,
                    room_number: roomNumber.toString(),
                }).toString(),
            }),
        staleTime: 0,
    });

    const { baseAmount, taxAmount, totalAmount } = useMemo(() => {
        const roomPrice = roomData?.price || 0;
        return calculateTotalAmount(numberOfDays, roomPrice, roomNumber);
    }, [numberOfDays, roomData, roomNumber]);
    const handleCompletion = (data: CustomerBooking) => {
        setCustomerInfo({
            ...data,
            roomId: searchParams.get('room_id'),
            checkInTime: startDate,
            checkOutTime: endDate,
            totalPrice: totalAmount,
        });
        setActiveTab('checkout');
        setStep(2);
    };
    return (
        !isFetching &&
        (!roomData ? (
            <div className="min-h-screen flex items-center justify-center">
                <Result
                    status="500"
                    title="500"
                    subTitle="Sorry, something went wrong."
                    extra={
                        <Button
                            size="large"
                            className="bg-blue-500"
                            type="primary"
                            onClick={() => navigate(`/${path.HOME}`)}
                        >
                            Back Home
                        </Button>
                    }
                />
            </div>
        ) : (
            <div className="w-full flex items-center justify-center mt-3 mb-10">
                <div className="max-w-main w-full mt-5">
                    <Steps
                        size="small"
                        current={step}
                        className="font-main"
                        items={[
                            { title: 'Your selection' },
                            { title: 'Your details' },
                            { title: 'Confirm your reservation' },
                        ]}
                    />
                    <div className="grid grid-cols-10 gap-7 mt-7 font-light">
                        <div className="col-span-4 flex flex-col items-center justify-center gap-5">
                            <div className="w-full flex flex-col items-start gap-3 border border-gray-300 rounded-lg p-4">
                                <div className="font-semibold text-lg">{roomData.title}</div>
                                <div>
                                    {`${roomData.location.street} ${roomData.location.ward} ${roomData.location.district} ${roomData.location.province}`}
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="p-2 rounded-md bg-blue-500 text-white">9.3</span>
                                    <span>1 reviews</span>
                                </div>
                                <div className="flex items-center gap-4 flex-wrap">
                                    {(roomData.services || []).map((service, index) => (
                                        <div className="flex items-center gap-2" key={index}>
                                            <Image preview={false} height={20} src={service.image} />
                                            <span>{service.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 w-full border border-gray-300 rounded-lg space-y-5">
                                <h3 className="font-semibold text-lg">Your booking details</h3>
                                <div className="flex items-center gap-7">
                                    <div>
                                        <div>Check-in</div>
                                        <div className="font-semibold text-xl">
                                            {moment(startDate).format('ddd DD MMM YYYY')}
                                        </div>
                                        <div>14:00 - 20:00</div>
                                    </div>
                                    <div className="border-r border-gray-400 h-14"></div>
                                    <div>
                                        <div>Check-out</div>
                                        <div className="font-semibold text-xl">
                                            {moment(endDate).format('ddd DD MMM YYYY')}
                                        </div>
                                        <div>8:00 - 12:00</div>
                                    </div>
                                </div>
                                <div>
                                    <div>Total length of stay:</div>
                                    <div className="font-semibold">{`${numberOfDays} night`}</div>
                                </div>
                                <div className="border-t border-gray-400"></div>
                                <div>
                                    <div>You selected</div>
                                    <div className="font-semibold">{`${roomNumber} room ${roomOfGuest} adults`}</div>
                                </div>
                            </div>
                            <div className="w-full rounded-lg border border-gray-300 overflow-hidden">
                                <div className="w-full p-5">
                                    <div className="font-semibold text-lg mb-3">Your price summary</div>
                                    <div className="flex items-center justify-between">
                                        <span>Original price</span>
                                        <span>{`${baseAmount.toLocaleString()} VND`}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Including taxes and fees 11%</span>
                                        <span>{`+ ${taxAmount.toLocaleString()} VND`}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-5 bg-blue-50">
                                    <div>
                                        <span className="text-3xl font-bold">Total</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="font-semibold text-2xl">{`${totalAmount.toLocaleString()} VND`}</div>
                                        <div>Includes taxes and charges</div>
                                    </div>
                                </div>
                                <div className=""></div>
                            </div>
                        </div>

                        <div className="col-span-6">
                            <Tabs
                                activeKey={activeTab}
                                items={[
                                    {
                                        key: 'customerInformation',
                                        label: null,
                                        children: (
                                            <form onSubmit={handleSubmit(handleCompletion)}>
                                                <CustomerInfo control={control} />
                                            </form>
                                        ),
                                    },
                                    {
                                        key: 'checkout',
                                        label: null,
                                        children: (
                                            <Payment
                                                setActiveTab={setActiveTab}
                                                setStep={setStep}
                                                amount={totalAmount}
                                                nameRoom={roomData.title}
                                                CustomerInfoData={CustomerInfoData}
                                            />
                                        ),
                                    },
                                ]}
                                renderTabBar={() => null}
                            />
                        </div>
                    </div>
                </div>
            </div>
        ))
    );
};

export default BookingConfirm;
