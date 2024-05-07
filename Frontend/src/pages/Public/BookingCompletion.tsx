import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingCompletion: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center font-main">
            <Result
                status="success"
                title="Booking successfully!"
                subTitle="Your booking details are shown on the left."
                className="-mt-10"
                extra={[
                    <Button key={1} type="primary" size="large" onClick={() => navigate('/')} className="bg-blue-500">
                        Go home
                    </Button>,
                    <Button key={2} size="large" type="primary" ghost onClick={() => navigate('/my-booking')}>
                        View bookings and trips
                    </Button>,
                ]}
            />
        </div>
    );
};

export default BookingCompletion;
