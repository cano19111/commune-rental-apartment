import { Flex, Input, InputNumber } from 'antd';
import React from 'react';
import clsx from 'clsx';

const InputForm: React.FC = ({
    Controller,
    control,
    error,
    name,
    rules,
    type = 'text',
    label,
    placeholder,
    className,
    ...propsOther
}: any) => {
    let InputComponent = Input;
    if (type === 'number') {
        InputComponent = InputNumber;
    }
    if (type === 'area') {
        InputComponent = Input.TextArea;
    }
    return (
        <div className="flex flex-col">
            <label className="text-lg mb-2">{label}</label>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field }: any) => (
                    <Flex vertical gap={5}>
                        <InputComponent
                            {...propsOther}
                            size="large"
                            className={clsx(
                                'p-2 rounded-xl border border-gray-500 focus:outline-none focus:border-blue-500 text-lg',
                                className,
                            )}
                            placeholder={placeholder}
                            {...field}
                            status={error && 'error'}
                        />
                        {error && <span className="font-main text-red-600">{error.message}</span>}
                    </Flex>
                )}
            />
        </div>
    );
};

export default InputForm;
