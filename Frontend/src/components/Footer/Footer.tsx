import icons from '@/utils/icons';
import { Button, Flex, Input } from 'antd';
import React from 'react';

const Footer: React.FC = () => {
    const {
        FaFacebookF,
        AiOutlineTwitter,
        AiOutlineGoogle,
        BsPinterest,
        AiOutlineInstagram,
        MdOutlineKeyboardArrowRight,
    } = icons;
    return (
        <footer className="min-h-[370px] bg-midnight-blue w-full flex items-center justify-center p-10 ">
            <div className="max-w-main w-full flex items-start text-white flex-wrap gap-5 min-w-[240px]">
                <div className="flex flex-col gap-[20px] justify-center flex-1">
                    <div className="font-semibold font-main text-xl">About Site</div>
                    <div className="font-main text-sm font-light text-midnight-blue-500 leading-7">
                        We’re reimagining how you buy, sell and rent. It’s now easier to get into a place you love. So
                        let’s do this, together
                    </div>
                </div>
                <div className="flex flex-col gap-[15px] justify-center flex-1 min-w-[240px] md:ml-[70px]">
                    <div className="font-semibold font-main text-xl">Quick Links</div>
                    <div className="font-main text-sm font-light text-midnight-blue-500 flex justify-center items-start flex-col gap-3">
                        <span className="transition ease-in-out hover:translate-x-5 hover:text-white cursor-pointer duration-300">
                            About Us
                        </span>
                        <span className="transition ease-in-out hover:translate-x-5 hover:text-white cursor-pointer duration-300">
                            Terms & Conditions
                        </span>
                        <span className="transition ease-in-out hover:translate-x-5 hover:text-white cursor-pointer duration-300">
                            User’s Guide
                        </span>
                        <span className="transition ease-in-out hover:translate-x-5 hover:text-white cursor-pointer duration-300">
                            Support Center
                        </span>
                        <span className="transition ease-in-out hover:translate-x-5 hover:text-white cursor-pointer duration-300">
                            Press Info
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-[15px] justify-center flex-1 min-w-[240px]">
                    <div className="font-semibold font-main text-xl">Contact Us</div>
                    <div className="font-main text-sm font-light text-midnight-blue-500 flex justify-center items-start flex-col gap-3">
                        <span className="transition ease-in-out hover:translate-x-5 hover:text-white cursor-pointer duration-300">
                            info@findhouse.com
                        </span>
                        <span className="transition ease-in-out hover:translate-x-5 hover:text-white cursor-pointer duration-300">
                            Collins Street West, Victoria
                        </span>
                        <span className="transition ease-in-out hover:translate-x-5 hover:text-white cursor-pointer duration-300">
                            8007, Australia.
                        </span>
                        <span className="transition ease-in-out hover:translate-x-5 hover:text-white cursor-pointer duration-300">
                            +1 246-345-0699
                        </span>
                        <span className="transition ease-in-out hover:translate-x-5 hover:text-white cursor-pointer duration-300">
                            +1 246-345-0695
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-[15px] justify-center flex-1 min-w-[240px]">
                    <div className="font-semibold font-main text-xl">Follow us</div>
                    <div className="font-main text-sm font-light text-midnight-blue-500 flex justify-center items-start flex-col gap-3">
                        <Flex gap={20}>
                            <FaFacebookF size={18} />
                            <AiOutlineTwitter size={22} />
                            <AiOutlineInstagram size={22} />
                            <BsPinterest size={18} />
                            <AiOutlineGoogle size={22} />
                        </Flex>
                    </div>
                    <div className="font-semibold font-main text-xl">Subscribe</div>
                    <Flex align="center" gap={10}>
                        <Input
                            placeholder="Your email"
                            className="flex items-center justify-center py-3 px-5 rounded-full w-[200px]"
                        />
                        <Button
                            icon={<MdOutlineKeyboardArrowRight size={20} color="#fff" />}
                            shape="circle"
                            className="flex items-center justify-center"
                            size="large"
                        />
                    </Flex>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
