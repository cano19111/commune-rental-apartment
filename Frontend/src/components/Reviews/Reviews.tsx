import { Avatar } from 'antd';
import React from 'react';
const reviews = [
    {
        author: 'Dino',
        date: '5 days ago',
        comment:
            'Nice hotel, near the beach, friendly staff, an ideal place to stay, everything is fine, delicious, fresh food.',
    },
    {
        author: 'Alice',
        date: '1 week ago',
        comment:
            'Great experience! The room was clean, and the view from the balcony was breathtaking. I highly recommend this place.',
    },
    {
        author: 'Bob',
        date: '2 weeks ago',
        comment:
            'Amazing hospitality! The staff went above and beyond to make our stay memorable. Will definitely come back.',
    },
];
const Reviews: React.FC = () => {
    return (
        <div className="flex flex-col gap-4 mb-5">
            <h3 className="text-2xl font-semibold mb-2">Guest Reviews</h3>
            <div className="flex items-center">
                <span className="p-2 text-md font-semibold bg-blue-500 text-white rounded-md mr-2">9.5</span>
                <span className="text-sm">5 reviews</span>
            </div>
            <div className="flex flex-wrap justify-between">
                {reviews.map((review, index) => (
                    <div key={index} className="flex flex-col w-full md:w-[calc(50%-30px)] px-2 mb-4">
                        <div className="flex items-center mb-2">
                            <Avatar />
                            <div className="flex flex-col ml-2">
                                <span className="font-semibold">{review.author}</span>
                                <span className="text-xs">{review.date}</span>
                            </div>
                        </div>
                        <div className="text-sm">{review.comment}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
