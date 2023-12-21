import { useAuth } from '@/hooks';
import icons from '@/utils/icons';
import { Avatar, Button, Input, Select } from 'antd';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

const { PiUserThin, BsInfoCircle, CiCircleCheck } = icons;
interface CustomerInfoProps {
    control: Control<CustomerBooking>;
}
const CustomerInfo: React.FC<CustomerInfoProps> = ({ control }) => {
    const { user: currentUser, isAuthenticated, setAuthModel } = useAuth();
    return (
        <div className="w-full font-main font-light">
            <div className="w-full space-y-5">
                {isAuthenticated ? (
                    <div className="w-full flex items-center gap-3 p-5 border border-gray-300 rounded-lg">
                        <Avatar src={currentUser.avatar} className="border border-blue-600" size={45} />
                        <div className="flex flex-col">
                            <div className="font-medium text-md">You are signed in</div>
                            <div>{currentUser.email}</div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex items-center gap-3 p-5 border border-gray-300 rounded-lg">
                        <PiUserThin size={20} />
                        <div>
                            <span
                                className="text-blue-500 hover:underline"
                                onClick={() => setAuthModel({ isOpen: true, activeTab: 'signin' })}
                            >
                                Sign in
                            </span>
                            <span> to book with your saved details or </span>
                            <span
                                className="text-blue-500 hover:underline"
                                onClick={() => setAuthModel({ isOpen: true, activeTab: 'signup' })}
                            >
                                register
                            </span>
                            <span> to manage your bookings on the go!</span>
                        </div>
                    </div>
                )}

                <div className="p-5 space-y-5 border border-gray-300 rounded-lg">
                    <h2 className="font-semibold text-lg">Enter your details</h2>
                    <div className="p-5 border border-gray-400 bg-gray-50 rounded-lg flex items-center gap-3">
                        <BsInfoCircle size={20} />
                        <div>
                            Almost done! Just fill in the <span className="text-red-700">*</span> required info
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-1 flex flex-col gap-4">
                            <Controller
                                name="firstname"
                                rules={{
                                    required: 'Please fill in your first name',
                                }}
                                control={control}
                                defaultValue={currentUser?.firstname || ''}
                                render={({ field, fieldState: { error } }) => (
                                    <div className="font-normal">
                                        {error ? (
                                            <span className="text-red-700 font-normal text-sm">
                                                {error.message as string}
                                            </span>
                                        ) : (
                                            <div className="flex gap-1">
                                                <label>First name</label>
                                                <span className="text-red-700">*</span>
                                            </div>
                                        )}

                                        <Input status={error && 'error'} {...field} size="large" />
                                    </div>
                                )}
                            />
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: 'Please fill in your email',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Please enter email in correct format',
                                    },
                                }}
                                defaultValue={currentUser?.email || ''}
                                render={({ field, fieldState: { error } }) => (
                                    <div className="font-normal">
                                        {error ? (
                                            <span className="text-red-700 font-normal text-sm">
                                                {error.message as string}
                                            </span>
                                        ) : (
                                            <div className="flex gap-1">
                                                <label>Email address</label>
                                                <span className="text-red-700">*</span>
                                            </div>
                                        )}

                                        <Input status={error && 'error'} {...field} size="large" />
                                    </div>
                                )}
                            />
                        </div>
                        <div className="col-span-1 flex flex-col gap-4">
                            <Controller
                                name="lastname"
                                control={control}
                                rules={{
                                    required: 'Please fill in your last name',
                                }}
                                defaultValue={currentUser?.lastname || ''}
                                render={({ field, fieldState: { error } }) => (
                                    <div className="font-normal">
                                        {error ? (
                                            <span className="text-red-700 font-normal text-sm">
                                                {error.message as string}
                                            </span>
                                        ) : (
                                            <div className="flex gap-1">
                                                <label>Last name</label>
                                                <span className="text-red-700">*</span>
                                            </div>
                                        )}

                                        <Input status={error && 'error'} {...field} size="large" />
                                    </div>
                                )}
                            />
                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^0\d{9}$/,
                                        message: 'Please enter phone in correct format',
                                    },
                                }}
                                defaultValue={currentUser?.phone || ''}
                                render={({ field, fieldState: { error } }) => (
                                    <div className="font-normal">
                                        {error ? (
                                            <span className="text-red-700 font-normal text-sm">
                                                {error.message as string}
                                            </span>
                                        ) : (
                                            <div className="flex gap-1">
                                                <label>Phone number</label>
                                                <span className="text-red-700">*</span>
                                            </div>
                                        )}

                                        <Input status={error && 'error'} {...field} size="large" />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="border border-gray-300 rounded-lg p-5 space-y-5">
                    <div className="font-semibold text-lg">Your arrival time</div>
                    <div>
                        <div className="flex items-center gap-3">
                            <CiCircleCheck size={20} color="green" />
                            <span>You can check in between 14:00 and 22:00</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CiCircleCheck size={20} color="green" />
                            <span>24-hour front desk – Help whenever you need it!</span>
                        </div>
                    </div>
                    <Controller
                        name="arrivalTime"
                        control={control}
                        rules={{ required: 'Estimated arrival time is required' }}
                        render={({ field, fieldState: { error } }) => (
                            <div className="flex flex-col gap-1 font-normal">
                                {error ? (
                                    <span className="text-red-700 font-normal text-sm">{error.message}</span>
                                ) : (
                                    <label className="font-main">
                                        Add your estimated arrival time <span className="text-red-700">*</span>
                                    </label>
                                )}
                                <Select
                                    {...field}
                                    className="max-w-[50%]"
                                    size="large"
                                    placeholder="Please select"
                                    defaultValue={''}
                                    onChange={(value) => field.onChange(value)}
                                    status={error ? 'error' : ''}
                                    options={[
                                        { value: '', label: 'Please select' },
                                        { value: "I don't know", label: "I don't know" },
                                        { value: '14:00 – 15:00', label: '14:00 – 15:00' },
                                        { value: '15:00 – 16:00', label: '15:00 – 16:00' },
                                        { value: '16:00 – 17:00', label: '16:00 – 17:00' },
                                        { value: '17:00 – 18:00', label: '17:00 – 18:00' },
                                        { value: '18:00 – 19:00', label: '18:00 – 19:00' },
                                        { value: '19:00 – 20:00', label: '19:00 – 20:00' },
                                        { value: '20:00 – 21:00', label: '20:00 – 21:00' },
                                        { value: '21:00 – 22:00', label: '21:00 – 22:00' },
                                        { value: '22:00 – 23:00', label: '22:00 – 23:00' },
                                        { value: '23:00 – 00:00', label: '23:00 – 00:00' },
                                        { value: '00:00 – 01:00', label: '00:00 – 01:00 (the next day)' },
                                        { value: '01:00 – 02:00', label: '01:00 – 02:00 (the next day)' },
                                    ]}
                                />
                            </div>
                        )}
                    />
                </div>
                <div className="flex justify-end">
                    <Button type="primary" size="large" className="bg-blue-500" htmlType="submit">
                        Next: Payment
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CustomerInfo;
