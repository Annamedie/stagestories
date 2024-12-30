"use client";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import Barcode from "../svg/Barcode.svg";
import BarcodeSmall from "../svg/BarcodeSmall.svg";
import Star from "../svg/Star.svg";
import TopTracks from "../svg/TopTracks.svg";
import { Post } from "../types/dataTypes";
import CommentCounter from "./CommentCounter";
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
      <article
        key={post.id}
        className="xl:h-52 lg:h-60 w-2/3  bg-[#F3F0E8] flex flex-col lg:flex-row lg:w-full  relative lg:hover:scale-105 md:transition-transform md:duration-300 md:ease-in-out"
      >
        <div className=" hidden md:block absolute lg:right-[103px] lg:-translate-x-1/2 lg:-top-4 bg-[#020C11] w-6 h-6 rounded-full max-lg:bottom-[84px] max-lg:-translate-y-5 max-lg:-translate-x-3 over"></div>
        <div
          className=" hidden md:block absolute 
                lg:right-[103px] lg:-translate-x-1/2 lg:-bottom-8 
                bottom-[84px] -translate-y-5 translate-x-[480px]
                bg-[#020C11] w-6 h-6 rounded-full"
        ></div>

        <div className="flex flex-col lg:flex-row flex-grow">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-44 flex-shrink-0">
              <Image
                src={post.image ? post.image : "/images/standin.jpg"}
                alt={
                  post.artistBand
                    ? `Image of ${post.artistBand}`
                    : "A stand-in image"
                }
                width={500}
                height={500}
                className="w-full lg:h-full h-72 object-cover object-center"
              />
            </div>
            <div className="lg:pl-4 lg:pt-4 flex flex-col lg:justify-between items-center lg:items-stretch text-center lg:text-left">
              <div>
                {post.artistBand && (
                  <h4 className="text-2xl lg:text-lg xl:text-2xl font-semibold">
                    {post.artistBand}
                  </h4>
                )}
                {post.tourName && (
                  <h5 className="font-medium lg:text-sm xl:text-lg text-lg italic">
                    {post.tourName}
                  </h5>
                )}
              </div>
              <div className="my-1 text-base lg:text-xs xl:text-base">
                <p>{post.venue}</p>
                <p>{post.location}</p>
                <p className=" text-gray-700 capitalize">{post.genre}</p>
              </div>
              {post.rating && (
                <div
                  className="pb-2"
                  aria-label={`Rating: ${post.rating} out of 5`}
                >
                  {Array.from({ length: post.rating }, (_, index) => (
                    <span key={index} className="inline-block p-[3px]">
                      <Star width={20} height={20} />
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="pt-2 xl:pr-2 pr-1 flex flex-col lg:items-end items-center justify-between flex-grow">
            <div className="pt-2">
              <time className="text-sm text-black lg:block hidden">
                {new Date(post.showDate).toLocaleDateString()}
              </time>
            </div>
            <div>
              <p className="text-gray-700 mb-2 font-bold lg:text-sm">
                {post.review && "Review"}
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
        <div className="lg:border-l-[3px] lg:border-t-0 border-t-4 border-dashed md:border-solid border-[#020C11] lg:w-32 flex-shrink-0 flex flex-col">
          <div className="lg:block hidden">
            <p className="text-center text-sm p-1 truncate">
              {post.username ? post.username : "Anonymous"}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <div className="lg:block hidden">
              <Barcode />
            </div>
            <div className="lg:hidden block mt-2">
              <BarcodeSmall />
            </div>
            <div className="lg:pt-2 p-2 lg:hidden block">
              <span className="text-sm text-black font-semibold ">
                {new Date(post.showDate).toLocaleDateString()}
              </span>
            </div>
            <span
              className="text-xs font-lacquer rotate-[270deg] hidden lg:block "
              aria-hidden="true"
            >
              STAGE STORIES
            </span>
          </div>
          <div className="lg:hidden block">
            <p className="text-center text-sm pb-3 font-semibold truncate">
              {post.username ? post.username : "Anonymous"}
            </p>
          </div>
        </div>
      </article>

      {/* Like Button and Likes Count */}
      <div className="mb-5 mt-2 mr-64 lg:mr-0 flex items-center">
        <CommentCounter postId={post.id || ""} />
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
