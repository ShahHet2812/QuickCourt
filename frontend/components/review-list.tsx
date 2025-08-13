"use client";
import { useState, useEffect, useCallback } from "react";
import { Star, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewListProps {
  venueId: string;
  onReviewsUpdated: () => void;
}

export default function ReviewList({ venueId, onReviewsUpdated }: ReviewListProps) {
  const { user, token } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState("");
  const [editingRating, setEditingRating] = useState(0);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/venues/${venueId}/reviews`);
      if (!res.ok) {
        throw new Error("Failed to fetch reviews.");
      }
      const { data } = await res.json();
      setReviews(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [venueId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews, onReviewsUpdated]);

  const handleEdit = (review: Review) => {
    setEditingReviewId(review._id);
    setEditingComment(review.comment);
    setEditingRating(review.rating);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditingComment("");
    setEditingRating(0);
  };

  const handleUpdate = async (reviewId: string) => {
    try {
      // --- FIX: Corrected the fetch URL to include the venueId ---
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/venues/${venueId}/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: editingComment, rating: editingRating }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update review.");
      }
      onReviewsUpdated();
      handleCancelEdit();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      // --- FIX: Corrected the fetch URL to include the venueId ---
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/venues/${venueId}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        // If the response is not ok, try to parse it as JSON for an error message.
        // If that fails, it's likely an HTML error page, so we create a generic error.
        let errorData;
        try {
          errorData = await res.json();
        } catch (e) {
          throw new Error("Failed to delete review. Server returned a non-JSON response.");
        }
        throw new Error(errorData.error || "Failed to delete review.");
      }
      onReviewsUpdated();
    } catch (err: any) {
      setError(err.message);
    }
  };


  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <p className="text-gray-600 text-center">No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map((review) => (
          <Card key={review._id} className="shadow-sm">
            <CardContent className="p-6">
              {editingReviewId === review._id ? (
                <div>
                  <div className="flex items-center gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={28}
                        className={`cursor-pointer transition-colors ${
                          star <= editingRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => setEditingRating(star)}
                      />
                    ))}
                  </div>
                  <Textarea
                    value={editingComment}
                    onChange={(e) => setEditingComment(e.target.value)}
                    className="my-4"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={handleCancelEdit}>Cancel</Button>
                    <Button onClick={() => handleUpdate(review._id)}>Save</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar>
                        <AvatarImage
                          src={
                            review.user.avatar
                              ? `${process.env.NEXT_PUBLIC_API_URL}${review.user.avatar}`
                              : "/placeholder-user.jpg"
                          }
                          alt={`${review.user.firstName}'s avatar`}
                        />
                        <AvatarFallback>
                          {review.user.firstName[0]}
                          {review.user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">
                          {review.user.firstName} {review.user.lastName}
                        </h4>
                        <div className="flex items-center text-sm text-gray-500">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={
                                star <= review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    {user?._id === review.user._id && (
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" title="Edit Review" onClick={() => handleEdit(review)}>
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Delete Review"
                          onClick={() => handleDelete(review._id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}