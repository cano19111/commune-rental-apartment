import { path } from '@/utils/constant';
import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button onClick={() => navigate(`/${path.HOME}`)} className="bg-blue-500" type="primary">
                        Back Home
                    </Button>
                }
            />
        </div>
    );
};

export default NotFound;
