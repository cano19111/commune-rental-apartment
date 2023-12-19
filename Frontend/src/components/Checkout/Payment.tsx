import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { apiCreateStripePayment } from '@/apis';

function Payment() {
    const [clientSecret, setClientSecret] = useState('');
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

    useEffect(() => {
        const getSecret = async () => {
            const secretKey = await apiCreateStripePayment({ amount: 500000 });
            setClientSecret(secretKey.clientSecret);
        };
        getSecret();
    }, []);

    return (
        <>
            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
}

export default Payment;
