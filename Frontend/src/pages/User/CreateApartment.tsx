import { AddRoom, InputForm } from '@/components';
import { Flex, Button, message } from 'antd';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { apiCreateApartment } from '@/apis';

const CreateApartment: React.FC = () => {
    const createApartmentMutation = useMutation({ mutationFn: apiCreateApartment });
    const [messageApi, contextHolder] = message.useMessage();
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
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
    const handleCreateApartment = async (data) => {
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
                        messageApi.open({
                            type: 'success',
                            content: 'Create apartment successfully',
                        });
                        reset();
                    } else
                        messageApi.open({
                            type: 'error',
                            content: data?.message || 'Create apartment failed',
                        });
                } else {
                    messageApi.open({
                        type: 'error',
                        content: 'Create apartment failed',
                    });
                }
            },

            onError: () => {
                messageApi.open({
                    type: 'error',
                    content: 'Create apartment failed',
                });
            },
        });
    };
    return (
        <form onSubmit={handleSubmit(handleCreateApartment)}>
            {contextHolder}
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

                <div className="flex gap-5">
                    <InputForm
                        Controller={Controller}
                        control={control}
                        error={errors?.location?.province}
                        name="location.province"
                        rules={{ required: 'Province is required' }}
                        placeholder="Enter the province"
                        label="Province"
                        className="min-w-[250px]"
                    />
                    <InputForm
                        Controller={Controller}
                        control={control}
                        error={errors?.location?.district}
                        name="location.district"
                        rules={{ required: 'District is required' }}
                        placeholder="Enter the district"
                        label="District"
                        className="min-w-[250px]"
                    />
                    <InputForm
                        Controller={Controller}
                        control={control}
                        error={errors?.location?.ward}
                        name="location.ward"
                        rules={{ required: 'Ward is required' }}
                        placeholder="Enter the ward"
                        label="Ward"
                        className="min-w-[250px]"
                    />
                </div>

                <Flex gap={20} align="center">
                    <InputForm
                        Controller={Controller}
                        control={control}
                        error={errors?.location?.longitude}
                        name="location.longitude"
                        rules={{ required: 'Longitude is required' }}
                        placeholder="Enter the longitude"
                        label="Longitude"
                        type="number"
                        className="min-w-[250px]"
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
