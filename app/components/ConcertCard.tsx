"use client";
import Image from "next/image";
import { useState } from "react";
import { likePost, unlikePost } from "../api/postActions";
import Barcode from "../svg/Barcode.svg";
import Star from "../svg/Star.svg";
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
        className="h-52 bg-[#F3F0E8] flex w-full overflow-hidden relative hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        <div className="absolute right-[71px] -translate-x-1/2 -top-4 bg-[#020C11] w-6 h-6 rounded-full border-2 "></div>

        <div className="absolute right-[71px] -translate-x-1/2 -bottom-4 bg-[#020C11] w-6 h-6 rounded-full border-2 "></div>
        <div className="flex flex-grow">
          <div className="flex">
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
            <div className="pl-4 pt-4 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{post.artistBand}</h2>
                <h3 className="font-medium italic">
                  {post.tourName ? post.tourName : "Sunny Tour"}
                </h3>
              </div>
              <div className="my-1">
                <p>{post.venue ? post.venue : "Ullevi"}</p>
                <p>{post.location}</p>
                <p className="text-sm text-gray-500">{post.genre}</p>
              </div>
              {post.rating && (
                <div className="pb-2">
                  {Array.from({ length: post.rating }, (_, index) => (
                    <span key={index} className="inline-block">
                      <Star width={20} height={20} />
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Additional Content */}
          <div className="pt-2 pr-2 flex flex-col items-end justify-between flex-grow">
            <div className="pt-2">
              <span className="text-sm text-black">
                {new Date(post.showDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <p className="text-gray-700 mb-2 font-bold">
                {post.review && "Read review..."}
              </p>
            </div>
            <div className="pb-2">
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
          <div>
            <p className="text-center text-sm p-1 truncate">
              {post.username ? post.username : "Hemligt"}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Barcode />
            <span className="text-xs font-lacquer rotate-[270deg]">
              STAGE STORIES
            </span>
          </div>
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
