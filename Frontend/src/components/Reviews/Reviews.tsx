import React from 'react';

interface Review {
    author: string;
    date: string;
    rating: number;
    title: string;
    content: string;
    positives: string[];
    negatives: string[];
}

interface RatingCategory {
    category: string;
    score: number;
}

const sampleReviews: Review[] = [
    {
        author: 'Mark M.',
        date: '20 September, 2022',
        rating: 10,
        title: 'Excellent value for the price!',
        content: 'We enjoyed our stay at this hotel. We will definitely come back!',
        positives: ['Great location!', 'Service', 'Bottle of champagne in the room!'],
        negatives: [],
    },
    {
        author: 'Karena L.',
        date: '10 September, 2022',
        rating: 5.6,
        title: 'Good hotel but noisy location',
        content: 'Had room facing the street and it was super noisy. Unfortunately, we couldn’t change room.',
        positives: [],
        negatives: ['Noise'],
    },
];

const ratingCategories: RatingCategory[] = [
    { category: 'Cleanliness', score: 10 },
    { category: 'Amenities', score: 7 },
    { category: 'Location', score: 9 },
    { category: 'Comfort', score: 8 },
    { category: 'WiFi Connection', score: 9 },
];

const overallRating = ratingCategories.reduce((acc, { score }) => acc + score, 0) / ratingCategories.length;

const getRatingColor = (rating: number): string => {
    if (rating >= 9) return 'bg-green-200 text-green-500';
    if (rating >= 7) return 'bg-yellow-200 text-yellow-500';
    return 'bg-red-200 text-red-500';
};

const Reviews: React.FC = () => {
    return (
        <div className="bg-white rounded-lg mb-10">
            <div className="mb-8">
                <h2 className="text-xl font-normal text-gray-800">Reviews</h2>
                <p className="text-xl font-normal text-blue-500">{overallRating.toFixed(1)}/10</p>
            </div>
            <div className="flex items-start gap-10">
                <div className="flex flex-col gap-1 w-1/4">
                    {ratingCategories.map((rating, index) => (
                        <div key={index} className="rounded-lg">
                            <p className="font-semibold text-gray-800">{rating.category}</p>
                            <div className="w-full bg-gray-300 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${getRatingColor(rating.score)}`}
                                    style={{ width: `${(rating.score / 10) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-right">{rating.score}/10</p>
                        </div>
                    ))}
                </div>
                <div className="w-3/4">
                    {sampleReviews.map((review, index) => (
                        <div
                            key={index}
                            className={`border-t pt-4 ${index < sampleReviews.length - 1 ? 'mb-4 border-none' : ''}`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="text-lg font-semibold">{review.title}</h3>
                                <div
                                    className={`w-12 py-1 rounded-full text-sm font-semibold flex items-center justify-center ${getRatingColor(
                                        review.rating,
                                    )}`}
                                >
                                    {review.rating}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">
                                {review.author} - {review.date}
                            </p>
                            <p className="mb-2">{review.content}</p>
                            <div className="flex flex-col">
                                {review.positives.map((positive, idx) => (
                                    <span key={idx} className="text-green-600 text-sm mr-2">
                                        + {positive}
                                    </span>
                                ))}
                                {review.negatives.map((negative, idx) => (
                                    <span key={idx} className="text-red-600 text-sm mr-2">
                                        - {negative}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
