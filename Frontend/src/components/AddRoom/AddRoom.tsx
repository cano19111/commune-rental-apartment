import { Checkbox, Upload, Image, Flex } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { apiGetServices } from '@/apis';
import { InputForm } from '..';
import icons from '@/utils/icons';

const AddRoom: React.FC = ({ Controller, errors, control, index }: any) => {
    const { FiTrash } = icons;
    const { data: servicesData, isLoading: isLoadingServices } = useQuery({
        queryKey: ['services'],
        queryFn: apiGetServices,
    });

    return (
        <div className="p-5 rounded-xl flex flex-col gap-5 border-[1px] border-gray-700 md:py-5 px-10">
            <div className="flex flex-col">
                <label className="text-lg mb-1">
                    <span className="text-red-500">* </span>
                    {'Services'}
                </label>
                <Controller
                    control={control}
                    name={`rooms.${index}.services`}
                    rules={{
                        required: 'Services is required',
                    }}
                    render={({ field }: any) => (
                        <Flex vertical gap={5}>
                            <Checkbox.Group
                                options={(servicesData?.data.services || []).map((service: any) => ({
                                    label: service.title,
                                    value: service._id,
                                }))}
                                {...field}
                                defaultValue={field.value}
                            />
                            {errors?.rooms?.[index]?.services && (
                                <span className="font-main text-red-600">
                                    {errors?.rooms?.[index]?.services.message}
                                </span>
                            )}
                        </Flex>
                    )}
                />
            </div>

            <InputForm
                Controller={Controller}
                control={control}
                error={errors?.rooms?.[index]?.description}
                name={`rooms.${index}.description`}
                rules={{ required: 'Description is required' }}
                placeholder="Enter the description"
                type="area"
                label="Description"
                rows={5}
                className="md:min-w-[250px] min-w-[200px]"
            />
            <div className="flex flex-col">
                <label className="text-lg mb-2">
                    <span className="text-red-500">* </span>
                    {'Images'}
                </label>
                <Flex align="center" gap={2}>
                    <Controller
                        control={control}
                        name={`rooms.${index}.images`}
                        rules={{
                            required: 'Images is required',
                        }}
                        render={({ field: { onChange, value } }: any) => (
                            <Flex vertical gap={5}>
                                <Upload
                                    listType="picture-card"
                                    accept="image/*"
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
                                {errors?.rooms?.[index]?.images && (
                                    <span className="font-main text-red-600">
                                        {errors?.rooms?.[index]?.images.message}
                                    </span>
                                )}
                            </Flex>
                        )}
                    />
                </Flex>
            </div>
            <Flex align="center" gap={20} wrap="wrap">
                <InputForm
                    Controller={Controller}
                    control={control}
                    error={errors?.rooms?.[index]?.size}
                    name={`rooms.${index}.size`}
                    rules={{ required: 'Size room is required' }}
                    placeholder="Enter the size room"
                    type="number"
                    label="Size room"
                    className="md:min-w-[250px] min-w-[200px]"
                />

                <InputForm
                    Controller={Controller}
                    control={control}
                    error={errors?.rooms?.[index]?.price}
                    name={`rooms.${index}.price`}
                    rules={{ required: 'Price is required' }}
                    placeholder="Enter the size"
                    type="number"
                    label="Price"
                    className="md:min-w-[250px] min-w-[200px]"
                    formatter={(value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value: any) => value!.replace(/\$\s?|(,*)/g, '')}
                />
                <InputForm
                    Controller={Controller}
                    control={control}
                    error={errors?.rooms?.[index]?.roomType}
                    name={`rooms.${index}.roomType`}
                    rules={{ required: 'Room type is required' }}
                    placeholder="Enter the room type"
                    label="Room type"
                    className="md:min-w-[250px] min-w-[200px]"
                />

                <InputForm
                    Controller={Controller}
                    control={control}
                    error={errors?.rooms?.[index]?.numberOfGuest}
                    name={`rooms.${index}.numberOfGuest`}
                    rules={{ required: 'Number of guests is required' }}
                    placeholder="Enter the number of guests"
                    type="number"
                    label="Number of guests"
                    className="md:min-w-[250px] min-w-[200px]"
                />
                <InputForm
                    Controller={Controller}
                    control={control}
                    error={errors?.rooms?.[index]?.quantity}
                    name={`rooms.${index}.quantity`}
                    rules={{ required: 'Quantity is required', valueAsNumber: 'Quantity must be numeric' }}
                    placeholder="Enter the quantity"
                    label="Quantity"
                    type="number"
                    className="md:min-w-[250px] min-w-[200px]"
                />
            </Flex>
        </div>
    );
};

export default AddRoom;
