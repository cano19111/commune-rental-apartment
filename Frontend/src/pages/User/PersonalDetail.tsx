import React, { useState } from 'react';
import { Avatar, Button, Input } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';

const sampleData = {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '1234567890',
    email: 'john.doe@example.com',
    avatar: 'https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg',
};

const PersonalDetailDisplay: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="w-full">
            <h2 className="font-semibold text-3xl mb-4 text-center">Personal information</h2>
            <div className="w-full my-4 flex items-center justify-center">
                <Avatar size={100} src={sampleData.avatar} icon={<UserOutlined />} />
            </div>
            <table className="w-full">
                <tbody>
                    <tr className="border-t border-b border-gray-300">
                        <td className="flex items-center gap-20">
                            {isEditing ? (
                                <div className="flex gap-5 items-center">
                                    <span>First name :</span>
                                    <Input />
                                </div>
                            ) : (
                                <div className="flex gap-5 items-center">
                                    <span>First name :</span>
                                    <span className="py-6 text-lg font-medium">{sampleData.firstName}</span>
                                </div>
                            )}
                        </td>
                        <td>
                            {isEditing ? (
                                <div className="flex gap-5 items-center">
                                    <span>Last name :</span>
                                    <Input />
                                </div>
                            ) : (
                                <div className="flex gap-5 items-center">
                                    <span>Last name :</span>
                                    <span className="py-6 text-lg font-medium">{sampleData.lastName}</span>
                                </div>
                            )}
                        </td>
                    </tr>
                    <tr className="border-t border-b border-gray-300"></tr>
                    <tr className="border-t border-b border-gray-300">
                        <td className="py-6 pr-4">Email address :</td>
                        {isEditing ? (
                            <td>
                                <Input />
                            </td>
                        ) : (
                            <td className="py-6 text-xl">{sampleData.email}</td>
                        )}
                    </tr>
                    <tr className="border-t border-b border-gray-300">
                        <td className="py-6 pr-4">Phone number :</td>
                        {isEditing ? (
                            <td>
                                <Input />
                            </td>
                        ) : (
                            <td className="py-6 text-xl">{sampleData.phoneNumber}</td>
                        )}
                    </tr>
                    <tr className="border-t border-b border-gray-300">
                        <td className="py-6 pr-4">Date of birth :</td>
                        {isEditing ? (
                            <td>
                                <Input />
                            </td>
                        ) : (
                            <td className="py-6 text-xl">{sampleData.email}</td>
                        )}
                    </tr>
                    <tr className="border-t border-b border-gray-300">
                        <td className="py-6 pr-4">Nationality :</td>
                        {isEditing ? (
                            <td>
                                <Input />
                            </td>
                        ) : (
                            <td className="py-6 text-xl">{sampleData.email}</td>
                        )}
                    </tr>
                    <tr className="border-t border-b border-gray-300">
                        <td className="py-6 pr-4">Gender :</td>
                        {isEditing ? (
                            <td>
                                <Input />
                            </td>
                        ) : (
                            <td className="py-6 text-xl">{sampleData.email}</td>
                        )}
                    </tr>
                    <tr className="border-t border-b border-gray-300">
                        <td className="py-6 pr-4">Address :</td>
                        {isEditing ? (
                            <td>
                                <Input />
                            </td>
                        ) : (
                            <td className="py-6 text-xl">{sampleData.email}</td>
                        )}
                    </tr>
                    <tr className="border-t border-b border-gray-300">
                        <td className="py-6 pr-4">Passport details :</td>
                        {isEditing ? (
                            <td>
                                <Input />
                            </td>
                        ) : (
                            <td className="py-6 text-xl">{sampleData.email}</td>
                        )}
                    </tr>
                </tbody>
            </table>
            {isEditing ? (
                <Button className="bg-green-300" size="large" onClick={() => setIsEditing(false)}>
                    Save
                </Button>
            ) : (
                <Button
                    type="primary"
                    size="large"
                    icon={<EditOutlined />}
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500"
                >
                    Edit
                </Button>
            )}
        </div>
    );
};

export default PersonalDetailDisplay;
