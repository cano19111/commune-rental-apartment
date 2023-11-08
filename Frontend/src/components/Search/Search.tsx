import React from 'react';
import { Button, Input, DatePicker, Dropdown } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import icons from '@/utils/icons';
import { DropDownItem } from '@/components';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

const Search: React.FC = () => {
    const { FaLocationDot } = icons;

    const onChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {};

    const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {};
    return (
        <div className="max-w-[900px] w-full min-h-[100px] bg-white rounded-3xl mt-[30px] flex justify-start items-center px-10 gap-5 flex-wrap py-10 lg:rounded-full lg: shadow-card-lg">
            <Input
                size="large"
                placeholder="Location"
                prefix={
                    <i className="mr-5">
                        <FaLocationDot />
                    </i>
                }
                className="rounded-full p-3 w-[200px]"
            />
            <DatePicker.RangePicker
                format="YYYY-MM-DD"
                onChange={onChange}
                onOk={onOk}
                className="font-main rounded-full px-5 py-3 min-w-[200px] max-w-[270px] "
                inputReadOnly={true}
                superNextIcon={null}
                superPrevIcon={null}
                placeholder={['Check in', 'Check out']}
                popupClassName="show-card-md rounded-full"
            />
            <Dropdown dropdownRender={() => <DropDownItem />} placement="bottomLeft" trigger="click">
                <Button className="font-main px-5 h-[50px] rounded-full">Number of guest</Button>
            </Dropdown>
            <Button
                className="font-main px-5 h-[50px] rounded-full flex-grow"
                danger
                type="primary"
                icon={<SearchOutlined />}
            >
                Search
            </Button>
        </div>
    );
};

export default Search;
