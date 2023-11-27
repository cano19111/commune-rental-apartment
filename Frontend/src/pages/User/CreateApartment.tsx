import { AddRoom, InputForm, SelectForm } from '@/components';
import { Flex, Button, message } from 'antd';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { apiCreateApartment } from '@/apis';
import { Provinces } from '@/utils/location/provinces';
import { Districts } from '@/utils/location/districts';
import { Wards } from '@/utils/location/wards';

const CreateApartment: React.FC = () => {
    const createApartmentMutation = useMutation({ mutationFn: apiCreateApartment });
    const [districtsOption, setDistrictsOption] = useState([]);
    const [listRooms, setListRooms] = useState(1);
    const [wardsOption, setWardsOption] = useState([]);
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            title: '',
            location: {
                longitude: null,
                latitude: null,
                province: '',
                district: '',
                ward: '',
                street: '',
            },
            rooms: [
                {
                    services: [],
                    description: '',
                    price: null,
                    size: null,
                    numberOfGuest: null,
                    images: [],
                    roomType: '',
                    quantity: null,
                },
            ],
        },
    });
    const handleProvinceChange = (selectedProvinceCode: number) => {
        const filteredDistricts = Districts.filter((district) => district.province_code === selectedProvinceCode);
        setDistrictsOption(filteredDistricts);
        setWardsOption([]);
        setValue('location.district', '');
        setValue('location.ward', '');
    };
    const handleDistrictChange = (selectedDistrictCode: number) => {
        const filteredWards = Wards.filter((ward) => ward.district_code === selectedDistrictCode);
        setWardsOption(filteredWards);
        setValue('location.ward', '');
    };
    const handleCreateApartment = async (data) => {
        console.log(data.rooms[0].images);
        data.location.province = Provinces.find((province) => province.code === data.location.province)?.name;
        data.location.district = districtsOption.find((district) => district.code === data.location.district)?.name;
        const formData = new FormData();
        data.rooms.forEach((room, index) => {
            Object.entries(room).forEach(([key, value]) => {
                if (key === 'images') {
                    room.images.forEach((image, imageIndex) => {
                        formData.append(`rooms[${index}][images]`, image.originFileObj);
                    });
                    delete data.rooms[index].images;
                }
            });
        });
        Object.entries(data).forEach(([key, value]) => {
            value = JSON.stringify(value);
            formData.append(key, value as string);
        });
        createApartmentMutation.mutate(formData, {
            onSuccess: (data) => {
                if (data) {
                    if (data.success) {
                        message.success('Create apartment successfully');
                        reset();
                    } else message.error(data?.message || 'Create apartment failed');
                } else {
                    message.error('Create apartment failed');
                }
            },

            onError: () => {
                message.error('Create apartment failed');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(handleCreateApartment)}>
            <div className="max-w-main mx-auto p-10 flex flex-col gap-3">
                <h1 className="text-3xl font-bold mb-5">Create Apartment</h1>
                <InputForm
                    Controller={Controller}
                    control={control}
                    error={errors?.title}
                    name="title"
                    rules={{ required: 'Name is required' }}
                    placeholder="Enter the name"
                    label="Name"
                />

                <div className="flex gap-5 flex-col flex-wrap sm:flex-row lg:flex-nowrap items-center">
                    <SelectForm
                        Controller={Controller}
                        control={control}
                        error={errors?.location?.province}
                        name="location.province"
                        rules={{ required: 'Province is required' }}
                        placeholder="Enter the province"
                        label="Province"
                        options={(Provinces || []).map((province: any) => {
                            return {
                                label: province.name,
                                value: province.code,
                            };
                        })}
                        onChangeSelected={handleProvinceChange}
                        className="min-w-[250px] w-full"
                    />
                    <SelectForm
                        Controller={Controller}
                        control={control}
                        error={errors?.location?.district}
                        name="location.district"
                        rules={{ required: 'District is required' }}
                        placeholder="Enter the district"
                        label="District"
                        options={(districtsOption || []).map((district: any) => {
                            return {
                                label: district.name,
                                value: district.code,
                            };
                        })}
                        onChangeSelected={handleDistrictChange}
                        className="min-w-[250px] w-full"
                    />
                    <SelectForm
                        Controller={Controller}
                        control={control}
                        error={errors?.location?.ward}
                        name="location.ward"
                        rules={{ required: 'Ward is required' }}
                        placeholder="Enter the ward"
                        label="Ward"
                        options={(wardsOption || []).map((ward: any) => {
                            return {
                                label: ward.name,
                                value: ward.name,
                            };
                        })}
                        className="min-w-[250px] w-full"
                    />
                </div>
                <div>
                    <InputForm
                        Controller={Controller}
                        control={control}
                        error={errors?.location?.street}
                        name="location.street"
                        rules={{ required: 'Street is required' }}
                        placeholder="Enter the street"
                        label="Street"
                    />
                </div>

                <Flex gap={20} align="center" className="flex-wrap sm:flex-nowrap">
                    <InputForm
                        Controller={Controller}
                        control={control}
                        error={errors?.location?.longitude}
                        name="location.longitude"
                        rules={{ required: 'Longitude is required' }}
                        placeholder="Enter the longitude"
                        label="Longitude"
                        type="number"
                        className="min-w-[250px] "
                    />
                    <InputForm
                        Controller={Controller}
                        control={control}
                        error={errors?.location?.latitude}
                        name="location.latitude"
                        rules={{ required: 'Latitude is required' }}
                        placeholder="Enter the latitude"
                        label="Latitude"
                        type="number"
                        className="min-w-[250px]"
                    />
                </Flex>

                <h2 className="text-xl font-medium">Room information</h2>

                {Array.from({ length: listRooms }).map((_, index) => (
                    <AddRoom key={index} Controller={Controller} control={control} errors={errors} index={index} />
                ))}

                <Button onClick={() => setListRooms((prev) => prev + 1)}>Add more room</Button>
                <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Create apartment
                </Button>
            </div>
        </form>
    );
};

export default CreateApartment;
