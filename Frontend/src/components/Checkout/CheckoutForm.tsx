import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Flex } from 'antd';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/completion`,
            },
        });

        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage(error.message);
        } else {
            setMessage('An unexpected error occured.');
        }

        setIsProcessing(false);
    };

    return (
        <span>
            <form onSubmit={handleSubmit} className="space-y-5">
                <PaymentElement />
                <Flex align="center" justify="space-between">
                    <Button type="primary" size="large" className="bg-blue-500">
                        Preview
                    </Button>
                    <Button
                        disabled={!stripe || !elements}
                        htmlType="submit"
                        type="primary"
                        size="large"
                        className="bg-blue-500"
                        loading={isProcessing}
                    >
                        Pay now
                    </Button>
                </Flex>

                {message && <div>{message}</div>}
            </form>
        </span>
    );
}
