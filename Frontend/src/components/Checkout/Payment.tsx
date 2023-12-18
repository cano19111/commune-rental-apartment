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
            try {
                const secretKey = await apiCreateStripePayment();
                setClientSecret(secretKey.clientSecret);
            } catch (error) {
                console.error('Error fetching client secret:', error);
            }
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
