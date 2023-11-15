import React from 'react';
import loginImage from '@/assets/login.jpg';
import { Button, Flex, Input, Spin, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { apiLogin } from '@/apis';
import icons from '@/utils/icons';
import { useAuth } from '@/hooks';
import { signIn } from '@/contexts/auth/reduces';

type LoginData = {
    email: string;
    password: string;
};
const SignIn: React.FC = ({ setModalOpen }) => {
    const { FaRegUser, HiOutlineLockClosed, FcGoogle, SiFacebook } = icons;
    const { dispatch } = useAuth();
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const loginMutation = useMutation({ mutationFn: apiLogin });
    const handleLogin = (data: LoginData) => {
        loginMutation.mutate(data, {
            onSuccess: (data) => {
                if (data) {
                    if (data.success) {
                        const { accessToken, user } = data.data;
                        setModalOpen({ isOpen: false, activeTab: 'signin' });
                        dispatch(signIn({ accessToken: accessToken, user: user }));
                        message.success('Login successfully');
                        reset();
                    } else message.error(data?.message);
                } else {
                    message.error('Login failed');
                }
            },

            onError: () => {
                message.error('Login failed');
            },
        });
    };
    return (
        <>
            <Spin size="large" fullscreen={true} spinning={loginMutation.isPending}></Spin>
            <form onSubmit={handleSubmit(handleLogin)}>
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
                        <Controller
                            control={control}
                            name="password"
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            }}
                            render={({ field }) => (
                                <Flex vertical gap={5}>
                                    <Input.Password
                                        placeholder="Enter your password"
                                        className="px-5 py-3"
                                        {...field}
                                        status={errors.password && 'error'}
                                        prefix={
                                            <span className="mr-3">
                                                <HiOutlineLockClosed size={20} />
                                            </span>
                                        }
                                    />
                                    {errors.password && (
                                        <span className="font-main text-red-600">{errors.password.message}</span>
                                    )}
                                </Flex>
                            )}
                        />

                        <Button
                            type="primary"
                            htmlType="submit"
                            danger
                            disabled={loginMutation.isPending}
                            className="px-10 font-main py-6 flex justify-center items-center font-semibold text-base mt-10"
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default SignIn;
