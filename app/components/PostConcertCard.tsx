"use client";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";
import { likePost, unlikePost } from "../api/postActions";
import Barcode2 from "../svg/Barcode2.svg";
import Star from "../svg/Star.svg";

import { Post } from "../types/dataTypes";
interface ConcertCardProps {
  post: Post;
}

function PostConcertCard({ post }: ConcertCardProps) {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const [liked, setLiked] = useState(
    post.likesBy && userId ? post.likesBy.includes(userId) : false
  );
  const [likes, setLikes] = useState(post.likes || 0);

  const handleLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!userId) {
      console.error("User must be logged in to like a post.");
      return;
    }

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
    <div className="flex flex-col items-center">
      <div className="w-3/4">
        <p className="text-lg p-1 text-white">
          {post.username ? post.username : "Hemligt"}
        </p>
      </div>
      {/* Card Content */}
      <div
        key={post.id}
        className="h-80 w-3/4 bg-[#F3F0E8] flex overflow-hidden relative hover:scale-[1.02] transition-transform duration-300 ease-in-out"
      >
        <div className="absolute right-[186px] -translate-x-1/2 -top-5 bg-[#020C11] w-9 h-9 rounded-full  "></div>
        <div className="absolute right-[186px] -translate-x-1/2 -bottom-5 bg-[#020C11] w-9 h-9 rounded-full  "></div>

        <div className="flex flex-grow">
          {/* Image Section */}
          <div className="w-64 flex-shrink-0">
            <Image
              src={post.image ? post.image : "/images/standin.jpg"}
              alt={post.artistBand}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Section */}
          <div className="pt-3 flex flex-col items-center justify-center flex-grow text-center">
            <div>
              <h2 className="text-4xl font-semibold">{post.artistBand}</h2>
              <h3 className="font-semibold text-xl italic">
                {post.tourName ? post.tourName : "Sunny Tour"}
              </h3>
            </div>
            {post.rating && (
              <div className="pb-2">
                {Array.from({ length: post.rating }, (_, index) => (
                  <span key={index} className="inline-block p-1">
                    <Star width={20} height={20} alt={index} />
                  </span>
                ))}
              </div>
            )}
            <div>
              <p className="mb-2 px-3 py-1">{post.review}</p>
            </div>
            <div className="my-1 flex gap-4">
              <p>{post.venue}</p>
              <p>{post.location}</p>
              <p className=" capitalize">{post.genre}</p>
              <p className=" text-black">
                {new Date(post.showDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Barcode Section */}
        <div className="border-l-4 border-black w-56 flex-shrink-0 flex justify-between">
          <div className="flex-grow flex  items-center">
            <Barcode2 />
          </div>
          <div className="m-2 flex flex-col justify-between">
            {post.topTracks && post.topTracks.length > 0 && (
              <div className="pb-2">
                <h4 className="font-semibold mb-1">Top Tracks</h4>
                <ul className="list-disc">
                  {post.topTracks.map((track, index) => (
                    <li className="text-sm break-words" key={index}>
                      {track}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mb-3">
              <h4 className="font-semibold">Top emotions</h4>
              <ul className="list-disc">
                <li>😁</li>
                <li>👽</li>
                <li>💩</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Like Button */}
      <div className="w-3/4 mt-2 flex">
        <button
          onClick={(e) => handleLike(e)}
          className={`px-3 py-1 rounded ${
            liked ? "bg-red-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {liked ? "Unlike" : "Like"}
        </button>
        <span className="ml-2 text-white">{likes} Likes</span>
      </div>
    </div>
  );
}

export default PostConcertCard;
