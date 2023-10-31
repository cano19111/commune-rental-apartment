import React from 'react';
import loginImage from '@/assets/login.jpg';
const SignIn: React.FC = () => {
    return (
        <div className="w-full flex">
            <div className="flex-1">
                <img src={loginImage} />
            </div>
            <div className="flex-1"></div>
        </div>
    );
};

export default SignIn;
