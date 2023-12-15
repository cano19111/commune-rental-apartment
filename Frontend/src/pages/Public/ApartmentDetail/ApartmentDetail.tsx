import { GoogleMap, Reviews, TableSelectRoom } from '@/components';
import icons from '@/utils/icons';
import { Button, DatePicker, Drawer, Image, Spin, Tooltip } from 'antd';
import React, { useMemo, useState } from 'react';
import './ApartmentDetail.css';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { apiApartmentDetail } from '@/apis';
import dayjs from 'dayjs';
import moment from 'moment';
import { path } from '@/utils/constant';
const { FaLocationDot, CgMenuGridO, PiUserThin } = icons;
const calculateTotalAmount = (numberOfDays, roomPrice, roomNumber) => {
    const baseAmount = (numberOfDays === 0 ? 1 : +numberOfDays) * roomPrice * roomNumber;
    const taxAmount = baseAmount * 0.11;
    const totalAmount = baseAmount + taxAmount;

    return {
        baseAmount: baseAmount.toLocaleString(),
        taxAmount: taxAmount.toLocaleString(),
        totalAmount: totalAmount.toLocaleString(),
        roomNumber: roomNumber,
    };
};

const ApartmentDetail: React.FC = () => {
    const { apartmentId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        watch,
    } = useForm();
    const { data: { data: { apartment } = {} } = {}, isFetching } = useQuery({
        queryKey: ['apartment', apartmentId, searchParams.toString()],
        queryFn: () => apiApartmentDetail(apartmentId, searchParams.toString()),
        staleTime: 0,
    });
    const [isShowAll, setIsShowAll] = useState(false);
    const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);

    const startDate: string | null = searchParams.get('startDate');
    const endDate: string | null = searchParams.get('endDate');
    const checkIn: Date | null = startDate ? new Date(startDate) : null;
    const checkOut: Date | null = endDate ? new Date(endDate) : null;
    const numberOfDays: number =
        checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 1;

    const rooms = apartment?.rooms || [];

    const roomsData =
        watch('roomsData') ??
        rooms.map((room) => ({
            key: room._id,
            roomType: {
                roomType: room.roomType,
                services: room.services.map((service) => service.title),
            },
            numberOfGuest: room.numberOfGuest,
            price: room.price,
            quantity: room.quantity,
            roomNumber: searchParams.get('roomId') === room._id ? +searchParams.get('room') || 1 : 0,
        }));
    const selectRoom = roomsData?.find((room) => room.roomNumber > 0);
    const handleBooking = () => {
        navigate(`/${path.BOOKING_CONFIRM}`);
    };
    const roomImages =
        selectedRoomIndex === null ? rooms.flatMap((room) => room.images || []) : rooms[selectedRoomIndex].images;
    const imagesPerColumn = Math.ceil(roomImages.length / 3);

    const { baseAmount, taxAmount, totalAmount, roomNumber } = useMemo(() => {
        const roomPrice = selectRoom?.price || 0;
        const roomNumber = selectRoom?.roomNumber || 0;

        return calculateTotalAmount(numberOfDays, roomPrice, roomNumber);
    }, [numberOfDays, selectRoom]);
    return isFetching ? (
        <div className="min-h-screen">
            <Spin spinning={isFetching} fullscreen={isFetching} />
        </div>
    ) : (
        <div className="w-full flex justify-center font-main apartment-detail">
            <form
                onSubmit={handleSubmit(handleBooking)}
                className="max-w-main w-full flex flex-col justify-center gap-5"
            >
                <div className="grid grid-cols-4 grid-rows-4 gap-2 mt-10 w-full max-h-[500px] lg:min-h-[450px] overflow-hidden relative">
                    <div className="col-span-2 row-span-4">
                        <Image className="rounded-s-lg" height="100%" src={rooms[0]?.images[0]} />
                    </div>
                    <div className="flex col-span-2 row-span-2 gap-2">
                        <Image className="" height="100%" width="50%" src={rooms[0]?.images[1]} />
                        <Image className="" height="100%" width="50%" src={rooms[0]?.images[2]} />
                    </div>
                    <div className="flex col-span-2 row-span-2 gap-2">
                        <Image className="rounded-tr-md" height="100%" width="50%" src={rooms[0]?.images[3]} />
                        <Image className="rounded-br-md" height="100%" width="50%" src={rooms[0]?.images[4]} />
                    </div>
                    <Drawer placement="bottom" onClose={() => setIsShowAll(false)} open={isShowAll} height="100%">
                        <div className="flex items-center mb-5 gap-3">
                            <div
                                className="flex flex-col w-[100px] h-[70px]"
                                onClick={() => {
                                    setIsShowAll(true);
                                    setSelectedRoomIndex(null);
                                }}
                            >
                                <Image
                                    width="100%"
                                    height="100%"
                                    className="rounded-lg border hover:border-blue-500 cursor-pointer"
                                    preview={false}
                                    src={rooms[0].images[1]}
                                />
                                <span className="font-medium">Overview</span>
                            </div>

                            {rooms.map((room, index) => (
                                <div
                                    className="flex flex-col w-[100px] h-[70px]"
                                    key={index}
                                    onClick={() => {
                                        setIsShowAll(true);
                                        setSelectedRoomIndex(index);
                                    }}
                                >
                                    <Image
                                        width="100%"
                                        height="100%"
                                        className={`rounded-lg border hover:border-blue-500 cursor-pointer ${
                                            selectedRoomIndex === index && 'selected-room'
                                        }`}
                                        preview={false}
                                        src={room.images[0]}
                                    />
                                    <span className="font-medium">{room.roomType}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-3 list-image-room">
                            {Array.from({ length: 3 }, (_, columnIndex) => (
                                <div className="col-span-1" key={columnIndex}>
                                    {roomImages
                                        .slice(columnIndex * imagesPerColumn, (columnIndex + 1) * imagesPerColumn)
                                        .map((image, imageIndex) => (
                                            <Image width="100%" src={image} key={imageIndex} />
                                        ))}
                                </div>
                            ))}
                        </div>
                    </Drawer>

                    <Button
                        className="absolute bottom-3 right-3 bg-white border border-black flex items-center"
                        onClick={() => setIsShowAll(true)}
                    >
                        <CgMenuGridO />
                        <span>Show all images</span>
                    </Button>
                </div>
                <div className="flex items-start gap-5 mt-5">
                    <div className="flex flex-col">
                        <div className="font-main mt-5 flex flex-col justify-center gap-2">
                            <div className="text-3xl">{apartment?.title}</div>
                            <div className="flex items-center gap-1 font-light text-sm font-main">
                                <FaLocationDot color="#1640D6" size={15} />
                                <p className="hover:underline">
                                    {`${apartment.location.street}, ${apartment.location.ward}, ${apartment.location.district}, ${apartment.location.province}`}
                                </p>
                            </div>
                        </div>
                        <div className="mt-7">
                            <h3 className="text-xl font-normal">This place has something for you</h3>
                            <div className="grid grid-cols-4 gap-3 font-light mt-5">
                                {(rooms[0]?.services || []).map(
                                    (service: { title: string; image: string }, index: number) => (
                                        <div className="py-1 flex items-center gap-2 col-span-1" key={index}>
                                            <Image height={24} preview={false} src={service.image} />
                                            <span>{service.title}</span>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>

                        <div className="mt-7">
                            <div className="text-sm font-light whitespace-pre-line">{rooms[0].description}</div>
                        </div>
                        <div className="my-7 table-apartment-detail">
                            <Controller
                                name="roomsData"
                                control={control}
                                defaultValue={rooms.map((room) => ({
                                    key: room._id,
                                    roomType: {
                                        roomType: room.roomType,
                                        services: room.services.map((service) => service.title),
                                    },
                                    numberOfGuest: room.numberOfGuest,
                                    price: room.price,
                                    quantity: room.quantity,
                                    roomNumber:
                                        searchParams.get('roomId') === room._id ? +searchParams.get('room') || 1 : 0,
                                }))}
                                rules={{
                                    validate: (value) => {
                                        const atLeastOneRoom = value.some((room) => room.roomNumber > 0);
                                        if (!atLeastOneRoom) {
                                            return 'At least one room is required';
                                        }
                                        return true;
                                    },
                                }}
                                render={({ field }) => (
                                    <Tooltip
                                        title={errors.roomsData?.message as string}
                                        color="red"
                                        open={!!errors.roomsData}
                                        placement="topRight"
                                    >
                                        <TableSelectRoom
                                            numberOfDay={numberOfDays}
                                            value={field.value}
                                            onChange={(value) => field.onChange(value)}
                                        />
                                    </Tooltip>
                                )}
                            />
                        </div>
                    </div>
                    <div className="min-w-[350px] p-6 shadow shadow-gray-400 rounded-lg sticky top-[140px] mt-5">
                        <div className="w-full flex flex-col gap-3 items-center justify-center">
                            <div className="font-medium text-xl">
                                <span>{(selectRoom?.price || 0).toLocaleString()} VND</span>
                                <span className="font-light text-base">/ night</span>
                            </div>
                            <div className="flex flex-col justify-center">
                                <Controller
                                    name="searchDate"
                                    control={control}
                                    rules={{
                                        required: 'Please select the time',
                                    }}
                                    defaultValue={startDate && endDate ? [dayjs(startDate), dayjs(endDate)] : undefined}
                                    render={({ field }) => (
                                        <Tooltip
                                            title={errors?.searchDate?.message as string}
                                            color="red"
                                            open={!!errors.searchDate}
                                            placement="right"
                                        >
                                            <DatePicker.RangePicker
                                                format="DD-MM-YYYY"
                                                className="font-main rounded-t-lg rounded-b-none border-b-0 border-700 py-3"
                                                inputReadOnly={true}
                                                superNextIcon={null}
                                                superPrevIcon={null}
                                                placeholder={['Check in', 'Check out']}
                                                popupClassName="show-card-md rounded-full"
                                                {...field}
                                                onChange={(dates) => {
                                                    const currentParams = Object.fromEntries(searchParams.entries());
                                                    const newParams = {
                                                        ...currentParams,
                                                        startDate: dates[0]?.format('YYYY-MM-DD'),
                                                        endDate: dates[1]?.format('YYYY-MM-DD'),
                                                    };
                                                    setSearchParams(newParams);
                                                    field.onChange(dates);
                                                }}
                                                disabledDate={(current) => current && current < moment().startOf('day')}
                                            />
                                        </Tooltip>
                                    )}
                                />

                                <Button className="font-main w-full h-[48px] bg-white rounded-b-lg border-700 rounded-t-none flex items-center gap-1 justify-center">
                                    <PiUserThin size={25} />
                                    <span className="">{`${getValues('searchGuest')?.guest || 1} adult · ${
                                        selectRoom?.roomNumber || 0
                                    } rooms`}</span>
                                </Button>
                                <Button
                                    className="rounded-xl bg-blue-500 h-[48px] font-main text-md mt-3"
                                    htmlType="submit"
                                    type="primary"
                                >
                                    Booking
                                </Button>
                            </div>
                            <div className="w-full flex flex-col gap-3">
                                <div className="w-full flex items-center justify-between font-light mt-3">
                                    <span>
                                        <span>{baseAmount} VND</span>
                                        <span>{` x ${numberOfDays === 0 ? 1 : +numberOfDays} night`}</span>
                                    </span>
                                    <span>{baseAmount} VND</span>
                                </div>
                                <div className="w-full flex items-center justify-between font-light mt-1">
                                    <span>
                                        <span>{baseAmount} VND</span>
                                        <span>{` x ${roomNumber} rooms`}</span>
                                    </span>
                                    <span>{baseAmount} VND</span>
                                </div>
                                <div className="w-full flex items-center justify-between font-light border-t pt-5 border-gray-500">
                                    <span>Tax fee 11%</span>
                                    <span>{`+ ${taxAmount} VND`}</span>
                                </div>
                                <div className="w-full flex items-center justify-between font-light border-t pt-1">
                                    <span>
                                        <span>Total amount, tax included</span>
                                    </span>
                                    <span>{totalAmount} VND</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border border-t mt-5"></div>
                <div className="h-[500px] my-5 google-map">
                    <h3 className="text-xl font-normal mb-5">Where you will go</h3>
                    <GoogleMap lat={apartment?.location.longitude} lng={apartment?.location.latitude} />
                </div>
                <div className="border border-t mt-10"></div>
                <div className="">
                    <Reviews />
                </div>
            </form>
        </div>
    );
};

export default ApartmentDetail;
