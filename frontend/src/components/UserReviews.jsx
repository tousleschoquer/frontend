import React from 'react';


const UserReviews = ({ reviews }) => {
  return (
    <div className="user-reviews">
      <h2>Commentaires des utilisateurs</h2>
      <div className="review-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            <div className="review-header">
              <strong className="review-header-text">Utilisateur:</strong> {review.user}
            </div>
            <div className="review-content">
              <div className="review-text">
                <strong className="review-text-label">Commentaire:</strong> {review.review}
              </div>
              <div className="review-stars">
                <span className="review-rating">{review.rating}/5</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
