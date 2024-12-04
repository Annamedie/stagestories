"use client";
import Image from "next/image";
import { useState } from "react";
import { likePost, unlikePost } from "../api/postActions";
import Barcode from "../svg/Barcode.svg";
import TopTracks from "../svg/TopTracks.svg";
import { Post } from "../types/dataTypes";
interface ConcertCardProps {
  post: Post;
  isProfile?: boolean;
}

function ConcertCard({ post, isProfile }: ConcertCardProps) {
  const [liked, setLiked] = useState(post.likesBy?.includes("userId"));
  const [likes, setLikes] = useState(post.likes || 0);

  const handleLike = async (event) => {
    event.stopPropagation();

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
    <>
      <div
        key={post.id}
        className="border min-h-52 shadow-md bg-[#F3F0E8] flex w-full"
      >
        {/* Left Section (Image and Content) */}
        <div className="flex flex-grow">
          {/* Image and Content Wrapper */}
          <div className="flex">
            {/* Image */}
            <div className="w-44 flex-shrink-0">
              <Image
                src={post.image ? post.image : "/images/standin.jpg"}
                alt={post.artistBand}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Content */}
            <div className="pl-2 pt-2">
              <div>
                <h2 className="text-xl font-semibold">{post.artistBand}</h2>
                <h3>{post.tourName ? post.tourName : "Sunny Tour"}</h3>
              </div>
              <span>{post.venue ? post.venue : "Ullevi"}</span>
              <p>{post.location}</p>
              <p className="text-sm text-gray-500">{post.genre}</p>
              <p className="text-sm text-gray-500">{post.rating}/5</p>
            </div>
          </div>
          {/* Additional Content */}
          <div className="pt-2 pr-2 flex flex-col items-end justify-between flex-grow">
            <div>
              <span className="text-sm text-black">
                {new Date(post.showDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <p className="text-gray-700 mb-2">
                {post.review
                  ? post.review
                  : "detta är en review allt är bra och solen skiner blablabla"}
              </p>
            </div>
            <div>
              <TopTracks width={20} />
              {isProfile && post.topTracks && post.topTracks.length > 0 && (
                <div>
                  <TopTracks width={20} />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Username and Barcode Section */}
        <div className="border-l-2 border-black w-24 flex-shrink-0 flex flex-col">
          <h2>{post.username ? post.username : "Hemligt"}</h2>
          <Barcode />
        </div>
      </div>

      {/* Like Button and Likes Count */}
      <div className="flex items-center mt-2">
        <button
          onClick={(e) => handleLike(e)}
          className={`px-3 py-1 rounded ${
            liked ? "bg-red-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {liked ? "Unlike" : "Like"}
        </button>
        <span className="ml-2">{likes} Likes</span>
      </div>
    </>
  );
}

export default ConcertCard;
