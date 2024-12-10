"use client";
import { useState } from "react";
import { likePost, unlikePost } from "../api/postActions";

interface LikeButtonProps {
  postId: string;
  initialLiked: boolean;
  initialLikes: number;
}

function LikeButton({ postId, initialLiked, initialLikes }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    try {
      if (liked) {
        await unlikePost(postId);
        setLikes((prev) => prev - 1);
      } else {
        await likePost(postId);
        setLikes((prev) => prev + 1);
      }
      setLiked((prev) => !prev);
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return (
    <div className="flex items-center mt-4">
      <button
        onClick={handleLike}
        className={`px-3 py-1 rounded ${
          liked ? "bg-red-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {liked ? "Unlike" : "Like"}
      </button>
      <span className="ml-2">{likes} Likes</span>
    </div>
  );
}

export default LikeButton;
