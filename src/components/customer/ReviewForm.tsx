"use client";

import { useState } from "react";

interface Props {
  mealId: string;
  onSuccess?: () => void;
}

const ReviewForm = ({ mealId, onSuccess }: Props) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      alert("Please write a comment");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            mealId,
            rating,
            comment,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Review failed");
      }

      setComment("");
      onSuccess?.();
      alert("Review submitted successfully ⭐");
    } catch (error) {
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded p-4 mt-3 bg-gray-50">
      <p className="font-semibold mb-2">Leave a Review</p>

      {/* Rating */}
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => setRating(num)}
            className={`text-xl ${
              num <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        className="w-full border rounded p-2 mb-2"
        placeholder="Write your experience..."
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default ReviewForm;
