import { DropDownItem } from '@/components';
import icons from '@/utils/icons';
import { Button, DatePicker, Dropdown, Image } from 'antd';
import React from 'react';

const ApartmentDetail: React.FC = () => {
    const { FaLocationDot } = icons;
    return (
        <div className="w-full flex justify-center h-screen font-main">
            <div className="max-w-main w-full">
                <div className="grid grid-cols-4 gap-2 mt-10 w-full rounded-sm overflow-hidden">
                    <div className="col-span-2 h-full">
                        <Image
                            preview={false}
                            src="https://a0.muscache.com/im/pictures/miso/Hosting-51733196/original/346278d9-0b86-48b5-a307-ff036ee4dcf7.jpeg?im_w=960"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Image
                            preview={false}
                            src="https://a0.muscache.com/im/pictures/miso/Hosting-51733196/original/346278d9-0b86-48b5-a307-ff036ee4dcf7.jpeg?im_w=960"
                        />
                        <Image
                            preview={false}
                            src="https://a0.muscache.com/im/pictures/miso/Hosting-51733196/original/346278d9-0b86-48b5-a307-ff036ee4dcf7.jpeg?im_w=960"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Image
                            preview={false}
                            src="https://a0.muscache.com/im/pictures/miso/Hosting-51733196/original/346278d9-0b86-48b5-a307-ff036ee4dcf7.jpeg?im_w=960"
                        />
                        <Image
                            preview={false}
                            src="https://a0.muscache.com/im/pictures/miso/Hosting-51733196/original/346278d9-0b86-48b5-a307-ff036ee4dcf7.jpeg?im_w=960"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-5 mt-5">
                    <div className="flex flex-col">
                        <div className="font-main mt-5 flex flex-col justify-center gap-2">
                            <div className="text-2xl">
                                Phòng riêng tại nhà nghỉ dưỡng tại Ildo 1(il)-dong, Jeju-si, Hàn Quốc
                            </div>
                            <div className="flex items-center gap-1 font-light text-sm font-main">
                                <FaLocationDot color="#1640D6" size={15} />
                                <p>Đường Huyền Trân Công Chúa, Da Lat, Vietnam</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 pt-7 flex-wrap">
                            <div className="px-5 py-3 border rounded-md border-gray-500">Free parking</div>
                            <div className="px-5 py-3 border rounded-md border-gray-500">Free parking</div>
                            <div className="px-5 py-3 border rounded-md border-gray-500">Free parking</div>
                            <div className="px-5 py-3 border rounded-md border-gray-500">Free parking</div>
                            <div className="px-5 py-3 border rounded-md border-gray-500">Free parking</div>
                            <div className="px-5 py-3 border rounded-md border-gray-500">Free parking</div>
                        </div>
                    </div>
                    <div className="p-7 shadow shadow-gray-400 rounded-xl sticky top-[90px]">
                        <div className="flex flex-col gap-3 items-center justify-center">
                            <div>400,000 VND/ đêm</div>
                            <div className="flex flex-col justify-center">
                                <DatePicker.RangePicker
                                    format="YYYY-MM-DD"
                                    className="font-main rounded-xl px-5 py-3 min-w-[200px] max-w-[270px] "
                                    inputReadOnly={true}
                                    superNextIcon={null}
                                    superPrevIcon={null}
                                    placeholder={['Check in', 'Check out']}
                                    popupClassName="show-card-md rounded-md"
                                />
                                <Dropdown
                                    dropdownRender={() => <DropDownItem />}
                                    placement="bottomLeft"
                                    trigger="click"
                                >
                                    <Button className="font-main px-5 h-[48px] rounded-xl">Number of guest</Button>
                                </Dropdown>
                                <Button className="rounded-xl bg-blue-500 h-[48px] font-main text-md mt-3">
                                    Booking
                                </Button>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex items-center justify-between">
                                    <span>400,000 VND/đêm</span>
                                    <span>400,000 VND</span>
                                </div>
                                <div>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApartmentDetail;
