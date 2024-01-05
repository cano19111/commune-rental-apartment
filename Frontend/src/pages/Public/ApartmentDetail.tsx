import { GoogleMap, Reviews, TableSelectRoom } from '@/components';
import icons from '@/utils/icons';
import { Button, DatePicker, Drawer, Image, Result, Spin, Tooltip } from 'antd';
import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { apiApartmentDetail } from '@/apis';
import dayjs from 'dayjs';
import moment from 'moment';
import { path } from '@/utils/constant';
const { FaLocationDot, MdImage, PiUserThin } = icons;
const calculateTotalAmount = (numberOfDays: number, roomPrice: number, roomNumber: number) => {
    const baseAmount: number = (numberOfDays === 0 ? 1 : +numberOfDays) * roomPrice * roomNumber;
    const taxAmount: number = baseAmount * 0.11;
    const totalAmount: number = baseAmount + taxAmount;

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
        formState: { errors, isValid },
        watch,
    } = useForm();
    const { data: { data: { apartment } = {} } = {}, isFetching } = useQuery({
        queryKey: ['apartment', apartmentId, searchParams.toString()],
        queryFn: () => apiApartmentDetail(apartmentId, searchParams.toString()),
        staleTime: 0,
    });

    const [isShowAll, setIsShowAll] = useState(false);
    const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);

    const startDate: string | null = searchParams.get('start_date');
    const endDate: string | null = searchParams.get('end_date');
    const numberOfGuest: number =
        +searchParams.get('number_of_guest') !== 0 ? +searchParams.get('number_of_guest') ?? 1 : 1;
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
            roomNumber: searchParams.get('room_id') === room._id ? +searchParams.get('room_number') || 1 : 0,
        }));
    const selectRoom = roomsData?.find((room) => room.roomNumber > 0);
    const handleBooking = (data) => {
        const roomData = data.roomsData.find((room) => room.roomNumber > 0);
        const queryParams = new URLSearchParams({
            start_date: dayjs(data.searchDate[0]).format('YYYY-MM-DD'),
            end_date: dayjs(data.searchDate[1]).format('YYYY-MM-DD'),
            number_of_guest: numberOfGuest.toString(),
            room_number: roomData.roomNumber.toString(),
            room_id: roomData.key.toString(),
        });
        navigate(`/${path.BOOKING_CONFIRM}?${queryParams}`);
    };
    const roomImages: string[] = !selectedRoomIndex
        ? rooms.flatMap((room) => room.images || [])
        : rooms[selectedRoomIndex].images;
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
    ) : !apartment ? (
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
        <div className="w-full flex justify-center font-main apartment-detail">
            <form
                onSubmit={handleSubmit(handleBooking)}
                className="max-w-main w-full flex flex-col justify-center gap-5"
            >
                <div className="grid grid-cols-4 grid-rows-4 gap-2 mt-10 w-full max-h-[500px] lg:min-h-[450px] overflow-hidden relative">
                    <div className="col-span-2 row-span-4">
                        <Image className="rounded-s-lg" height="100%" width="100%" src={rooms[0]?.images[0]} />
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
                        <div className="flex flex-col justify-center">
                            <div className="flex items-start gap-3">
                                <div className="flex flex-col w-[100px]">
                                    <div
                                        className="w-[100px] h-[70px]"
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
                                    </div>
                                    <span className="font-medium text-md">Overview</span>
                                </div>
                                {rooms.map((room, index: number) => (
                                    <div
                                        onClick={() => {
                                            setIsShowAll(true);
                                            setSelectedRoomIndex(index);
                                        }}
                                        key={index}
                                        className="flex flex-col w-[100px]"
                                    >
                                        <div className="flex flex-col w-[100px] h-[70px]">
                                            <Image
                                                width="100%"
                                                height="100%"
                                                className={`rounded-lg border hover:border-blue-500 cursor-pointer ${
                                                    selectedRoomIndex === index && 'selected-room'
                                                }`}
                                                preview={false}
                                                src={room.images[0]}
                                            />
                                        </div>
                                        <span className="font-medium text-md">{room.roomType}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-3 gap-3 list-image-room max-h-[80vh] overflow-auto">
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
                        </div>
                    </Drawer>

                    <Button
                        className="absolute bottom-3 right-3 bg-white border border-black flex items-center gap-2"
                        onClick={() => setIsShowAll(true)}
                        size="middle"
                    >
                        <MdImage size={18} />
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
                                        sizeRoom: room.size,
                                    },
                                    numberOfGuest: room.numberOfGuest,
                                    price: room.price,
                                    quantity: room.quantity,
                                    roomNumber:
                                        searchParams.get('room_id') === room._id
                                            ? +searchParams.get('room_number') || 1
                                            : 0,
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
                                    <TableSelectRoom
                                        numberOfDay={numberOfDays}
                                        value={field.value}
                                        onChange={(value) => field.onChange(value)}
                                    />
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
                                                className="font-main rounded-t-lg rounded-b-none border-700 py-3 cursor-pointer"
                                                inputReadOnly={true}
                                                superNextIcon={null}
                                                superPrevIcon={null}
                                                placeholder={['Check in', 'Check out']}
                                                popupClassName="show-card-md rounded-full"
                                                {...field}
                                                onChange={(dates) => {
                                                    const currentParams = Object.fromEntries(searchParams.entries());
                                                    if (dates) {
                                                        const newParams = {
                                                            ...currentParams,
                                                            start_date: dates[0]?.format('YYYY-MM-DD'),
                                                            end_date: dates[1]?.format('YYYY-MM-DD'),
                                                        };
                                                        setSearchParams(newParams);
                                                    }

                                                    field.onChange(dates);
                                                }}
                                                disabledDate={(current) => current && current < moment().startOf('day')}
                                            />
                                        </Tooltip>
                                    )}
                                />

                                <div className="font-main w-full h-[48px] border border-gray-300 bg-white rounded-b-lg border-t-0 border-700 rounded-t-none flex items-center gap-1 justify-center cursor-default font-normal select-none">
                                    <PiUserThin size={25} />
                                    <span className="">{`${numberOfGuest} adult · ${
                                        selectRoom?.roomNumber || 0
                                    } rooms`}</span>
                                </div>
                                <Button
                                    className="rounded-xl bg-blue-500 h-[48px] font-main text-md mt-3"
                                    htmlType="submit"
                                    type="primary"
                                    disabled={!isValid}
                                >
                                    Booking now
                                </Button>
                            </div>
                            <div className="w-full flex flex-col gap-3">
                                <div className="w-full flex items-center justify-between font-light mt-3">
                                    <span>
                                        <span>{(selectRoom?.price || 0).toLocaleString()} VND</span>
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
                    <h3 className="text-xl font-normal mb">Where you will go</h3>
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
