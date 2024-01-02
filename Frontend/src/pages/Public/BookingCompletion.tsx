import { apiGetBooking } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { Button, Result } from 'antd';
import moment from 'moment';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BookingCompletion: React.FC = () => {
    const navigate = useNavigate();
    const { bookingId } = useParams();
    const { data: { data = {} } = {}, isFetching } = useQuery({
        queryKey: ['booking-completion'],
        queryFn: () => apiGetBooking(bookingId),
    });
    return (
        !isFetching && (
            <div className="min-h-screen flex flex-col md:flex-row font-main">
                <div className="flex-grow-0 md:flex-grow md:w-1/2">
                    <div className="max-w-md rounded overflow-hidden bg-white mx-auto">
                        <div className="shadow-card-sm p-5 bg-white border rounded-2xl space-y-3">
                            <img
                                className="w-full h-64 object-cover rounded-2xl"
                                src={data.booking.image}
                                alt={data.booking.name}
                            />
                            <div className="font-semibold text-xl mb-2 flex items-baseline">{data.booking.name}</div>
                            <p className="text-gray-700">Address: 3-star hotel located in the heart of Copenhagen</p>
                            <div className="flex">
                                <div className="w-[100px] font-semibold">Check-in</div>
                                <div>{moment(data.booking.checkIn).format('dddd, DD MMMM YYYY')}</div>
                            </div>
                            <div className="flex">
                                <div className="w-[100px] font-semibold">Check-out</div>
                                <div> {moment(data.booking.checkOut).format('dddd, DD MMMM YYYY')}</div>
                            </div>
                            <div className="mb-4 pt-3 border-t">{data.booking.roomType}</div>
                        </div>
                        <div className="mt-10 space-y-5 p-5">
                            <div className="text-lg">Contact</div>
                            <div className="flex text-base">
                                <div className="w-[100px] font-semibold">Email</div>
                                <div className="underline">{data.booking.contact.email}</div>
                            </div>
                            <div className="flex text-base">
                                <div className="w-[100px] font-semibold">Phone</div>
                                <div>{data.booking.contact.phone}</div>
                            </div>
                        </div>
                        <div className="space-y-5 border-t border-gray-300 pt-7 px-5">
                            <div className="flex text-base">
                                <div className="w-[100px] font-semibold">Total</div>
                                <div className="">{data.booking.totalPrice.toLocaleString()} VND</div>
                            </div>
                        </div>
                        <div className="mt-5 pt-5 border-t border-gray-300 flex items-center gap-6">
                            <Button type="primary" size="large" shape="round" className="bg-blue-500 w-[150px]">
                                Contact
                            </Button>
                            <Button type="primary" ghost size="large" shape="round" className="bg-blue-500 w-[150px]">
                                Cancel booking
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex-grow flex items-start mt-[5%] md:w-1/2">
                    <Result
                        status="success"
                        title="Booking successfully!"
                        subTitle="Your booking details are shown on the left."
                        extra={[
                            <Button type="primary" size="large" onClick={() => navigate('/')} className="bg-blue-500">
                                Go home
                            </Button>,
                            <Button size="large" type="primary" ghost onClick={() => navigate('/my-booking')}>
                                View bookings and trips
                            </Button>,
                        ]}
                    />
                </div>
            </div>
        )
    );
};

export default BookingCompletion;
