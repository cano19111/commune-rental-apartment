import { Select, Upload, Image, Flex } from 'antd';
import React from 'react';
import type { RcFile } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { apiGetServices } from '@/apis';
import { InputForm } from '..';
import icons from '@/utils/icons';

const AddRoom: React.FC = ({ Controller, errors, control }: any) => {
    const { FiTrash } = icons;
    const { data: servicesData, isLoading: isLoadingServices } = useQuery({
        queryKey: ['services'],
        queryFn: apiGetServices,
    });

    return (
        <div>
            <h2 className="text-xl font-medium mb-5">Add room</h2>
            <div className="p-5 mb-5 rounded-xl flex flex-col gap-5 border-[2px] border-gray-700 md:p-10">
                <div className="flex flex-col">
                    <label className="text-lg mb-2">Services</label>
                    <Controller
                        control={control}
                        name="rooms.0.services"
                        rules={{
                            required: '* Services is required',
                        }}
                        render={({ field }: any) => (
                            <Flex vertical gap={5}>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    options={(servicesData?.data.services || []).map((service: any) => {
                                        return {
                                            label: service.title,
                                            value: service._id,
                                        };
                                    })}
                                    size="large"
                                    className="rounded-xl py-5"
                                    loading={isLoadingServices}
                                    {...field}
                                    status={errors?.rooms?.[0]?.services && 'error'}
                                />
                                {errors?.rooms?.[0]?.services && (
                                    <span className="font-main text-red-600">
                                        {errors?.rooms?.[0]?.services.message}
                                    </span>
                                )}
                            </Flex>
                        )}
                    />
                </div>

                <InputForm
                    Controller={Controller}
                    control={control}
                    error={errors?.rooms?.[0]?.description}
                    name="rooms.0.description"
                    rules={{ required: '* Description is required' }}
                    placeholder="Enter the description"
                    type="area"
                    label="Description"
                    className="md:min-w-[250px] min-w-[200px]"
                />
                <Flex align="center" gap={10} className="flex-wrap sm:flex-nowrap">
                    <InputForm
                        Controller={Controller}
                        control={control}
                        error={errors?.rooms?.[0]?.size}
                        name="rooms.0.size"
                        rules={{ required: '* Size room is required' }}
                        placeholder="Enter the size room"
                        type="number"
                        label="Size room"
                        className="md:min-w-[250px] min-w-[200px]"
                    />

                    <InputForm
                        Controller={Controller}
                        control={control}
                        error={errors?.rooms?.[0]?.price}
                        name="rooms.0.price"
                        rules={{ required: '* Price is required' }}
                        placeholder="Enter the size"
                        type="number"
                        label="Price"
                        className="md:min-w-[250px] min-w-[200px]"
                        formatter={(value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value: any) => value!.replace(/\$\s?|(,*)/g, '')}
                    />
                </Flex>

                <div className="flex flex-col">
                    <label className="text-lg mb-2">Images</label>
                    <Flex align="center" gap={2}>
                        <Controller
                            control={control}
                            name="images"
                            rules={{
                                required: '* Images is required',
                            }}
                            render={({ field: { onChange, onBlur, value, ref } }: any) => (
                                <Flex vertical gap={5}>
                                    <Upload
                                        listType="picture-card"
                                        customRequest={() => null}
                                        fileList={value}
                                        onChange={({ fileList }) => {
                                            onChange(fileList);
                                        }}
                                        maxCount={50}
                                        multiple
                                        itemRender={(ReactElement, UploadFile, fileList, actions) => {
                                            return (
                                                <div className="w-full h-full flex justify-center items-center relative">
                                                    <Image width={100} src={UploadFile.thumbUrl as string} />
                                                    <i
                                                        className="absolute top-0 right-0 border p-1 rounded-full cursor-pointer"
                                                        onClick={() => actions.remove()}
                                                    >
                                                        <FiTrash color={'#cc0000'} />
                                                    </i>
                                                </div>
                                            );
                                        }}
                                    >
                                        <div>
                                            <PlusOutlined />
                                            <div className="mt-2">Upload</div>
                                        </div>
                                    </Upload>
                                    {errors?.images && (
                                        <span className="font-main text-red-600">{errors?.images.message}</span>
                                    )}
                                </Flex>
                            )}
                        />
                    </Flex>
                </div>
                <InputForm
                    Controller={Controller}
                    control={control}
                    error={errors?.rooms?.[0]?.roomType}
                    name="rooms.0.roomType"
                    rules={{ required: '* Room type is required' }}
                    placeholder="Enter the room type"
                    label="Room type"
                    className="md:min-w-[250px] min-w-[200px]"
                />

                <InputForm
                    Controller={Controller}
                    control={control}
                    error={errors?.rooms?.[0]?.numberOfGuest}
                    name="rooms.0.numberOfGuest"
                    rules={{ required: '* Number of guests is required' }}
                    placeholder="Enter the number of guests"
                    type="number"
                    label="Number of guests"
                    className="md:min-w-[250px] min-w-[200px]"
                />
                <InputForm
                    Controller={Controller}
                    control={control}
                    error={errors?.rooms?.[0]?.quantity}
                    name="rooms.0.quantity"
                    rules={{ required: '* Quantity is required', valueAsNumber: '* Quantity must be numeric' }}
                    placeholder="Enter the quantity"
                    label="Quantity"
                    type="number"
                    className="md:min-w-[250px] min-w-[200px]"
                />
            </div>
        </div>
    );
};

export default AddRoom;
