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
    const [wardsOption, setWardsOption] = useState([]);
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            images: [],
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
        data.location.province = Provinces.find((province) => province.code === data.location.province).name;
        data.location.district = districtsOption.find((district) => district.code === data.location.district).name;
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'images') {
                value = JSON.stringify(value);
                formData.append(key, value);
            } else {
                data.images = data.images.map((images: any) => formData.append(key, images.originFileObj));
            }
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
            <div className="max-w-main mx-auto p-10 flex flex-col gap-5">
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

                <div className="flex gap-5 flex-col flex-wrap sm:flex-row lg:flex-nowrap">
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
                        className="min-w-[250px]"
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
                        className="min-w-[250px]"
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
                        className="min-w-[250px]"
                    />
                    <InputForm
                        Controller={Controller}
                        control={control}
                        error={errors?.location?.street}
                        name="location.street"
                        rules={{ required: 'Street is required' }}
                        placeholder="Enter the street"
                        label="Street"
                        className="min-w-[250px] p-1"
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

                <AddRoom Controller={Controller} control={control} errors={errors} />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    Add Room
                </Button>
            </div>
        </form>
    );
};

export default CreateApartment;
