"use client";
import Image from "next/image";
import { useState } from "react";
import { likePost, unlikePost } from "../api/postActions";
import { Post } from "../types/dataTypes";
interface ConcertCardProps {
  post: Post;
}

function ConcertCard({ post }: ConcertCardProps) {
  const [liked, setLiked] = useState(post.likesBy?.includes("userId"));
  const [likes, setLikes] = useState(post.likes || 0);

  const handleLike = async () => {
    try {
      if (liked) {
        await unlikePost(post.id);
        setLikes((prev) => prev - 1);
      } else {
        await likePost(post.id);
        setLikes((prev) => prev + 1);
      }
      setLiked((prev) => !prev);
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return (
    <div key={post.id} className="border rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <Image
          src={post.image ? post.image : "/images/standin.jpg"}
          alt={post.artistBand}
          width={100}
          height={100}
          className="rounded-full"
        />
        <h2 className="text-xl font-semibold">{post.artistBand}</h2>
        <span className="text-sm text-gray-500">{post.rating}/5</span>
      </div>
      <p className="text-gray-700 mb-2">{post.review}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm">
          {post.venue} - {post.location}
        </span>
        <span className="text-sm text-gray-500">
          {new Date(post.showDate).toLocaleDateString()}
        </span>
      </div>
      <button
        onClick={handleLike}
        className={`px-3 py-1 rounded ${
          liked ? "bg-red-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {liked ? "Unlike" : "Like"}
      </button>
      <span>{likes} Likes</span>
    </div>
  );
}

export default ConcertCard;
