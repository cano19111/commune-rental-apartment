import { Avatar } from 'antd';
import React from 'react';
const reviews = [
    {
        author: 'Dino',
        date: '5 days ago',
        avatar: 'https://a0.muscache.com/im/pictures/user/733bd3c4-4b23-45f7-9ab6-1dbdd7092dbc.jpg?im_w=240',
        comment:
            'Nice hotel, near the beach, friendly staff, an ideal place to stay, everything is fine, delicious, fresh food.',
    },
    {
        author: 'Alice',
        date: '1 week ago',
        avatar: 'https://a0.muscache.com/im/pictures/user/User-214181514/original/1259fee2-b9db-418c-b813-43219460da90.jpeg?im_w=240',
        comment:
            'Great experience! The room was clean, and the view from the balcony was breathtaking. I highly recommend this place.',
    },
    {
        author: 'Bob',
        date: '2 weeks ago',
        avatar: 'https://a0.muscache.com/im/pictures/user/733bd3c4-4b23-45f7-9ab6-1dbdd7092dbc.jpg?im_w=240',
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
                            <Avatar size={47} src={review.avatar} />
                            <div className="flex flex-col ml-2">
                                <span className="font-semibold text-md">{review.author}</span>
                                <span className="text-xs">{review.date}</span>
                            </div>
                        </div>
                        <div className="text-sm font-light">{review.comment}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
