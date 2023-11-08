import { Input, Select, InputNumber, Switch, Upload, Modal, Flex } from 'antd';
import React, { useState } from 'react';
import type { SelectProps } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';

const AddRoom: React.FC = () => {
    const options: SelectProps['options'] = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];

    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image1.png',
            status: 'done',
            url: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg',
        },
    ]);

    const handleCancel = () => setPreviewOpen(false);

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="mt-2">Upload</div>
        </div>
    );
    return (
        <div>
            <h2 className="text-xl font-medium mb-5">Add room</h2>
            <div className="p-5 rounded-xl flex flex-col gap-5 border border-gray-700">
                <div className="flex flex-col">
                    <label className="text-lg mb-2">Services</label>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        options={options}
                        size="large"
                        className="rounded-xl"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-lg mb-2">Description</label>
                    <Input.TextArea size="large" className="p-2 rounded-xl" placeholder="Enter the description" />
                </div>
                <Flex gap={10} align="center">
                    <div className="flex flex-col">
                        <label className="text-lg mb-2">Size room</label>
                        <InputNumber className="w-full p-2 rounded-xl" size="large" placeholder="Enter the size" />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-lg mb-2">Price</label>
                        <InputNumber
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                            className="w-full p-2 rounded-xl"
                            size="large"
                            placeholder="Enter the price"
                        />
                    </div>
                </Flex>

                <div className="flex flex-col">
                    <label className="text-lg mb-2">Image</label>
                    <div className="flex items-center gap-3">
                        <Upload
                            listType="picture-card"
                            customRequest={() => null}
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img alt="example" className="w-full" src={previewImage} />
                        </Modal>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="text-lg mb-2">Room type</label>
                    <Input size="large" className="p-2 rounded-xl" placeholder="Enter the title" />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg mb-2">Number of guests</label>
                    <InputNumber className="w-full p-2 rounded-xl" size="large" placeholder="Enter the size" />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg mb-2">Quantity</label>
                    <InputNumber defaultValue={1} className="max-w-[50px] min-w-[200px]" />
                </div>
            </div>
        </div>
    );
};

export default AddRoom;
