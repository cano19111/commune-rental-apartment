import { PaymentElement } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Flex } from 'antd';
import { path } from '@/utils/constant';
import icons from '@/utils/icons';
import { useMutation } from '@tanstack/react-query';
import { apiBooking } from '@/apis';
const { IoIosArrowBack, FaLock } = icons;
interface CheckoutFormProps {
    setActiveTab: (activeTab: string) => void;
    setStep: (step: number) => void;
    CustomerInfoData: CustomerBooking;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({ setActiveTab, setStep, CustomerInfoData }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const bookingMutation = useMutation({
        mutationFn: apiBooking,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/${path.BOOKING_COMPLETION}`,
            },
        });

        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage(error.message);
            return;
        }
        if (error) {
            setMessage('An unexpected error occured.');
            return;
        }
        bookingMutation.mutate(CustomerInfoData, {
            onSuccess: () => {},
        });
        setIsProcessing(false);
    };

    return (
        <span>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border border-gray-300 rounded-lg p-8">
                    <div className="text-lg font-semibold mb-5">Please enter payment information</div>
                    <PaymentElement />
                    {message && <div className="text-red-500 font-normal">{message}</div>}
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
                        disabled={!stripe || !elements}
                        htmlType="submit"
                        type="primary"
                        size="large"
                        className="bg-blue-500 flex items-center justify-center"
                        loading={isProcessing}
                        icon={<FaLock />}
                    >
                        Booking Completion
                    </Button>
                </Flex>
            </form>
        </span>
    );
};
export default CheckoutForm;
