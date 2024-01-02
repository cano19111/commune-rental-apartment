import React from 'react';
import { Button, DatePicker, Dropdown, Tooltip } from 'antd';
import icons from '@/utils/icons';
import { DropDownItem } from '@/components';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useJsApiLoader } from '@react-google-maps/api';
import moment from 'moment';
const { PiUserThin, FaArrowRight } = icons;

const Search: React.FC = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'rent-apartment',
        googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_MAP,
        libraries: ['maps', 'places'],
    });

    const {
        handleSubmit,
        formState: { errors },
        control,
        getValues,
    } = useForm();
    const navigate = useNavigate();

    const handleSearch = (data: SearchData) => {
        const queryParams = new URLSearchParams({
            province: data.searchText,
            start_date: dayjs(data.searchDate[0]).format('YYYY-MM-DD'),
            end_date: dayjs(data.searchDate[1]).format('YYYY-MM-DD'),
            number_of_guest: data.searchGuest.guest.toString(),
            room_number: data.searchGuest.room.toString(),
        });
        navigate(`/listing?${queryParams.toString()}`);
    };

    return (
        isLoaded && (
            <form
                onSubmit={handleSubmit(handleSearch)}
                className="font-main max-w-[960px] w-full min-h-[50px] bg-white rounded-3xl mt-[30px] flex justify-between items-center px-10 flex-wrap py-4 lg:rounded-full shadow-md"
            >
                <Controller
                    control={control}
                    name="searchText"
                    rules={{
                        required: 'Please enter a destination',
                    }}
                    defaultValue=""
                    render={({ field }) => (
                        <Tooltip
                            title={errors?.searchText?.message as string}
                            color="red"
                            open={!!errors.searchText}
                            placement="bottom"
                            zIndex={5}
                        >
                            <div className="flex flex-col w-[200px] text-black ml-3">
                                <span className="text-base font-medium">Where</span>
                                <input
                                    placeholder="Where are you going?"
                                    className="py-2 outline-none bg-transparent text-lg"
                                    {...field}
                                />
                            </div>
                        </Tooltip>
                    )}
                />
                <div className="border-r border-gray-300 h-[50px]"></div>
                <Controller
                    name="searchDate"
                    control={control}
                    rules={{
                        required: 'Please select the time',
                    }}
                    render={({ field }) => (
                        <Tooltip
                            title={errors?.searchDate?.message as string}
                            color="red"
                            placement="bottom"
                            open={!!errors.searchDate}
                            zIndex={5}
                        >
                            <div className="flex flex-col min-w-[200px] max-w-[300px] text-black search-home">
                                <div className="text-base font-medium flex items-center ml-3">
                                    <span>Check-in</span>
                                    <span className="ml-20">Check-out</span>
                                </div>
                                <DatePicker.RangePicker
                                    size="large"
                                    format="DD-MM-YYYY"
                                    className="font-main py-3 border-none outline-none shadow-none text-lg"
                                    inputReadOnly={true}
                                    superNextIcon={null}
                                    superPrevIcon={null}
                                    placeholder={['Add day', 'Add day']}
                                    suffixIcon={null}
                                    {...field}
                                    onChange={(dates) => field.onChange(dates)}
                                    disabledDate={(current) => current && current < moment().startOf('day')}
                                />
                            </div>
                        </Tooltip>
                    )}
                />
                <div className="border-r border-gray-300 h-[50px]"></div>
                <Controller
                    name="searchGuest"
                    control={control}
                    rules={{
                        required: 'Date is required',
                    }}
                    defaultValue={{ guest: 1, room: 1 }}
                    render={({ field }) => (
                        <Tooltip
                            title={errors?.searchGuest?.message as string}
                            color="red"
                            placement="bottom"
                            open={!!errors.searchGuest}
                        >
                            <div className="flex flex-col text-black ml-3">
                                <span className="text-base font-medium">Guest</span>
                                <Dropdown
                                    dropdownRender={() => (
                                        <DropDownItem value={field.value} onChange={(value) => field.onChange(value)} />
                                    )}
                                    placement="bottomLeft"
                                    trigger={['click']}
                                >
                                    <div className="font-main py-2 flex items-center gap-1 justify-center text-black cursor-pointer text-lg">
                                        <PiUserThin size={25} />
                                        <span>{`${getValues('searchGuest')?.guest} adult · ${
                                            getValues('searchGuest')?.room
                                        } rooms`}</span>
                                    </div>
                                </Dropdown>
                            </div>
                        </Tooltip>
                    )}
                />

                <Button
                    className="font-main bg-blue-500 flex items-center justify-center"
                    shape="circle"
                    type="primary"
                    icon={<FaArrowRight size={30} />}
                    htmlType="submit"
                    style={{ width: '57px', height: '57px' }}
                />
            </form>
        )
    );
};

export default Search;
