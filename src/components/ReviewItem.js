import React from 'react';

function ReviewItem({ review }) {
  return (
    <div className="review-item">
      <h2 className="review-title">
        <a href={review.url} target="_blank" rel="noopener noreferrer">
          {review.title}
        </a>
      </h2>
      <p className="review-authors">{review.author}</p>
      <p className="review-date">{review.date}</p>
    </div>
  );
}

export default ReviewItem;