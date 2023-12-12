import { Flex, Input, InputNumber } from 'antd';
import React from 'react';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';

interface InputFormProps {
    control: any;
    error?: any;
    name: string;
    rules?: object;
    placeholder: string;
    type?: string;
    label: string;
    className?: string;
    rows?: number;
    propsOther?: any;
    formatter?: (value: string) => string;
    parser?: (value: string) => string;
}

const InputForm: React.FC<InputFormProps> = ({
    control,
    error,
    name,
    rules,
    type = 'text',
    label,
    placeholder,
    className,
    ...propsOther
}) => {
    const InputComponent = type === 'number' ? InputNumber : type === 'area' ? Input.TextArea : Input;
    return (
        <div className="flex flex-col">
            <label className="text-lg mb-1">
                <span className="text-red-500">* </span>
                {label}
            </label>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field }) => (
                    <Flex vertical gap={5}>
                        <InputComponent
                            {...propsOther}
                            className={clsx('font-main', className)}
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
