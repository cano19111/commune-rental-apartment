import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Input, InputNumber } from 'antd';
import clsx from 'clsx';

interface InputFormProps {
    control: Control<any>;
    name: string;
    rules?: object;
    placeholder: string;
    type?: 'text' | 'number' | 'area';
    label: string;
    className?: string;
    rows?: number;
    addonAfter?: string;
    formatter?: (value: string) => string;
    parser?: (value: string) => string;
}

const InputForm: React.FC<InputFormProps> = ({
    control,
    name,
    rules,
    type = 'text',
    label,
    placeholder,
    className,
    rows,
    formatter,
    parser,
    addonAfter,
}) => {
    let InputComponent;

    switch (type) {
        case 'number':
            InputComponent = InputNumber;
            break;
        case 'area':
            InputComponent = Input.TextArea;
            break;
        default:
            InputComponent = Input;
    }

    return (
        <div className="flex flex-col font-main">
            <label className="text-md mb-1">
                <span className="text-red-500">* </span>
                {label}
            </label>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <div className="flex flex-col gap-2">
                        <InputComponent
                            rows={rows}
                            formatter={formatter}
                            parser={parser}
                            {...field}
                            className={clsx('font-main', className)}
                            placeholder={placeholder}
                            status={error ? 'error' : ''}
                            addonAfter={addonAfter}
                        />
                        {error && <span className="text-red-600">{error.message}</span>}
                    </div>
                )}
            />
        </div>
    );
};

export default InputForm;
