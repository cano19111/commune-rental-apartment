import React from 'react';
import { Button, message } from 'antd';
import icons from '@/utils/icons';

interface DropDownItemProps {
    value: {
        guest: number;
        room: number;
    };
    onChange: (newValue: { guest: number; room: number }) => void;
}

const DropDownItem: React.FC<DropDownItemProps> = ({ value, onChange }) => {
    const { BiMinus, AiOutlinePlus } = icons;

    const handleGuestChange = (amount: number) => {
        if (value.guest + amount < value.room) {
            message.error('The number of rooms cannot be less than the number of people');
            return;
        }
        onChange({ ...value, guest: Math.max(1, value.guest + amount) });
    };

    const handleRoomChange = (amount: number) => {
        onChange({
            ...value,
            room: Math.max(1, Math.min(value.guest, value.room + amount)),
        });
    };

    return (
        <div className="flex flex-col bg-white p-5 rounded-2xl shadow-card-md">
            <div className="flex items-center justify-between min-w-[220px] mt-3 px-3 border-b pb-3">
                <div className="flex font-main text-sm">Guest</div>
                <div className="flex items-center gap-3">
                    <Button
                        className="w-[30px] h-[30px] rounded-full border border-gray-900 flex items-center justify-center"
                        icon={<BiMinus />}
                        onClick={() => handleGuestChange(-1)}
                    />
                    <div className="font-main font-medium text-base w-[15px] flex items-center justify-center">
                        {value.guest || 1}
                    </div>
                    <Button
                        className="w-[30px] h-[30px] rounded-full border border-gray-900 flex items-center justify-center"
                        icon={<AiOutlinePlus />}
                        onClick={() => handleGuestChange(1)}
                    />
                </div>
            </div>
            <div className="flex items-center justify-between min-w-[220px] mt-3 px-3 pt-2">
                <div className="flex font-main text-sm">Rooms</div>
                <div className="flex items-center gap-3">
                    <Button
                        className="w-[30px] h-[30px] rounded-full border border-gray-900 flex items-center justify-center"
                        icon={<BiMinus />}
                        onClick={() => handleRoomChange(-1)}
                    />
                    <div className="font-main font-medium text-base w-[15px] flex items-center justify-center">
                        {value.room || 1}
                    </div>
                    <Button
                        className="w-[30px] h-[30px] rounded-full border border-gray-900 flex items-center justify-center"
                        icon={<AiOutlinePlus />}
                        onClick={() => handleRoomChange(1)}
                    />
                </div>
            </div>
        </div>
    );
};

export default DropDownItem;
