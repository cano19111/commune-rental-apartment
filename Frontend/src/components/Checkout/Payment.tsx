import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { apiCreateStripePayment } from '@/apis';
import { Button, Flex, Radio } from 'antd';
import icons from '@/utils/icons';
const { IoIosArrowBack, FaLock } = icons;

interface PaymentProps {
    setActiveTab: (activeTab: string) => void;
    setStep: (step: number) => void;
    amount: number;
    nameRoom: string;
}
const Payment: React.FC<PaymentProps> = ({ setActiveTab, setStep, amount, nameRoom }) => {
    const [clientSecret, setClientSecret] = useState('');
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const [selectTypePayment, setSelectTypePayment] = useState('before');
    useEffect(() => {
        const getSecret = async () => {
            const secretKey = await apiCreateStripePayment({ amount: amount });
            setClientSecret(secretKey.clientSecret);
        };
        getSecret();
    }, [amount]);

    return (
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
                            <CheckoutForm setActiveTab={setActiveTab} setStep={setStep} />
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
                        >
                            Booking Completion
                        </Button>
                    </Flex>
                </div>
            )}
        </div>
    );
};

export default Payment;
