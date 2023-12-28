import React, { useState } from 'react';
import registerImage from '@/assets/register.jpg';
import { Button, Flex, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import icons from '@/utils/icons';
import { useMutation } from '@tanstack/react-query';
import { apiSignUp } from '@/apis';
import ButtonSignIn from './ButtonSignIn';

const SignUp: React.FC = () => {
    const { FaRegUser } = icons;
    const [message, setMessage] = useState('');
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
        },
    });
    const signUpMutation = useMutation({
        mutationFn: apiSignUp,
    });
    const handleRegister = (data: ReqSignUp) => {
        signUpMutation.mutate(data, {
            onSuccess: (response) => {
                if (response.success) {
                    setMessage(response.message);
                    reset();
                }
            },
        });
    };
    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <div className="w-full flex gap-5">
                <div className="flex-1 pb-10 hidden lg:block">
                    <img src={registerImage} />
                </div>
                <div className="flex-1 pt-10 flex gap-6 flex-col">
                    <ButtonSignIn />

                    <div className="relative my-5">
                        <div className="h-0 border-black border"></div>
                        <span className="absolute top-[-10px] left-[45%] bg-white px-3">Or</span>
                    </div>
                    {message ? (
                        <div className="flex items-center justify-center text-xl text-blue-500 mt-5 text-center">
                            {message}
                        </div>
                    ) : (
                        <>
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
                                        {errors.email && (
                                            <span className="font-main text-red-600">{errors.email.message}</span>
                                        )}
                                    </Flex>
                                )}
                            />
                            <Button
                                type="primary"
                                htmlType="submit"
                                danger
                                className="px-10 font-main py-6 flex justify-center items-center font-semibold text-base mt-10"
                                loading={signUpMutation.isPending}
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
};

export default SignUp;
