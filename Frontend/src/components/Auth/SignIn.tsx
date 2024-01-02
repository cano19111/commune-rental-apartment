import React from 'react';
import loginImage from '@/assets/login.jpg';
import { Button, Flex, Input, Spin, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { apiLogin } from '@/apis';
import icons from '@/utils/icons';
import { useAuth } from '@/hooks';
import { signIn } from '@/contexts/auth/reduces';
import ButtonSignIn from './ButtonSignIn';

interface SignInProps {
    setModalOpen: React.Dispatch<React.SetStateAction<{ isOpen: boolean; activeTab: string }>>;
}
const SignIn: React.FC<SignInProps> = ({ setModalOpen }) => {
    const { FaRegUser, HiOutlineLockClosed } = icons;
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
    const handleLogin = (data: ReqSignIn) => {
        loginMutation.mutate(data, {
            onSuccess: (response) => {
                if (response.success) {
                    const { accessToken, user } = response.data || {};
                    setModalOpen({ isOpen: false, activeTab: 'signin' });
                    dispatch(signIn({ accessToken, user }));
                    message.success('Login successfully');
                    reset();
                    window.location.reload();
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
                        <ButtonSignIn />
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
