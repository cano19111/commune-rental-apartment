import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { apiSetPassword } from '@/apis';
import { useParams } from 'react-router-dom';
import { KeyOutlined, LockOutlined } from '@ant-design/icons';

const SetPasswordPage: React.FC = () => {
    const { userId } = useParams();
    const setPasswordMutation = useMutation({
        mutationFn: apiSetPassword,
    });

    const onFinish = async (data: { password: string }) => {
        setPasswordMutation.mutate(
            { userId: userId, password: data.password },
            {
                onSuccess: (response) => {
                    if (response.success) {
                        notification.success({
                            message: 'Password set successfully!',
                        });
                    }
                },
            },
        );
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="p-10 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Set Your Password</h1>
                <p className="mb-6">Create a new password for your apartment booking account.</p>
                <Form name="setPasswordForm" onFinish={onFinish} className="w-full max-w-xs">
                    <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
                        <Input.Password size="large" prefix={<LockOutlined />} placeholder="Enter new password" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error('The two passwords that you entered do not match!'),
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password size="large" prefix={<KeyOutlined />} placeholder="Confirm new password" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={setPasswordMutation.isPending}
                            className="w-full bg-blue-500 hover:bg-blue-600"
                        >
                            Set Password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default SetPasswordPage;
