import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button, Flex, Spin } from 'antd';
import icons from '@/utils/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiBooking } from '@/apis';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { IoIosArrowBack, FaLock } = icons;
interface CheckoutFormProps {
    setActiveTab: (activeTab: string) => void;
    setStep: (step: number) => void;
    CustomerInfoData: CustomerBooking;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({ setActiveTab, setStep, CustomerInfoData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const queryClient = useQueryClient();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const bookingMutation = useMutation({
        mutationFn: apiBooking,
        onSuccess: (response: Res) => {
            if (response.success) {
                navigate(`/booking-completion/${response.data.booking._id}`);
                queryClient.invalidateQueries({
                    queryKey: ['my-booking'],
                });
            }
        },
        onError: (error) => {
            setMessage(error instanceof Error ? error.message : 'Error occurred during booking.');
        },
    });

    const confirmPaymentMutation = useMutation({
        mutationFn: () => {
            if (!stripe || !elements) {
                throw new Error('Stripe has not been initialized');
            }
            return stripe.confirmPayment({
                elements,
                redirect: 'if_required',
            });
        },
        onSuccess: (response) => {
            if (response.error) {
                setMessage(response.error.message || 'An unexpected error occurred.');
            } else {
                bookingMutation.mutate(CustomerInfoData);
            }
        },
        onError: (error) => {
            setMessage(error instanceof Error ? error.message : 'An unexpected error occurred.');
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        confirmPaymentMutation.mutate();
    };

    return (
        <span>
            <Spin size="large" spinning={bookingMutation.isPending} fullscreen={bookingMutation.isPending} />
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border border-gray-300 rounded-lg p-8 space-y-5">
                    <div className="text-lg font-semibold mb-5">Please enter payment information</div>
                    <PaymentElement />
                    {message && <div className="text-red-500 font-normal text-lg">{message}</div>}
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
                        loading={confirmPaymentMutation.isPending}
                        icon={<FaLock />}
                    >
                        Complete booking
                    </Button>
                </Flex>
            </form>
        </span>
    );
};

export default CheckoutForm;
