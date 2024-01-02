import { apiGetMyBookings } from '@/apis';
import icons from '@/utils/icons';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import moment from 'moment';
import React from 'react';
const { FaArrowRight, IoCalendarOutline, CiCreditCard1, RiMoonLine } = icons;

const MyBooking: React.FC = () => {
    const { data: { data = {} } = {}, isFetching } = useQuery({
        queryKey: ['my-booking'],
        queryFn: apiGetMyBookings,
    });
    const calculateNights = (checkIn: string, checkOut: string) => {
        const checkInDate = moment(checkIn);
        const checkOutDate = moment(checkOut);
        return checkOutDate.diff(checkInDate, 'days');
    };
    return (
        <div className="max-w-main w-full mx-auto p-4 min-h-screen">
            <h1 className="text-2xl font-medium text-center mb-6">My Bookings</h1>
            <div className="space-y-4">
                {(data.bookings || []).map((booking) => {
                    const nights = calculateNights(booking.checkIn, booking.checkOut);
                    return (
                        <div
                            key={booking._id}
                            className="h-40 flex gap-10 p-2 rounded-lg shadow-sm hover:shadow-xs transition-shadow duration-300 bg-gray-100 cursor-pointer"
                        >
                            <img
                                src={booking.image}
                                alt="Booking"
                                className="w-[270px] h-full object-cover rounded-lg"
                            />
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">{booking.name}</h3>
                                <div className="flex items-center gap-1">
                                    <IoCalendarOutline />
                                    <span className="mr-1">{moment(booking.checkIn).format('YYYY-MM-DD')}</span>
                                    <FaArrowRight />
                                    <span className="mr-1">{moment(booking.checkOut).format('YYYY-MM-DD')}</span>
                                    <IoCalendarOutline />
                                </div>
                                <div className="flex items-center gap-1">
                                    <RiMoonLine size={20} />
                                    <p>Nights: {nights}</p>
                                </div>
                                <p>
                                    <span>Status: </span>
                                    <span className={`font-bold text-green-500`}>Confirmed</span>
                                </p>
                                <div className="flex items-center gap-1">
                                    <CiCreditCard1 size={25} />
                                    <p className=" text-base">Total price: {booking.totalPrice.toLocaleString()} VND</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {isFetching && (
                    <>
                        {[1, 2, 3].map((index) => (
                            <Skeleton key={index} loading={isFetching} active avatar={{ size: 180, shape: 'square' }} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default MyBooking;
