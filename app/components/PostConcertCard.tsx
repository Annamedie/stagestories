"use client";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import Barcode2 from "../svg/Barcode2.svg";
import Star from "../svg/Star.svg";

import Link from "next/link";
import { Post } from "../types/dataTypes";
import DeleteButton from "./Deletebutton";
import EditConcertButton from "./EditConcertButton";
import LikeButton from "./LikeButton";
interface ConcertCardProps {
  post: Post;
}

function PostConcertCard({ post }: ConcertCardProps) {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  if (!post) {
    return (
      <div>
        <h1 className="text-white">
          We are sorry this post do no longer exist, rock on!
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-3/4">
        <Link href={`/profile/${post.userId}/${post.username}`}>
          <h2 className="text-2xl p-1 text-white">
            {post.username ? post.username : "Hemligt"}
          </h2>
        </Link>
      </div>
      {/* Card Content */}
      <div
        key={post.id}
        className="h-80 w-3/4 bg-[#F3F0E8] flex overflow-hidden relative"
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
          <div className=" pt-3 flex flex-col justify-between flex-grow text-center min-h-full">
            <div>
              <h2 className="text-4xl font-semibold">{post.artistBand}</h2>
              <h3 className="font-semibold text-xl italic">{post.tourName}</h3>
              {post.rating && (
                <div>
                  {Array.from({ length: post.rating }, (_, index) => (
                    <span key={index} className="inline-block p-1">
                      <Star width={20} height={20} alt={index} />
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="flex-grow flex items-center justify-center p-2">
                {post.review ? post.review : "No review available."}
              </p>
            </div>
            <div className="my-1 flex gap-4 justify-center">
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
        <LikeButton
          postId={post.id || ""}
          initialLikes={post.likes || 0}
          isLiked={userId ? post.likesBy?.includes(userId) || false : false}
          userId={userId || null}
        />
        <div className="flex">
          {userId === post.userId && post.id && (
            <DeleteButton postId={post.id} />
          )}
          {userId === post.userId && post.id && (
            <EditConcertButton editUrl={`/edit-concert/${post.id}`} />
          )}
        </div>
      </div>
    </div>
  );
}

export default PostConcertCard;
