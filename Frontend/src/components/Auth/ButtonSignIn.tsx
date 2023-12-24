import icons from '@/utils/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
const { FcGoogle, SiFacebook } = icons;

const ButtonSignInGoogle: React.FC = () => {
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
    const [isLoadingFaceBook, setIsLoadingFaceBook] = useState(false);

    const handleLoginGoogle = async () => {
        window.open(`${import.meta.env.VITE_SERVER_URL}/api/auth/google`, '_self');
    };
    const handleLoginFaceBook = async () => {
        window.open(`${import.meta.env.VITE_SERVER_URL}/api/auth/facebook`, '_self');
    };
    return (
        <div className="space-y-5">
            <Button
                className="w-full flex items-center justify-center gap-2 px-10 font-main py-7 border-red-500 text-red-500"
                icon={<FcGoogle size={23} />}
                loading={isLoadingGoogle}
                onClick={() => {
                    setIsLoadingGoogle(true);
                    handleLoginGoogle();
                }}
            >
                Sign in with Google
            </Button>
            <Button
                className="w-full flex items-center justify-center gap-2 px-10 font-main py-7 border-blue-500 text-blue-500"
                icon={<SiFacebook size={22} />}
                loading={isLoadingFaceBook}
                onClick={() => {
                    setIsLoadingFaceBook(true);
                    handleLoginFaceBook();
                }}
            >
                Sign in with Facebook
            </Button>
        </div>
    );
};

export default ButtonSignInGoogle;
