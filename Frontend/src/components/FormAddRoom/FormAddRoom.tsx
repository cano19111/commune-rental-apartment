import { Checkbox, Upload, Image, Flex } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { apiGetServices } from '@/apis';
import { InputForm } from '..';
import icons from '@/utils/icons';
import clsx from 'clsx';
import { FieldValues, DeepMap, FieldError, Control, Controller } from 'react-hook-form';
const { FiTrash, AiOutlineClose } = icons;

interface AddRoomProps {
    errors: DeepMap<FieldValues, FieldError>;
    control: Control<ApartmentType>;
    indexRoom: number;
    onClose: (index: number) => void;
}

const AddRoom: React.FC<AddRoomProps> = ({ errors, control, indexRoom, onClose }) => {
    const { data: servicesData } = useQuery({
        queryKey: ['services'],
        queryFn: apiGetServices,
    });
    return (
        <div className="p-5 rounded-xl flex flex-col gap-5 border-[1px] border-gray-300 md:py-5 px-10 relative">
            <span
                className={clsx(
                    'absolute top-3 right-3 p-2 rounded-xl border border-red-500 cursor-pointer',
                    indexRoom === 0 && 'hidden',
                )}
                onClick={() => onClose(indexRoom)}
            >
                <AiOutlineClose color="#e50000" />
            </span>
            <div className="flex flex-col">
                <label className="text-lg mb-1">
                    <span className="text-red-500">* </span>
                    {'Services'}
                </label>
                <Controller
                    control={control}
                    name={`rooms.${indexRoom}.services`}
                    rules={{
                        required: 'Services is required',
                    }}
                    render={({ field }) => (
                        <Flex vertical gap={5}>
                            <Checkbox.Group
                                options={(servicesData?.data.services || []).map((service) => ({
                                    label: service.title,
                                    value: service._id,
                                }))}
                                {...field}
                                defaultValue={field.value}
                            />
                            {errors?.rooms?.[indexRoom]?.services && (
                                <span className="font-main text-red-600">
                                    {errors?.rooms?.[indexRoom]?.services.message}
                                </span>
                            )}
                        </Flex>
                    )}
                />
            </div>

            <InputForm
                control={control}
                name={`rooms.${indexRoom}.description`}
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
                        name={`rooms.${indexRoom}.images`}
                        rules={{
                            required: 'Images is required',
                        }}
                        render={({ field: { onChange, value } }) => (
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
                                                <Image
                                                    width={100}
                                                    src={
                                                        (UploadFile.thumbUrl as string) ||
                                                        URL.createObjectURL(UploadFile.originFileObj as File)
                                                    }
                                                />
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
                                {errors?.rooms?.[indexRoom]?.images && (
                                    <span className="font-main text-red-600">
                                        {errors?.rooms?.[indexRoom]?.images.message}
                                    </span>
                                )}
                            </Flex>
                        )}
                    />
                </Flex>
            </div>
            <Flex align="center" gap={20} wrap="wrap">
                <InputForm
                    control={control}
                    name={`rooms.${indexRoom}.size`}
                    rules={{
                        required: 'Room size is required',
                        validate: {
                            positive: (value: number) => value >= 0 || 'Room size cannot be less than 0',
                        },
                    }}
                    placeholder="Enter the room size"
                    type="number"
                    label="Room size"
                    className="md:min-w-[250px] min-w-[200px]"
                />

                <InputForm
                    control={control}
                    name={`rooms.${indexRoom}.price`}
                    rules={{
                        required: 'Price is required',
                        validate: {
                            positive: (value: number) => value >= 0 || 'Price cannot be less than 0',
                        },
                    }}
                    placeholder="Enter the size"
                    type="number"
                    label="Price"
                    className="md:min-w-[250px] min-w-[200px]"
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                />
                <InputForm
                    control={control}
                    name={`rooms.${indexRoom}.roomType`}
                    rules={{ required: 'Room type is required' }}
                    placeholder="Enter the room type"
                    label="Room type"
                    className="md:min-w-[250px] min-w-[200px]"
                />

                <InputForm
                    control={control}
                    name={`rooms.${indexRoom}.numberOfGuest`}
                    rules={{
                        required: 'Number of guests is required',
                        validate: {
                            positive: (value: number) => value >= 0 || 'Number of guests cannot be less than 0',
                        },
                    }}
                    placeholder="Enter the number of guests"
                    type="number"
                    label="Number of guests"
                    className="md:min-w-[250px] min-w-[200px]"
                />
                <InputForm
                    control={control}
                    name={`rooms.${indexRoom}.quantity`}
                    rules={{
                        required: 'Quantity is required',
                        valueAsNumber: 'Quantity must be numeric',
                        validate: {
                            positive: (value: number) => value >= 0 || 'Quantity cannot be less than 0',
                        },
                    }}
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
