import React from 'react';
import background from '@/assets/background.avif';
import { Search } from '@/components';
import icons from '@/utils/icons';
const { IoHeartSharp, MdOutlineKeyboardArrowRight } = icons;

const Home: React.FC = () => {
    return (
        <div className="font-main flex items-center justify-center">
            <div className="max-w-main w-full">
                <div
                    className="h-[300px] w-full flex justify-center items-center rounded-3xl relative mt-3 bg-cover bg-center"
                    style={{ backgroundImage: `url(${background})` }}
                >
                    <div className="absolute inset-0 bg-black opacity-40 rounded-3xl"></div>
                    <div className="absolute inset-0 flex items-center flex-col justify-center text-white px-[20px]">
                        <div className="text-[3rem] font-main font-semibold">Booking your stay with Find House</div>
                        <div className="text-lg font-main font-semi">
                            From as low as 100,000 VND per night with limited time offer discounts
                        </div>
                    </div>
                    <div className="absolute -bottom-9 max-w-[960px] w-full">
                        <Search />
                    </div>
                </div>
                <div className="mt-[60px]">
                    <div className="text-xl mb-5">Popular destination</div>
                    <div className="grid h-[390px] grid-cols-4 grid-rows-5 gap-5">
                        <div className="col-span-1 row-span-5 relative cursor-pointer">
                            <img
                                src="https://benhvienquynhon.gov.vn/wp-content/uploads/2023/05/bai-tam-quy-nhon.jpg"
                                className="rounded-2xl object-cover w-full h-full"
                            />
                            <span className="absolute bottom-5 right-5 flex items-center justify-center box-border overflow-hidden outline-none cursor-default px-4 py-2 opacity-100 bg-white bg-opacity-70 rounded-full">
                                Quy nhon
                            </span>
                        </div>

                        <div className="col-span-1 row-span-3 relative cursor-pointer">
                            <img
                                src="https://dalat.tours/vi/wp-content/uploads/2019/01/dalat_tours3.jpg"
                                className="rounded-2xl object-cover w-full h-full"
                            />
                            <span className="absolute bottom-5 right-5 flex items-center justify-center box-border overflow-hidden outline-none cursor-default px-4 py-2 opacity-100 bg-white bg-opacity-70 rounded-full">
                                Da lat
                            </span>
                        </div>

                        <div className="col-span-1 row-span-5 relative cursor-pointer">
                            <img
                                src="https://nemtv.vn/wp-content/uploads/2019/03/cau-rong-da-nang-nemtv-03.jpg"
                                className="rounded-2xl object-cover w-full h-full"
                            />
                            <span className="absolute bottom-5 right-5 flex items-center justify-center box-border overflow-hidden outline-none cursor-default px-4 py-2 opacity-100 bg-white bg-opacity-70 rounded-full">
                                Da Nang
                            </span>
                        </div>

                        <div className="col-span-1 row-span-2 relative cursor-pointer">
                            <img
                                src="https://www.landmark81skyview.com/wp-content/uploads/2019/04/banner-day.png"
                                className="rounded-2xl object-cover w-full h-full"
                            />
                            <span className="absolute bottom-5 right-5 flex items-center justify-center box-border overflow-hidden outline-none cursor-default px-4 py-2 opacity-100 bg-white bg-opacity-70 rounded-full">
                                Ho Chi Minh
                            </span>
                        </div>
                        <div className="col-span-1 row-span-3 relative cursor-pointer">
                            <img
                                src="https://kienviet.net/wp-content/uploads/2020/12/Picture2.png"
                                className="rounded-2xl object-cover w-full h-full"
                            />
                            <span className="absolute bottom-5 right-5 flex items-center justify-center box-border overflow-hidden outline-none cursor-default px-4 py-2 opacity-100 bg-white bg-opacity-70 rounded-full">
                                Hoi An
                            </span>
                        </div>
                        <div className="col-span-1 row-span-2 relative cursor-pointer">
                            <img
                                src="https://static.vinwonders.com/production/nha-trang-o-dau-1.jpg"
                                className="rounded-2xl object-cover w-full h-full"
                            />
                            <span className="absolute bottom-5 right-5 flex items-center justify-center box-border overflow-hidden outline-none cursor-default px-4 py-2 opacity-100 bg-white bg-opacity-70 rounded-full">
                                Nha Trang
                            </span>
                        </div>
                    </div>
                </div>
                <div className="my-10">
                    <div className="text-lg">Hotels loved by guest</div>
                    <div className="flex items-center gap-5 mt-2">
                        <div className="w-[250px] h-[295px] flex flex-col items-start opacity-100 bg-white rounded-3xl shadow-card-sm p-2 cursor-pointer">
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwxM3x8aG90ZWwlMjByb29tfGVufDF8fHx8MTY2MzE3MDUyNA&ixlib=rb-1.2.1&q=80&w=1080"
                                    className="rounded-3xl h-[185px]"
                                />
                                <span className="cursor-inherit absolute top-2 left-2 px-4 py-1.5 bg-green-200 rounded-full shadow-none overflow-visible text-xs uppercase text-center tracking-normal leading-4 whitespace-nowrap opacity-100 visible text-green-500">
                                    9.6
                                </span>
                                <span className="absolute top-2 right-2 text-white flex justify-center items-center p-1 cursor-inherit overflow-hidden opacity-100 bg-opacity-50 bg-white rounded-full cursor-pointer">
                                    <IoHeartSharp size={18} />
                                </span>
                            </div>
                            <div className="mt-2 p-1">
                                <div className="text-lg">Hotel Norrebro</div>
                                <div className="text-sm font-light">Binh Dinh</div>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div className="text-md font-medium mt-1 p-1">600,000 VND/night</div>
                                <MdOutlineKeyboardArrowRight size={20} />
                            </div>
                        </div>
                        <div className="w-[250px] h-[295px] flex flex-col items-start opacity-100 bg-white rounded-3xl shadow-card-sm p-2 cursor-pointer">
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwxM3x8aG90ZWwlMjByb29tfGVufDF8fHx8MTY2MzE3MDUyNA&ixlib=rb-1.2.1&q=80&w=1080"
                                    className="rounded-3xl h-[185px]"
                                />
                                <span className="cursor-inherit absolute top-2 left-2 px-4 py-1.5 bg-green-200 rounded-full shadow-none overflow-visible text-xs uppercase text-center tracking-normal leading-4 whitespace-nowrap opacity-100 visible text-green-500">
                                    9.6
                                </span>
                                <span className="absolute top-2 right-2 text-white flex justify-center items-center p-1 cursor-inherit overflow-hidden opacity-100 bg-opacity-50 bg-white rounded-full cursor-pointer">
                                    <IoHeartSharp size={18} />
                                </span>
                            </div>
                            <div className="mt-2 p-1">
                                <div className="text-lg">Hotel Norrebro</div>
                                <div className="text-sm font-light">Binh Dinh</div>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div className="text-md font-medium mt-1 p-1">600,000 VND/night</div>
                                <MdOutlineKeyboardArrowRight size={20} />
                            </div>
                        </div>
                        <div className="w-[250px] h-[295px] flex flex-col items-start opacity-100 bg-white rounded-3xl shadow-card-sm p-2 cursor-pointer">
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwxM3x8aG90ZWwlMjByb29tfGVufDF8fHx8MTY2MzE3MDUyNA&ixlib=rb-1.2.1&q=80&w=1080"
                                    className="rounded-3xl h-[185px]"
                                />
                                <span className="cursor-inherit absolute top-2 left-2 px-4 py-1.5 bg-green-200 rounded-full shadow-none overflow-visible text-xs uppercase text-center tracking-normal leading-4 whitespace-nowrap opacity-100 visible text-green-500">
                                    9.6
                                </span>
                                <span className="absolute top-2 right-2 text-white flex justify-center items-center p-1 cursor-inherit overflow-hidden opacity-100 bg-opacity-50 bg-white rounded-full cursor-pointer">
                                    <IoHeartSharp size={18} />
                                </span>
                            </div>
                            <div className="mt-2 p-1">
                                <div className="text-lg">Hotel Norrebro</div>
                                <div className="text-sm font-light">Binh Dinh</div>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div className="text-md font-medium mt-1 p-1">600,000 VND/night</div>
                                <MdOutlineKeyboardArrowRight size={20} />
                            </div>
                        </div>
                        <div className="w-[250px] h-[295px] flex flex-col items-start opacity-100 bg-white rounded-3xl shadow-card-sm p-2 cursor-pointer">
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwxM3x8aG90ZWwlMjByb29tfGVufDF8fHx8MTY2MzE3MDUyNA&ixlib=rb-1.2.1&q=80&w=1080"
                                    className="rounded-3xl h-[185px]"
                                />
                                <span className="cursor-inherit absolute top-2 left-2 px-4 py-1.5 bg-green-200 rounded-full shadow-none overflow-visible text-xs uppercase text-center tracking-normal leading-4 whitespace-nowrap opacity-100 visible text-green-500">
                                    9.6
                                </span>
                                <span className="absolute top-2 right-2 text-white flex justify-center items-center p-1 cursor-inherit overflow-hidden opacity-100 bg-opacity-50 bg-white rounded-full cursor-pointer">
                                    <IoHeartSharp size={18} />
                                </span>
                            </div>
                            <div className="mt-2 p-1">
                                <div className="text-lg">Hotel Norrebro</div>
                                <div className="text-sm font-light">Binh Dinh</div>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div className="text-md font-medium mt-1 p-1">600,000 VND/night</div>
                                <MdOutlineKeyboardArrowRight size={20} />
                            </div>
                        </div>
                        <div className="w-[250px] h-[295px] flex flex-col items-start opacity-100 bg-white rounded-3xl shadow-card-sm p-2 cursor-pointer">
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwxM3x8aG90ZWwlMjByb29tfGVufDF8fHx8MTY2MzE3MDUyNA&ixlib=rb-1.2.1&q=80&w=1080"
                                    className="rounded-3xl h-[185px]"
                                />
                                <span className="cursor-inherit absolute top-2 left-2 px-4 py-1.5 bg-green-200 rounded-full shadow-none overflow-visible text-xs uppercase text-center tracking-normal leading-4 whitespace-nowrap opacity-100 visible text-green-500">
                                    9.6
                                </span>
                                <span className="absolute top-2 right-2 text-white flex justify-center items-center p-1 cursor-inherit overflow-hidden opacity-100 bg-opacity-50 bg-white rounded-full cursor-pointer">
                                    <IoHeartSharp size={18} />
                                </span>
                            </div>
                            <div className="mt-2 p-1">
                                <div className="text-lg">Hotel Norrebro</div>
                                <div className="text-sm font-light">Binh Dinh</div>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div className="text-md font-medium mt-1 p-1">600,000 VND/night</div>
                                <MdOutlineKeyboardArrowRight size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
