import React from 'react';
import background from '@/assets/background.jpg';
import { Search } from '@/components';

const Home: React.FC = () => {
    return (
        <div className="h-full">
            <div
                className="bg-cover bg-center relative h-[960px] w-screen"
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="absolute inset-0 flex items-center flex-col justify-center text-white px-[20px]">
                    <div className="text-[3rem] font-main font-semibold">Find Your Dream Home</div>
                    <div className="text-lg font-main font-semi">
                        From as low as 100,000 VND per night with limited time offer discounts
                    </div>
                    <Search />
                </div>
            </div>
        </div>
    );
};

export default Home;
