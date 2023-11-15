import React, { useState } from 'react';
import { Avatar, Button, DatePicker, Flex, Input, Select, Spin, message, Upload } from 'antd';
import { UserOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks';
import { useForm, Controller } from 'react-hook-form';
import { apiEditUser, apiGetCurrentUser, apiGetImage } from '@/apis';
import moment from 'moment';
import dayjs from 'dayjs';
import { RcFile } from 'antd/es/upload';
const PersonalInformation: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const editProfileMutator = useMutation({
        mutationFn: apiEditUser,
    });
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        getValues,
    } = useForm({
        defaultValues: async () => {
            setIsLoading(true);
            const response = await apiGetCurrentUser();
            setIsLoading(false);
            if (response.success) {
                const {
                    firstname,
                    lastname,
                    phone,
                    email,
                    avatar,
                    dateOfBirth,
                    nationality,
                    gender,
                    address,
                    personalId,
                } = response.data.user;
                return {
                    avatarEdit: '',
                    firstname,
                    lastname,
                    phone,
                    email,
                    avatar,
                    dateOfBirth,
                    nationality,
                    gender,
                    address,
                    personalId,
                };
            }
        },
    });

    const handleEditUser = (data) => {
        const formData = new FormData();
        if (data?.avatarEdit) delete data.avatar;
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'avatarEdit' && value) {
                formData.append('avatar', value[0].originFileObj);
            } else {
                formData.append(key, value);
            }
        });

        editProfileMutator.mutate(formData, {
            onSuccess: (response) => {
                if (response.success) {
                    message.success('Edit profile updated successfully');
                    setIsEditing(false);
                    const {
                        firstname,
                        lastname,
                        phone,
                        email,
                        avatar,
                        dateOfBirth,
                        nationality,
                        gender,
                        address,
                        personalId,
                    } = response.data.user;
                    reset({
                        avatarEdit: '',
                        firstname,
                        lastname,
                        phone,
                        email,
                        avatar,
                        dateOfBirth,
                        nationality,
                        gender,
                        address,
                        personalId,
                    });
                } else {
                    message.error(response?.message || 'Edit profile failed');
                }
            },
            onError: () => {
                message.error('Edit profile failed');
            },
        });
    };
    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    return (
        <>
            <Spin spinning={isLoading || editProfileMutator.isPending} fullscreen size="large" />
            <div className="w-full">
                <form onSubmit={handleSubmit(handleEditUser)} className="w-full">
                    <h2 className="font-semibold text-3xl mb-4 text-center">Personal information</h2>
                    <div className="w-full my-4 flex items-center justify-center">
                        <Controller
                            control={control}
                            name="avatarEdit"
                            render={({ field: { onChange, value } }: any) => (
                                <Flex vertical gap={5}>
                                    {isEditing ? (
                                        <Upload
                                            listType="picture-circle"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            customRequest={() => {}}
                                            fileList={typeof value === 'string' ? null : value}
                                            onChange={({ fileList }) => {
                                                (async () => {
                                                    fileList[0].thumbUrl = await getBase64(
                                                        fileList[0].originFileObj as RcFile,
                                                    );
                                                    onChange(fileList);
                                                })();
                                            }}
                                            maxCount={1}
                                        >
                                            <div className="relative group">
                                                <Avatar
                                                    size={80}
                                                    src={
                                                        (isEditing && getValues('avatarEdit')?.[0]?.thumbUrl) ||
                                                        getValues('avatar')
                                                    }
                                                    icon={<UserOutlined />}
                                                />
                                                {isEditing && (
                                                    <div className="hidden group-hover:block items-center absolute top-0 left-0 bg-gray-100 p-2 rounded-full w-full h-full">
                                                        <PlusOutlined />
                                                        <div style={{ marginTop: 8 }}>Upload</div>
                                                    </div>
                                                )}
                                            </div>
                                        </Upload>
                                    ) : (
                                        <Avatar
                                            size={80}
                                            src={
                                                (isEditing && getValues('avatarEdit')?.[0]?.thumbUrl) ||
                                                getValues('avatar')
                                            }
                                            icon={<UserOutlined />}
                                        />
                                    )}
                                    {errors?.avatarEdit && (
                                        <span className="font-main text-red-600">
                                            {errors?.avatarEdit.message as string}
                                        </span>
                                    )}
                                </Flex>
                            )}
                        />
                    </div>
                    <table className="w-full">
                        <tbody>
                            <tr className="border-t border-b border-gray-300">
                                <td className="flex py-6 items-center gap-20">
                                    <div className="flex gap-5 items-center">
                                        <span className="font-medium whitespace-nowrap">First name :</span>
                                        {isEditing ? (
                                            <Controller
                                                control={control}
                                                name="firstname"
                                                rules={{
                                                    required: 'First name is required',
                                                }}
                                                render={({ field }: any) => (
                                                    <Flex vertical gap={5}>
                                                        <Input {...field} status={errors?.firstname && 'error'} />
                                                        {errors?.firstname && (
                                                            <span className="font-main text-red-600">
                                                                {errors?.firstname.message as string}
                                                            </span>
                                                        )}
                                                    </Flex>
                                                )}
                                            />
                                        ) : (
                                            <span className="text-base">{getValues('firstname')}</span>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex gap-5 items-center">
                                        <span className="font-medium whitespace-nowrap">Last name :</span>
                                        {isEditing ? (
                                            <Controller
                                                control={control}
                                                name="lastname"
                                                rules={{
                                                    required: 'Last name is required',
                                                }}
                                                render={({ field }: any) => (
                                                    <Flex vertical gap={5}>
                                                        <Input {...field} status={errors?.lastname && 'error'} />
                                                        {errors?.lastname && (
                                                            <span className="font-main text-red-600">
                                                                {errors?.lastname?.message as string}
                                                            </span>
                                                        )}
                                                    </Flex>
                                                )}
                                            />
                                        ) : (
                                            <span className="text-base">{getValues('lastname')}</span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-t border-b border-gray-300"></tr>
                            <tr className="border-t border-b border-gray-300">
                                <td className="py-6 pr-4 font-medium text-base">Email address :</td>
                                {isEditing ? (
                                    <td>
                                        <Controller
                                            control={control}
                                            name="email"
                                            rules={{
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address',
                                                },
                                            }}
                                            render={({ field }: any) => (
                                                <Flex vertical gap={5}>
                                                    <Input {...field} status={errors?.email && 'error'} />
                                                    {errors?.email && (
                                                        <span className="font-main text-red-600">
                                                            {errors?.email?.message as string}
                                                        </span>
                                                    )}
                                                </Flex>
                                            )}
                                        />
                                    </td>
                                ) : (
                                    <td className="py-6 text-base">{getValues('email')}</td>
                                )}
                            </tr>
                            <tr className="border-t border-b border-gray-300">
                                <td className="py-6 pr-4 font-medium text-base">Phone number :</td>
                                {isEditing ? (
                                    <td>
                                        <Controller
                                            control={control}
                                            name="phone"
                                            rules={{
                                                required: 'Phone is required',
                                            }}
                                            render={({ field }: any) => (
                                                <Flex vertical gap={5}>
                                                    <Input {...field} status={errors?.phone && 'error'} />
                                                    {errors?.phone && (
                                                        <span className="font-main text-red-600">
                                                            {errors?.phone?.message as string}
                                                        </span>
                                                    )}
                                                </Flex>
                                            )}
                                        />
                                    </td>
                                ) : (
                                    <td className="py-6 text-base">{getValues('phone')}</td>
                                )}
                            </tr>
                            <tr className="border-t border-b border-gray-300">
                                <td className="py-6 pr-4 font-medium text-base">Date of birth :</td>
                                {isEditing ? (
                                    <td>
                                        <Controller
                                            control={control}
                                            name="dateOfBirth"
                                            rules={{
                                                required: 'Date of birth is required',
                                            }}
                                            render={({ field }: any) => (
                                                <Flex vertical gap={5}>
                                                    <DatePicker
                                                        {...field}
                                                        format="DD-MM-YYYY"
                                                        value={dayjs(field.value)}
                                                        status={errors?.dateOfBirth && 'error'}
                                                    />
                                                    {errors?.dateOfBirth && (
                                                        <span className="font-main text-red-600">
                                                            {errors?.dateOfBirth?.message as string}
                                                        </span>
                                                    )}
                                                </Flex>
                                            )}
                                        />
                                    </td>
                                ) : (
                                    <td className="py-6 text-base">
                                        {moment(getValues('dateOfBirth') || undefined).format('DD-MM-YYYY')}
                                    </td>
                                )}
                            </tr>
                            <tr className="border-t border-b border-gray-300">
                                <td className="py-6 pr-4 font-medium text-base">Nationality :</td>
                                {isEditing ? (
                                    <td>
                                        <Controller
                                            control={control}
                                            name="nationality"
                                            rules={{
                                                required: 'Nationality is required',
                                            }}
                                            render={({ field }: any) => (
                                                <Flex vertical gap={5}>
                                                    <Input {...field} status={errors?.nationality && 'error'} />
                                                    {errors?.nationality && (
                                                        <span className="font-main text-red-600">
                                                            {errors?.nationality?.message as string}
                                                        </span>
                                                    )}
                                                </Flex>
                                            )}
                                        />
                                    </td>
                                ) : (
                                    <td className="py-6 text-base">{getValues('nationality')}</td>
                                )}
                            </tr>
                            <tr className="border-t border-b border-gray-300">
                                <td className="py-6 pr-4 font-medium text-base">Gender :</td>
                                {isEditing ? (
                                    <td>
                                        <Controller
                                            control={control}
                                            name="gender"
                                            rules={{
                                                required: 'Gender is required',
                                            }}
                                            render={({ field }: any) => (
                                                <Flex vertical gap={5}>
                                                    <Select
                                                        {...field}
                                                        status={errors?.gender && 'error'}
                                                        options={[
                                                            { label: 'Male', value: 'Male' },
                                                            { label: 'Female', value: 'Female' },
                                                            { label: 'Other', value: 'Other' },
                                                        ]}
                                                    />
                                                    {errors?.gender && (
                                                        <span className="font-main text-red-600">
                                                            {errors?.gender?.message as string}
                                                        </span>
                                                    )}
                                                </Flex>
                                            )}
                                        />
                                    </td>
                                ) : (
                                    <td className="py-6 text-base">{getValues('gender')}</td>
                                )}
                            </tr>
                            <tr className="border-t border-b border-gray-300">
                                <td className="py-6 pr-4 font-medium text-base">Address :</td>
                                {isEditing ? (
                                    <td>
                                        <Controller
                                            control={control}
                                            name="address"
                                            rules={{
                                                required: 'Address is required',
                                            }}
                                            render={({ field }: any) => (
                                                <Flex vertical gap={5}>
                                                    <Input {...field} status={errors?.address && 'error'} />
                                                    {errors?.address && (
                                                        <span className="font-main text-red-600">
                                                            {errors?.address?.message as string}
                                                        </span>
                                                    )}
                                                </Flex>
                                            )}
                                        />
                                    </td>
                                ) : (
                                    <td className="py-6 text-base">{getValues('address')}</td>
                                )}
                            </tr>
                            <tr className="border-t border-b border-gray-300">
                                <td className="py-6 pr-4 font-medium text-base">Personal ID</td>
                                {isEditing ? (
                                    <td>
                                        <Controller
                                            control={control}
                                            name="personalId"
                                            rules={{
                                                required: 'Personal Id is required',
                                            }}
                                            render={({ field }: any) => (
                                                <Flex vertical gap={5}>
                                                    <Input {...field} status={errors?.personalId && 'error'} />
                                                    {errors?.personalId && (
                                                        <span className="font-main text-red-600">
                                                            {errors?.personalId?.message as string}
                                                        </span>
                                                    )}
                                                </Flex>
                                            )}
                                        />
                                    </td>
                                ) : (
                                    <td className="py-6 text-base">{getValues('personalId')}</td>
                                )}
                            </tr>
                        </tbody>
                    </table>
                    {isEditing && (
                        <Flex gap={10}>
                            <Button className="bg-green-300 mt-5" size="large" htmlType="submit">
                                Save
                            </Button>
                            <Button className="bg-red-200 mt-5" size="large" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </Flex>
                    )}
                </form>
                {!isEditing && (
                    <Button
                        type="primary"
                        size="large"
                        icon={<EditOutlined />}
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 mt-5"
                    >
                        Edit
                    </Button>
                )}
            </div>
        </>
    );
};

export default PersonalInformation;
