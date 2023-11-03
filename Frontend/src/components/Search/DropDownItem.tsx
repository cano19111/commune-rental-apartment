import icons from '@/utils/icons';
import { Button } from 'antd';
import React from 'react';

const DropDownItem: React.FC = () => {
    const { BiMinus, AiOutlinePlus } = icons;
    return (
        <div className="flex flex-col bg-white p-5 rounded-2xl shadow-card-md">
            <div className="flex items-center justify-between min-w-[220px] mt-3 px-3 border-b pb-3">
                <div className="flex font-main text-sm">Guest</div>
                <div className="flex items-center gap-3">
                    <Button
                        className="w-[30px] h-[30px] rounded-full border border-gray-900 flex items-center justify-center"
                        icon={<BiMinus />}
                    />
                    <span className="font-main font-medium text-base">1</span>
                    <Button
                        className="w-[30px] h-[30px] rounded-full border border-gray-900 flex items-center justify-center"
                        icon={<AiOutlinePlus />}
                    />
                </div>
            </div>
            <div className="flex items-center justify-between min-w-[220px] mt-3 px-3 pt-2">
                <div className="flex font-main text-sm">Rooms</div>
                <div className="flex items-center gap-3">
                    <Button
                        className="w-[30px] h-[30px] rounded-full border border-gray-900 flex items-center justify-center"
                        icon={<BiMinus />}
                    />
                    <span className="font-main font-medium text-base">1</span>
                    <Button
                        className="w-[30px] h-[30px] rounded-full border border-gray-900 flex items-center justify-center"
                        icon={<AiOutlinePlus />}
                    />
                </div>
            </div>
        </div>
    );
};

export default DropDownItem;
