import { Flex, Select } from 'antd';
import React from 'react';
import clsx from 'clsx';

const SelectForm: React.FC = ({
    Controller,
    control,
    error,
    name,
    rules,
    label,
    placeholder,
    options,
    className,
    defaultValue,
    onChangeSelected,
    ...propsOther
}: any) => {
    return (
        <div className="flex flex-col w-full">
            <label className="text-lg mb-2">
                <span className="text-red-500">* </span>
                {label}
            </label>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, onBlur, value, ref } }: any) => (
                    <Flex vertical gap={5}>
                        <Select
                            {...propsOther}
                            size="medium"
                            options={options}
                            className={clsx(className)}
                            placeholder={placeholder}
                            onChange={(value) => {
                                onChange(value);
                                onChangeSelected && onChangeSelected(value);
                            }}
                            onBlur={onBlur}
                            value={value}
                            ref={ref}
                            status={error && 'error'}
                        />
                        {error && <span className="font-main text-red-600">{error.message}</span>}
                    </Flex>
                )}
            />
        </div>
    );
};

export default SelectForm;
