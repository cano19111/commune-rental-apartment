import icons from '@/utils/icons';
import { Button, Checkbox, DatePicker, Dropdown, Flex, Image, Input, Skeleton, Slider, Tooltip } from 'antd';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiSearchRoom } from '@/apis';
import { useSearchParams } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { DropDownItem } from '@/components';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
const { GoLocation, PiUserThin } = icons;

const Listing: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();

    const { data, isFetching } = useQuery({
        queryKey: ['listing', searchParams.toString()],
        queryFn: () => apiSearchRoom(searchParams.toString()),
        staleTime: 0,
    });
    const roomNumber = searchParams.get('room') ?? 1;
    const numberOfGuest = searchParams.get('numberOfGuest') ?? 1;
    const startDate: string | null = searchParams.get('startDate');
    const endDate: string | null = searchParams.get('endDate');

    const checkIn = startDate ? new Date(startDate) : null;
    const checkOut = endDate ? new Date(endDate) : null;
    const numberOfDays: number =
        checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 1;
    const handleSearch = (data) => {
        const queryParams = new URLSearchParams({
            province: data.searchName,
            startDate: dayjs(data.searchDate[0]).format('YYYY-MM-DD'),
            endDate: dayjs(data.searchDate[1]).format('YYYY-MM-DD'),
            numberOfGuest: data.searchGuest.guest.toString(),
            room: data.searchGuest.room.toString(),
        });
        if (data.searchPrice && data.searchPrice[0] !== undefined && data.searchPrice[1] !== undefined) {
            queryParams.set('minPrice', data.searchPrice[0].toString());
            queryParams.set('maxPrice', data.searchPrice[1].toString());
        }
        setSearchParams(queryParams);
    };
    return (
        <div className="w-full flex items-center justify-center font-main">
            <form onSubmit={handleSubmit(handleSearch)} className="max-w-main w-full min-h-screen flex mt-10 gap-5">
                <div className="max-w-[265px] w-full bg-slate-100 rounded-lg px-3 py-5 pb-10">
                    <div className="flex flex-col gap-2">
                        <div className="text-lg mx-2">Search</div>
                        <Controller
                            name="searchName"
                            rules={{
                                required: 'Search name is required',
                            }}
                            control={control}
                            defaultValue={searchParams.get('province')}
                            render={({ field }) => (
                                <Tooltip
                                    title={errors?.searchName?.message as string}
                                    color="red"
                                    open={!!errors.searchName}
                                    placement="left"
                                >
                                    <Input
                                        size="large"
                                        placeholder="Search"
                                        className="rounded-xl py-3 px-5"
                                        {...field}
                                    />
                                </Tooltip>
                            )}
                        />
                        <Controller
                            name="searchDate"
                            control={control}
                            rules={{
                                required: 'Date checkIn and checkOut is required',
                            }}
                            defaultValue={startDate && endDate ? [dayjs(startDate), dayjs(endDate)] : undefined}
                            render={({ field }) => (
                                <Tooltip
                                    title={errors?.searchDate?.message as string}
                                    color="red"
                                    open={!!errors.searchDate}
                                    placement="left"
                                >
                                    <DatePicker.RangePicker
                                        format="DD-MM-YYYY"
                                        className="font-main rounded-xl px-3 py-3 w-full"
                                        inputReadOnly={true}
                                        superNextIcon={null}
                                        superPrevIcon={null}
                                        placeholder={['Check in', 'Check out']}
                                        popupClassName="show-card-md rounded-full"
                                        {...field}
                                        onChange={(dates) => field.onChange(dates)}
                                    />
                                </Tooltip>
                            )}
                        />
                        <Controller
                            name="searchGuest"
                            control={control}
                            rules={{
                                required: 'Date is required',
                            }}
                            defaultValue={{ guest: roomNumber, room: numberOfGuest }}
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
                                        trigger="click"
                                    >
                                        <Button className="font-main w-full h-[48px] bg-white rounded-xl flex items-center gap-1 justify-center">
                                            <PiUserThin size={25} />
                                            <span className="">{`${getValues('searchGuest')?.guest || 1} adult · ${
                                                getValues('searchGuest')?.room || 1
                                            } room`}</span>
                                        </Button>
                                    </Dropdown>
                                </Tooltip>
                            )}
                        />

                        <Button
                            className="font-main px-5 h-[50px] rounded-xl w-full bg-blue-500"
                            type="primary"
                            icon={<SearchOutlined />}
                            htmlType="submit"
                        >
                            Search
                        </Button>
                    </div>
                    <div className="w-full border">
                        <h2 className="text-lg m-2">Filter by</h2>
                        <div className="p-3 flex flex-col justify-center gap-3">
                            <h2>Your budget (per night)</h2>
                            <div className="">
                                <div className="font-light">VND 300,000 - VND 10,000,000+</div>
                                <Controller
                                    name="searchPrice"
                                    control={control}
                                    render={({ field }) => (
                                        <Slider
                                            range={{ draggableTrack: true }}
                                            min={100}
                                            max={10000}
                                            defaultValue={[200, 2000]}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="p-3 flex flex-col justify-center gap-3">
                            <h2>Star rating</h2>
                            <Checkbox.Group>
                                <Flex vertical justify="center" gap={3}>
                                    {[5, 4, 3, 2, 1].map((value) => (
                                        <Checkbox key={value} value={value}>
                                            {value} star
                                        </Checkbox>
                                    ))}
                                </Flex>
                            </Checkbox.Group>
                        </div>
                        <div className="p-3 flex flex-col justify-center gap-3">
                            <h2>Popular filters</h2>
                            <Checkbox.Group>
                                <Flex vertical justify="center" gap={3}>
                                    {['Breakfast included', 'Hotels', 'Double bed', 'Hostels', 'Homestays'].map(
                                        (value) => (
                                            <Checkbox key={value} value={value}>
                                                {value}
                                            </Checkbox>
                                        ),
                                    )}
                                </Flex>
                            </Checkbox.Group>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                    <div className="h-[60px] bg-slate-100 flex items-center p-5 rounded-xl">
                        <div>{`${data?.data?.totalResults || 0} Search results`}</div>
                    </div>
                    <div className="w-full h-full bg-slate-100 flex flex-col gap-5 p-2 rounded-lg">
                        {isFetching ? (
                            <>
                                {[1, 2, 3].map((index) => (
                                    <Skeleton
                                        key={index}
                                        loading={isFetching}
                                        active
                                        avatar={{ size: 180, shape: 'square' }}
                                    />
                                ))}
                            </>
                        ) : (
                            <>
                                {(data?.data?.apartments || []).map((room) => {
                                    const price = +roomNumber * +room.price * numberOfDays;
                                    return (
                                        <div key={room._id} className="flex items-start gap-10 bg-white p-1 rounded-lg">
                                            <div className="w-2/5">
                                                <Image
                                                    src={room.image}
                                                    className="rounded-lg"
                                                    preview={false}
                                                    height={200}
                                                    width="100%"
                                                />
                                            </div>
                                            <div className="w-3/5 flex h-full py-3">
                                                <div className="w-7/12 flex flex-col mt-3 gap-3">
                                                    <div className="font-medium text-lg overflow-hidden line-clamp-2">
                                                        {room.name}
                                                    </div>
                                                    <div className="text-xs font-light flex items-start justify-center gap-1">
                                                        <i className="mt-1">
                                                            <GoLocation size={15} />
                                                        </i>
                                                        <span className="hover:underline line-clamp-2 text-blue-800">
                                                            {`${room.address.street} ${room.address.ward} ${room.address.district} ${room.address.province}`}
                                                        </span>
                                                    </div>
                                                    <div className="font-light text-sm ml-3 flex items-center gap-1 flex-wrap">
                                                        {(room?.services || []).map((service, index) => (
                                                            <span key={index} className="px-3 border">
                                                                {service}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="w-5/12 flex flex-col justify-between items-end">
                                                    <div className="flex gap-2 min-w-[150px]">
                                                        <div className="flex flex-col items-end">
                                                            <span className=" font-medium">Review score</span>
                                                            <span className=" font-light">{`${room.rating.totalRating} reviews`}</span>
                                                        </div>
                                                        <div className="rounded-score bg-blue-700 w-[40px] h-[40px] relative">
                                                            <span className="absolute top-2 right-4 text-white">
                                                                {room.rating.ratingAgv}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="w-full flex flex-col justify-end items-end mt-2 pr-5">
                                                        <div className="font-light text-xs">{`1 night, ${numberOfGuest} people`}</div>
                                                        <div className="text-lg">{`${price?.toLocaleString()} VND`}</div>
                                                        <div className="font-light text-xs">
                                                            {`+VND ${(price * 0.11)?.toLocaleString()} taxes and fees`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Listing;
