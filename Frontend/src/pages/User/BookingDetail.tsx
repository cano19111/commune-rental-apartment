import { apiGetBooking } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { Button, Spin } from 'antd';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';

const BookingDetail: React.FC = () => {
    const { bookingId } = useParams();
    const { data: { data = {} } = {}, isFetching } = useQuery({
        queryKey: ['booking-completion'],
        queryFn: () => apiGetBooking(bookingId),
    });
    return isFetching ? (
        <Spin spinning={true} fullscreen size="large" />
    ) : (
        <div className="max-w-main w-full min-h-screen mx-auto">
            <div className="rounded max-w-[80%] w-full  overflow-hidden bg-white">
                <div className="shadow-card-sm p-5 bg-white border rounded-2xl space-y-3">
                    <img
                        className="w-full h-80 object-cover rounded-2xl"
                        src={data.booking.image}
                        alt={data.booking.name}
                    />
                    <div className="font-semibold text-xl mb-2 flex items-baseline">{data.booking.name}</div>
                    <p className="text-gray-700">{`${data.booking.address.street}, ${data.booking.address.ward}, ${data.booking.address.district}, ${data.booking.address.province}`}</p>
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
                <div className="mt-3 space-y-5 p-5">
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
    );
};

export default BookingDetail;
