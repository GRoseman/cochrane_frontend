import React from 'react';
import ReviewItem from './ReviewItem';

function ReviewList({ reviews }) {
  return (
    <div className='reviews-container'>
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </div>
  );
}

export default ReviewList;