"use client";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import Barcode from "../svg/Barcode.svg";
import BarcodeSmall from "../svg/BarcodeSmall.svg";
import Star from "../svg/Star.svg";
import TopTracks from "../svg/TopTracks.svg";
import { Post } from "../types/dataTypes";
import LikeButton from "./LikeButton";
interface ConcertCardProps {
  post: Post;
  isProfile?: boolean;
}

function ConcertCard({ post, isProfile }: ConcertCardProps) {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  return (
    <div className="flex flex-col items-center lg:items-stretch ">
      {/* Card Content */}
      <div
        key={post.id}
        className="lg:h-52 w-2/3 bg-[#F3F0E8] flex flex-col lg:flex-row lg:w-full overflow-hidden relative md:hover:scale-105 md:transition-transform md:duration-300 md:ease-in-out"
      >
        <div className="absolute lg:right-[103px] lg:-translate-x-1/2 lg:-top-4 bg-[#020C11] w-6 h-6 rounded-full  "></div>
        <div
          className="absolute 
                lg:right-[103px] lg:-translate-x-1/2 lg:-bottom-4
                max-lg:bottom-16 max-lg:left-[510px] max-lg:-translate-x-8 max-lg:-translate-y-3
                bg-[#020C11] w-6 h-6 rounded-full"
        ></div>

        <div className="flex flex-col lg:flex-row flex-grow">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-44 flex-shrink-0">
              <Image
                src={post.image ? post.image : "/images/standin.jpg"}
                alt={post.artistBand}
                width={500}
                height={500}
                className="w-full lg:h-full h-72 object-cover object"
              />
            </div>
            <div className="lg:pl-4 lg:pt-4 flex flex-col lg:justify-between items-center lg:items-stretch text-center lg:text-left">
              <div>
                <h2 className="text-2xl font-semibold">{post.artistBand}</h2>
                <h3 className="font-medium italic">
                  {post.tourName ? post.tourName : "Sunny Tour"}
                </h3>
              </div>
              <div className="my-1">
                <p>{post.venue ? post.venue : "Ullevi"}</p>
                <p>{post.location}</p>
                <p className="text-sm text-gray-500 capitalize">{post.genre}</p>
              </div>
              {post.rating && (
                <div className="pb-2">
                  {Array.from({ length: post.rating }, (_, index) => (
                    <span key={index} className="inline-block p-[3px]">
                      <Star width={20} height={20} />
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="pt-2 pr-2 flex flex-col lg:items-end items-center justify-between flex-grow">
            <div className="pt-2">
              <span className="text-sm text-black lg:block hidden">
                {new Date(post.showDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <p className="text-gray-700 mb-2 font-bold">
                {post.review && "Read review..."}
              </p>
            </div>
            <div className="pb-2">
              {isProfile && post.topTracks && post.topTracks.length > 0 && (
                <div>
                  <TopTracks width={20} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:border-l-2 border-t-2 border-black lg:w-32 flex-shrink-0 flex flex-col">
          <div className="lg:block hidden">
            <p className="text-center text-sm p-1 truncate">
              {post.username ? post.username : "Hemligt"}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <div className="lg:block hidden">
              <Barcode />
            </div>
            <div className="lg:hidden block">
              <BarcodeSmall />
            </div>
            <div className="lg:pt-2 p-2">
              <span className="text-sm text-black lg:hidden block">
                {new Date(post.showDate).toLocaleDateString()}
              </span>
            </div>
            <span className="text-xs font-lacquer rotate-[270deg] hidden lg:block ">
              STAGE STORIES
            </span>
          </div>
          <div className="lg:hidden block">
            <p className="text-center text-sm p-1 truncate">
              {post.username ? post.username : "Hemligt"}
            </p>
          </div>
        </div>
      </div>

      {/* Like Button and Likes Count */}
      <div className="mt-2">
        <LikeButton
          postId={post.id || ""}
          initialLikes={post.likes || 0}
          isLiked={userId ? post.likesBy?.includes(userId) || false : false}
          userId={userId || null}
        />
      </div>
    </div>
  );
}

export default ConcertCard;
