import { DropDownItem, GoogleMap, Reviews, TableSelectRoom } from '@/components';
import icons from '@/utils/icons';
import { Button, DatePicker, Drawer, Dropdown, Image, Tooltip } from 'antd';
import React, { useState } from 'react';
import './ApartmentDetail.css';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { apiApartmentDetail } from '@/apis';
import dayjs from 'dayjs';
const { FaLocationDot, CgMenuGridO, PiUserThin } = icons;

const ApartmentDetail: React.FC = () => {
    const { apartmentId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();
    const { data: { data: { apartment } = {} } = {}, isFetching } = useQuery({
        queryKey: ['apartment', apartmentId, searchParams.toString()],
        queryFn: () => apiApartmentDetail(apartmentId, searchParams.toString()),
        staleTime: 0,
    });
    const roomNumber: number = +searchParams.get('room') !== 0 ? +searchParams.get('room') ?? 1 : 1;
    const numberOfGuest: number =
        +searchParams.get('numberOfGuest') !== 0 ? +searchParams.get('numberOfGuest') ?? 1 : 1;
    const startDate: string | null = searchParams.get('startDate');
    const endDate: string | null = searchParams.get('endDate');
    const checkIn: Date | null = startDate ? new Date(startDate) : null;
    const checkOut: Date | null = endDate ? new Date(endDate) : null;
    const numberOfDays: number =
        checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 1;
    const [isShowAll, setIsShowAll] = useState(false);
    const rooms = apartment?.rooms || [];
    const images = rooms.flatMap((room) => room.images || []);
    const imagesPerColumn = Math.ceil(images.length / 3);
    return (
        !isFetching && (
            <div className="w-full flex justify-center font-main apartment-detail">
                <form onSubmit={handleSubmit(() => {})} className="max-w-main w-full">
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
                                <div className="flex flex-col w-[100px] h-[70px]">
                                    <Image
                                        width="100%"
                                        height="100%"
                                        className="rounded-lg border hover:border-blue-500"
                                        preview={false}
                                        src="https://a0.muscache.com/im/pictures/miso/Hosting-51733196/original/346278d9-0b86-48b5-a307-ff036ee4dcf7.jpeg?im_w=960"
                                    />
                                    <span className="font-medium">Over view</span>
                                </div>
                                <div className="flex flex-col w-[100px] h-[70px] ">
                                    <Image
                                        width="100%"
                                        height="100%"
                                        className="rounded-lg border hover:border-blue-500"
                                        preview={false}
                                        src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/503632734.jpg?k=a0920ae460ca1fcf958c3f1453ecafd4af17291998a299961b9c636c83469e42&o=&hp=1"
                                    />
                                    <span className="font-medium">Double room</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {Array.from({ length: 3 }, (_, columnIndex) => (
                                    <div className="col-span-1" key={columnIndex}>
                                        {images
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
                                <div className="text-2xl">{apartment?.title}</div>
                                <div className="flex items-center gap-1 font-light text-sm font-main">
                                    <FaLocationDot color="#1640D6" size={15} />
                                    <p className="hover:underline">
                                        {`${apartment.location.street}, ${apartment.location.ward}, ${apartment.location.district}, ${apartment.location.province}`}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5 pt-7 flex-wrap font-light">
                                {(rooms[0]?.services || []).map((service: string, index: number) => (
                                    <div className="px-3 py-2" key={index}>
                                        {service}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3">
                                <div className="text-sm font-light whitespace-pre-line">{rooms[0].description}</div>
                            </div>
                            <div className="my-7">
                                <TableSelectRoom
                                    numberRoom={roomNumber}
                                    roomsData={rooms?.map((room) => ({
                                        key: room._id,
                                        roomType: { roomType: room.roomType, services: room.services },
                                        numberOfGuest: room.numberOfGuest,
                                        price: room.price,
                                        roomNumber: room.quantity,
                                    }))}
                                />
                            </div>
                        </div>
                        <div className="min-w-[350px] p-7 shadow shadow-gray-400 rounded-xl sticky top-[140px] mt-5">
                            <div className="w-full flex flex-col gap-3 items-center justify-center">
                                <div className="font-medium text-xl">
                                    <span>{rooms[0].price.toLocaleString()} VND</span>
                                    <span className="font-light text-base">/ đêm</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <Controller
                                        name="searchDate"
                                        control={control}
                                        rules={{
                                            required: 'Please select the time',
                                        }}
                                        defaultValue={
                                            startDate && endDate ? [dayjs(startDate), dayjs(endDate)] : undefined
                                        }
                                        render={({ field }) => (
                                            <Tooltip
                                                title={errors?.searchDate?.message as string}
                                                color="red"
                                                open={!!errors.searchDate}
                                                placement="right"
                                            >
                                                <DatePicker.RangePicker
                                                    format="DD-MM-YYYY"
                                                    className="font-main rounded-t-lg rounded-b-none border-b-0 border-700 py-3 min-w-[200px] max-w-[270px] "
                                                    inputReadOnly={true}
                                                    superNextIcon={null}
                                                    superPrevIcon={null}
                                                    placeholder={['Check in', 'Check out']}
                                                    popupClassName="show-card-md rounded-full"
                                                    {...field}
                                                    onChange={(dates) => {
                                                        const currentParams = Object.fromEntries(
                                                            searchParams.entries(),
                                                        );
                                                        const newParams = {
                                                            ...currentParams,
                                                            startDate: dates[0]?.format('YYYY-MM-DD'),
                                                            endDate: dates[1]?.format('YYYY-MM-DD'),
                                                        };
                                                        setSearchParams(newParams);
                                                        field.onChange(dates);
                                                    }}
                                                />
                                            </Tooltip>
                                        )}
                                    />

                                    <Controller
                                        name="searchGuest"
                                        control={control}
                                        rules={{
                                            required: 'Number of guest is required',
                                        }}
                                        defaultValue={{ guest: +numberOfGuest, room: +roomNumber }}
                                        render={({ field }) => (
                                            <Tooltip
                                                title={errors?.searchGuest?.message as string}
                                                color="red"
                                                open={!!errors.searchGuest}
                                                placement="left"
                                            >
                                                <Dropdown
                                                    dropdownRender={() => (
                                                        <DropDownItem
                                                            value={field.value}
                                                            onChange={(value) => field.onChange(value)}
                                                        />
                                                    )}
                                                    placement="bottomLeft"
                                                    trigger={['click']}
                                                >
                                                    <Button className="font-main w-full h-[48px] bg-white rounded-b-lg border-700 rounded-t-none flex items-center gap-1 justify-center">
                                                        <PiUserThin size={25} />
                                                        <span className="">{`${
                                                            getValues('searchGuest')?.guest || 1
                                                        } adult · ${getValues('searchGuest')?.room || 1} rooms`}</span>
                                                    </Button>
                                                </Dropdown>
                                            </Tooltip>
                                        )}
                                    />

                                    <Button
                                        className="rounded-xl bg-blue-500 h-[48px] font-main text-md mt-3"
                                        htmlType="submit"
                                        type="primary"
                                    >
                                        Booking
                                    </Button>
                                </div>
                                <div className="w-full px-3 flex flex-col gap-5">
                                    <div className="w-full flex items-center justify-between font-light mt-3">
                                        <span>
                                            <span>{rooms[0].price.toLocaleString()} VND</span>
                                            <span>{` x ${numberOfDays === 0 ? 1 : +numberOfDays} đêm`}</span>
                                        </span>
                                        <span>{`${(
                                            (numberOfDays === 0 ? 1 : +numberOfDays) * rooms[0].price
                                        ).toLocaleString()} VND`}</span>
                                    </div>
                                    <div className="w-full flex items-center justify-between font-light border-t pt-5 border-gray-500">
                                        <span>
                                            <span>Total before tax</span>
                                        </span>
                                        <span>{`${(
                                            (numberOfDays === 0 ? 1 : +numberOfDays) * rooms[0].price
                                        ).toLocaleString()} VND`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[480px] my-7 google-map">
                        <GoogleMap lat={apartment?.location.longitude} lng={apartment?.location.latitude} />
                    </div>
                    <div>
                        <Reviews />
                    </div>
                </form>
            </div>
        )
    );
};

export default ApartmentDetail;
