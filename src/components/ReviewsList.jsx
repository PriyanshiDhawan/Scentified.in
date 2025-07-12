import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import ReactStars from "react-rating-stars-component";

const ReviewsList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const q = query(
      collection(db, "products", productId, "reviews"),
      orderBy("timestamp", "desc")
    );
    const snapshot = await getDocs(q);
    setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3">Customer Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map(review => (
          <div key={review.id} className="border-b py-3">
            <div className="flex justify-between">
              <strong>{review.displayName}</strong>
              <ReactStars count={5} value={review.rating} size={20} edit={false} activeColor="#ffd700" />
            </div>
            <p className="text-gray-700 mt-1">{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsList;
