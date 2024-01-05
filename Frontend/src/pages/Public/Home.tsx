import React from 'react';
import { motion } from 'framer-motion';
import background from '@/assets/background.avif';
import { Search } from '@/components';
import icons from '@/utils/icons';
import datlat from '@/assets/dalat.jpg';
import danang from '@/assets/danang.png';
import hochiminh from '@/assets/hochiminh.png';
import hoian from '@/assets/hoian.webp';
import nhatrang from '@/assets/nhatrang.jpg';
import quynhon from '@/assets/quynhon.jpg';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const { IoHeartSharp, MdOutlineKeyboardArrowRight } = icons;

const Home: React.FC = () => {
    const navigate = useNavigate();
    const isMobile = window.innerWidth <= 767;
    function navigateToListing(province: string) {
        const queryParams = new URLSearchParams({
            province: province,
            start_date: dayjs().format('YYYY-MM-DD'),
            end_date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
            number_of_guest: '1',
            room_number: '1',
        });
        const url = `/listing?${queryParams.toString()}`;
        navigate(url);
    }
    const fadeInVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="font-main flex items-center justify-center">
            <div className="max-w-main w-full px-3">
                <motion.div
                    className="md:h-[300px] w-full flex justify-center items-center rounded-3xl relative md:mt-3 bg-cover bg-center"
                    style={{ backgroundImage: isMobile ? '' : `url(${background})` }}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}
                    transition={{ type: 'spring' }}
                >
                    <div className="absolute inset-0 bg-black opacity-40 rounded-3xl md:block hidden"></div>
                    <div className="absolute inset-0 md:flex hidden items-center flex-col justify-center text-white px-[20px]">
                        <div className="text-[3rem] font-main font-semibold">Booking your stay with Find House</div>
                        <div className="text-lg font-main font-semi">
                            From as low as 100,000 VND per night with limited time offer discounts
                        </div>
                    </div>
                    <div className="md:absolute -bottom-9 max-w-[960px] w-full">
                        <Search />
                    </div>
                </motion.div>

                <div className="md:mt-[60px] mt-6">
                    <div className="text-xl mb-5 ml-2">Popular destination</div>
                    <div className="lg:grid lg:h-[390px] lg:grid-cols-4 lg:grid-rows-5 lg:gap-5 flex flex-col gap-5">
                        <div
                            className="lg:col-span-1 row-span-5 relative cursor-pointer overflow-hidden rounded-2xl"
                            onClick={() => navigateToListing('Quy nhơn, Bình Định')}
                        >
                            <img
                                src={quynhon}
                                className="rounded-2xl object-cover w-full h-full transition-transform duration-500 hover:scale-125"
                            />
                            <span className="absolute bottom-5 right-5 flex items-center justify-center box-border overflow-hidden outline-none select-none px-4 py-2 opacity-100 bg-white bg-opacity-70 rounded-full">
                                Quy nhon
                            </span>
                        </div>

                        <div
                            className="col-span-1 row-span-3 relative cursor-pointer overflow-hidden rounded-2xl"
                            onClick={() => navigateToListing('Đà Lạt, Lâm Đồng')}
                        >
                            <img
                                src={datlat}
                                className="rounded-2xl object-cover w-full h-full transition-transform duration-500 hover:scale-125"
                            />
                            <span className="absolute bottom-5 right-5 flex items-center justify-center box-border overflow-hidden outline-none select-none px-4 py-2 opacity-100 bg-white bg-opacity-70 rounded-full">
                                Da lat
                            </span>
                        </div>

                        <div
                            className="col-span-1 row-span-5 relative cursor-pointer overflow-hidden rounded-2xl"
                            onClick={() => navigateToListing('Đàa Nẵng')}
                        >
                            <img
                                src={danang}
                                className="rounded-2xl object-cover w-full h-full transition-transform duration-500 hover:scale-125"
                            />
                            <span className="absolute bottom-5 right-5 flex items-center justify-center box-border overflow-hidden outline-none select-none px-4 py-2 opacity-100 bg-white bg-opacity-70 rounded-full">
                                Da Nang
                            </span>
                        </div>

                        <div
                            className="col-span-1 row-span-2 relative cursor-pointer overflow-hidden rounded-2xl"
                            onClick={() => navigateToListing('Hồ Chí Minh')}
                        >
                            <img
                                src={hochiminh}
                                className="rounded-2xl object-cover w-full h-full transition-transform duration-500 hover:scale-125"
                            />
                            <span className="absolute bottom-5 right-5 flex items-center justify-center box-border overflow-hidden outline-none select-none px-4 py-2 opacity-100 bg-white bg-opacity-70 rounded-full">
                                Ho Chi Minh
                            </span>
                        </div>
                        <div
                            className="col-span-1 row-span-3 relative cursor-pointer overflow-hidden rounded-2xl"
                            onClick={() => navigateToListing('Hội An')}
                        >
                            <img
                                src={hoian}
                                className="rounded-2xl object-cover w-full h-full transition-transform duration-500 hover:scale-125"
                            />
                            <span className="absolute bottom-5 right-5 flex items-center justify-center box-border overflow-hidden outline-none select-none px-4 py-2 opacity-100 bg-white bg-opacity-70 rounded-full">
                                Hoi An
                            </span>
                        </div>
                        <div
                            className="col-span-1 row-span-2 relative cursor-pointer overflow-hidden rounded-2xl"
                            onClick={() => navigateToListing('Nha Trang')}
                        >
                            <img
                                src={nhatrang}
                                className="rounded-2xl object-cover w-full h-full transition-transform duration-500 hover:scale-125"
                            />
                            <span className="absolute bottom-5 right-5 flex items-center justify-center box-border overflow-hidden outline-none select-none px-4 py-2 opacity-100 bg-white bg-opacity-70 rounded-full">
                                Nha Trang
                            </span>
                        </div>
                    </div>
                </div>
                <div className="my-10">
                    <div className="text-lg">Hotels loved by guest</div>
                    <motion.div
                        className="flex items-center gap-5 mt-2 w-full overflow-x-auto"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInVariants}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <div className="lg:w-[250px] lg:h-[295px] w-[150px] flex flex-col items-start opacity-100 bg-white rounded-3xl shadow-card-sm p-2 cursor-pointer">
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwxM3x8aG90ZWwlMjByb29tfGVufDF8fHx8MTY2MzE3MDUyNA&ixlib=rb-1.2.1&q=80&w=1080"
                                    className="rounded-3xl lg:h-[185px]"
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
                        <div className="lg:w-[250px] lg:h-[295px] w-[150px] flex flex-col items-start opacity-100 bg-white rounded-3xl shadow-card-sm p-2 cursor-pointer">
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDUzMDJ8MHwxfHNlYXJjaHwxM3x8aG90ZWwlMjByb29tfGVufDF8fHx8MTY2MzE3MDUyNA&ixlib=rb-1.2.1&q=80&w=1080"
                                    className="rounded-3xl lg:h-[185px]"
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
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Home;
