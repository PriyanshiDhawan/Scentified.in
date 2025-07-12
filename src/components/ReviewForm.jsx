import React, { useState } from "react";
import { auth, db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import ReactStars from "react-rating-stars-component";

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to leave a review.");
      return;
    }

    const reviewRef = collection(db, "products", productId, "reviews");
    await addDoc(reviewRef, {
      uid: user.uid,
      displayName: user.displayName || "Anonymous",
      rating,
      comment,
      timestamp: serverTimestamp()
    });

    setRating(0);
    setComment("");
    onReviewSubmitted(); // refresh list
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border p-4 rounded-lg">
      <label className="block font-semibold mb-2">Leave a Rating:</label>
      <ReactStars count={5} onChange={setRating} size={28} activeColor="#ffd700" value={rating} />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded p-2 mt-2"
        rows={3}
        placeholder="Write your thoughts here..."
      />
      <button type="submit" className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
