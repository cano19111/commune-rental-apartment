import React from 'react';
import { Button, message } from 'antd';
import icons from '@/utils/icons';

interface DropDownItemProps {
    guest: number;
    room: number;
    setGuest: React.Dispatch<React.SetStateAction<number>>;
    setRoom: React.Dispatch<React.SetStateAction<number>>;
}

const DropDownItem: React.FC<DropDownItemProps> = ({ guest, room, setGuest, setRoom }) => {
    const { BiMinus, AiOutlinePlus } = icons;

    const handleGuestChange = (amount: number) => {
        if (guest + amount < room) {
            message.error('The number of rooms cannot be less than the number of people');
            return;
        }
        setGuest((prevGuest) => Math.max(1, prevGuest + amount));
    };

    const handleRoomChange = (amount: number) => {
        setRoom((prevRoom) => Math.max(1, Math.min(guest, prevRoom + amount)));
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
                        {guest}
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
                        {room}
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
