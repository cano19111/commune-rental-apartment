import React from 'react';
import registerImage from '@/assets/register.jpg';
import { Button, Flex, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import icons from '@/utils/icons';

const SignUp: React.FC = () => {
    const { FaRegUser, FcGoogle, SiFacebook } = icons;
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
        },
    });
    const handleRegister = (data) => {
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <div className="w-full flex gap-5">
                <div className="flex-1 pb-10 hidden lg:block">
                    <img src={registerImage} />
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

                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        }}
                        render={({ field }) => (
                            <Flex vertical gap={5}>
                                <Input
                                    size="large"
                                    placeholder="Enter your email"
                                    {...field}
                                    status={errors.email && 'error'}
                                    prefix={
                                        <span className="mr-3">
                                            <FaRegUser size={17} />
                                        </span>
                                    }
                                    className="px-5 py-3"
                                />
                                {errors.email && <span className="font-main text-red-600">{errors.email.message}</span>}
                            </Flex>
                        )}
                    />
                    <Button
                        type="primary"
                        htmlType="submit"
                        danger
                        className="px-10 font-main py-6 flex justify-center items-center font-semibold text-base mt-10"
                    >
                        Sign Up
                    </Button>
                </div>
            </div>{' '}
        </form>
    );
};

export default SignUp;
