import React from 'react';
import loginImage from '@/assets/login.jpg';
import { SiFacebook } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { FaRegUser } from 'react-icons/fa';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { Button, Input } from 'antd';

const SignIn: React.FC = () => {
    return (
        <div className="w-full flex gap-5">
            <div className="flex-1 pb-10 hidden lg:block">
                <img src={loginImage} />
            </div>
            <div className="flex-1 pt-10 flex gap-6 flex-col">
                <Button
                    className="w-full flex items-center justify-center gap-2 px-10 font-main py-7 border-red-500 text-red-500"
                    icon={<FcGoogle size={23} />}
                >
                    Sign in with Google
                </Button>
                <Button
                    className="w-full flex items-center justify-center gap-2 px-10 font-main py-7 border-blue-500 text-blue-500"
                    icon={<SiFacebook size={22} />}
                >
                    Sign in with Facebook
                </Button>
                <div className="relative my-5">
                    <div className="h-0 border-black border"></div>
                    <span className="absolute top-[-10px] left-[45%] bg-white px-3">Or</span>
                </div>
                <Input
                    size="large"
                    placeholder="Enter your email"
                    prefix={
                        <span className="mr-3">
                            <FaRegUser size={17} />
                        </span>
                    }
                    className="px-5 py-3"
                />
                <Input.Password
                    placeholder="Enter your password"
                    className="px-5 py-3"
                    prefix={
                        <span className="mr-3">
                            <HiOutlineLockClosed size={20} />
                        </span>
                    }
                />
                <Button
                    type="primary"
                    danger
                    className="px-10 font-main py-6 flex justify-center items-center font-semibold text-base mt-10"
                >
                    Sign In
                </Button>
            </div>
        </div>
    );
};

export default SignIn;
