import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingCompletion: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Result
                status="success"
                title="Booking successfully!"
                subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                extra={[
                    <Button type="primary" key="console" size="large" ghost onClick={() => navigate(`/`)}>
                        Go home
                    </Button>,
                    <Button size="large" key="buy">
                        View bookings and trips
                    </Button>,
                ]}
            />
        </div>
    );
};

export default BookingCompletion;
