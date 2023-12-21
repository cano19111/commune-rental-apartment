import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { apiBooking, apiCreateStripePayment } from '@/apis';
import { Button, Flex, Radio, Spin } from 'antd';
import icons from '@/utils/icons';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { path } from '@/utils/constant';
const { IoIosArrowBack, FaLock } = icons;

interface PaymentProps {
    setActiveTab: (activeTab: string) => void;
    setStep: (step: number) => void;
    amount: number;
    nameRoom: string;
    CustomerInfoData: CustomerBooking;
}
const Payment: React.FC<PaymentProps> = ({ setActiveTab, setStep, amount, nameRoom, CustomerInfoData }) => {
    const [clientSecret, setClientSecret] = useState('');
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const [selectTypePayment, setSelectTypePayment] = useState('before');
    const navigate = useNavigate();
    const bookingMutation = useMutation({
        mutationFn: apiBooking,
    });
    useEffect(() => {
        const getSecret = async () => {
            const secretKey = await apiCreateStripePayment({ amount: amount });
            setClientSecret(secretKey.clientSecret);
        };
        getSecret();
    }, [amount]);
    const handleBooking = async () => {
        bookingMutation.mutate(CustomerInfoData, {
            onSuccess: (response: Res) => {
                if (response.success) {
                    navigate(`/${path.BOOKING_COMPLETION}`);
                }
            },
        });
    };
    return (
        <React.Fragment>
            <Spin size="large" spinning={bookingMutation.isPending} fullscreen={bookingMutation.isPending} />
            <div className="mx-2 space-y-5">
                <div className="border border-gray-300 rounded-lg p-8">
                    <Radio.Group
                        className="flex items-center gap-5"
                        value={selectTypePayment}
                        onChange={(e) => setSelectTypePayment(e.target.value)}
                    >
                        <Radio className="text-lg font-normal" value="before">
                            Payment by card
                        </Radio>
                        <Radio className="text-lg font-normal" value="after">
                            Pay upon check-in
                        </Radio>
                    </Radio.Group>
                </div>
                {selectTypePayment === 'before' && (
                    <div>
                        {clientSecret && (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm
                                    setActiveTab={setActiveTab}
                                    setStep={setStep}
                                    CustomerInfoData={CustomerInfoData}
                                />
                            </Elements>
                        )}
                    </div>
                )}
                {selectTypePayment === 'after' && (
                    <div className="space-y-5">
                        <div className="border p-5 border-gray-300 rounded-lg">
                            <div className="text-lg font-medium">You have chosen to pay upon check-in</div>
                            <div>
                                {` Your payment will be processed by ${nameRoom} as you have chosen to pay upon
                      check-in.`}
                            </div>
                        </div>
                        <Flex align="center" justify="space-between">
                            <Button
                                size="large"
                                shape="circle"
                                type="primary"
                                ghost
                                className="flex items-center justify-center"
                                onClick={() => {
                                    setActiveTab('customerInformation');
                                    setStep(1);
                                }}
                                icon={<IoIosArrowBack size={20} />}
                            />

                            <Button
                                htmlType="submit"
                                type="primary"
                                size="large"
                                className="bg-blue-500 flex items-center justify-center"
                                icon={<FaLock />}
                                onClick={handleBooking}
                            >
                                Complete booking
                            </Button>
                        </Flex>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default Payment;
