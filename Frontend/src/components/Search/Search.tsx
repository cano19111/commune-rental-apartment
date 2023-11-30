import React, { useState } from 'react';
import { Button, Input, DatePicker, Dropdown } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import icons from '@/utils/icons';
import { DropDownItem } from '@/components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router v6

const Search: React.FC = () => {
    const { PiUserThin } = icons;
    const [numberOfGuest, setMumberOfGuest] = useState(1);
    const [rooms, setRooms] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [dateRange, setDateRange] = useState<[string, string] | null>(null);
    const navigate = useNavigate();

    const handleSearch = () => {
        const queryParams = new URLSearchParams({
            numberOfGuest: numberOfGuest.toString(),
            room: rooms.toString(),
            province: searchText,
            //startDate: dateRange ? dateRange[0] : '',
            //endDate: dateRange ? dateRange[1] : '',
        });
        navigate(`/listing?${queryParams.toString()}`);
    };

    const onChange = (value, dateString: [string, string]) => {
        setDateRange(dateString);
    };

    return (
        <div className="max-w-[920px] w-full min-h-[100px] bg-white rounded-3xl mt-[30px] flex justify-start items-center px-10 gap-5 flex-wrap py-10 lg:rounded-full lg:shadow-card-lg">
            <Input
                size="large"
                placeholder="Search"
                className="rounded-full py-3 px-5 w-[200px]"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <DatePicker.RangePicker
                format="YYYY-MM-DD"
                onChange={onChange}
                className="font-main rounded-full px-5 py-3 min-w-[200px] max-w-[270px] "
                inputReadOnly={true}
                superNextIcon={null}
                superPrevIcon={null}
                placeholder={['Check in', 'Check out']}
                popupClassName="show-card-md rounded-full"
            />
            <Dropdown
                dropdownRender={() => (
                    <DropDownItem guest={numberOfGuest} room={rooms} setGuest={setMumberOfGuest} setRoom={setRooms} />
                )}
                placement="bottomLeft"
                trigger="click"
            >
                <Button className="font-main px-5 h-[50px] rounded-full flex items-center gap-1 justify-center">
                    <PiUserThin size={25} />
                    <span className="">{`${numberOfGuest} adult · ${rooms} room`}</span>
                </Button>
            </Dropdown>
            <Button
                className="font-main px-5 h-[50px] rounded-full flex-grow"
                danger
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
            >
                Search
            </Button>
        </div>
    );
};

export default Search;
