import icons from '@/utils/icons';
import { Button, Input, Select } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
const { PiUserThin, BsInfoCircle, CiCircleCheck } = icons;
interface CustomerInfoProps {
    setActiveTab: (tab: string) => void;
    setStep: (step: number) => void;
}
const CustomerInfo: React.FC<CustomerInfoProps> = ({ setActiveTab, setStep }) => {
    return (
        <div className="w-full">
            <div className="w-full space-y-5">
                <div className="w-full flex items-center gap-3 p-5 border border-gray-300 rounded-lg">
                    <PiUserThin size={20} />
                    <div>
                        <Link className="text-blue-500 hover:underline" to="">
                            Sign in
                        </Link>{' '}
                        to book with your saved details or
                        <Link className="text-blue-500 hover:underline" to="">
                            {' '}
                            register
                        </Link>{' '}
                        to manage your bookings on the go!
                    </div>
                </div>
                <div className="p-5 space-y-5 border border-gray-300 rounded-lg">
                    <h2 className="font-semibold text-lg">Enter your details</h2>
                    <div className="p-5 border border-gray-400 bg-gray-50 rounded-lg flex items-center gap-3">
                        <BsInfoCircle size={20} />
                        <div>
                            Almost done! Just fill in the <span className="text-red-500">*</span> required info
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-1 flex flex-col gap-4">
                            <div>
                                <div className="flex gap-1">
                                    <label>First name</label>
                                    <span className="text-red-500">*</span>
                                </div>
                                <Input size="large" />
                            </div>
                            <div className="">
                                <div className="flex gap-1">
                                    <label>Email address</label>
                                    <span className="text-red-500">*</span>
                                </div>
                                <Input size="large" />
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col gap-4">
                            <div className="">
                                <div className="flex">
                                    <label>First name</label>
                                    <span className="text-red-500">*</span>
                                </div>
                                <Input size="large" />
                            </div>

                            <div className="">
                                <div className="flex gap-1">
                                    <label>Phone number</label>
                                    <span className="text-red-500">*</span>
                                </div>
                                <Input size="large" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border border-gray-300 rounded-lg p-5 space-y-5">
                    <div className="font-semibold text-lg">Your arrival time</div>
                    <div>
                        <div className="flex items-center gap-3">
                            <CiCircleCheck size={20} color="green" />
                            <span>You can check in between 14:00 and 00:00</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CiCircleCheck size={20} color="green" />
                            <span>24-hour front desk – Help whenever you need it!</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label>
                            Add your estimated arrival time <span className="text-red-500">*</span>
                        </label>
                        <Select
                            className="max-w-[50%]"
                            defaultValue={''}
                            options={[
                                { value: '', label: 'Please select' },
                                { value: '-1', label: "I don't know" },
                                { value: '14', label: '14:00 – 15:00' },
                                { value: '15', label: '15:00 – 16:00' },
                                { value: '16', label: '16:00 – 17:00' },
                                { value: '17', label: '17:00 – 18:00' },
                                { value: '18', label: '18:00 – 19:00' },
                                { value: '19', label: '19:00 – 20:00' },
                                { value: '20', label: '20:00 – 21:00' },
                                { value: '21', label: '21:00 – 22:00' },
                                { value: '22', label: '22:00 – 23:00' },
                                { value: '23', label: '23:00 – 00:00' },
                                { value: '24', label: '00:00 – 01:00 (the next day)' },
                                { value: '25', label: '01:00 – 02:00 (the next day)' },
                            ]}
                        ></Select>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button
                        type="primary"
                        size="large"
                        className="bg-blue-500"
                        onClick={() => {
                            setActiveTab('checkout');
                            setStep(2);
                        }}
                    >
                        Next: Payment
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CustomerInfo;
