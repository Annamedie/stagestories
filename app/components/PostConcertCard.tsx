"use client";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import Barcode2 from "../svg/Barcode2.svg";
import BarcodeSmall2 from "../svg/BarcodeSmall2.svg";
import Star from "../svg/Star.svg";
import { Post } from "../types/dataTypes";
import CommentInput from "./CommentInput";
import CommentList from "./CommentsList";
import DeleteButton from "./Deletebutton";
import EditConcertButton from "./EditConcertButton";
import LikeButton from "./LikeButton";
interface ConcertCardProps {
  post: Post;
}

function PostConcertCard({ post }: ConcertCardProps) {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const visibleTracks = post.topTracks?.filter((track) => track.trim() !== "");

  return (
    <article className="flex flex-col items-center">
      <div className="w-3/4">
        <Link
          href={`/profile/${post.userId}/${post.username}`}
          aria-label={`View profile of ${post.username}`}
        >
          <h2 className="text-2xl p-1 text-white">
            {post.username ? post.username : "Hemligt"}
          </h2>
        </Link>
      </div>
      {/* Card Content */}
      <section
        key={post.id}
        className="xl:h-80 xl:w-3/4 w-2/3 bg-[#F3F0E8] flex flex-col xl:flex-row overflow-hidden relative"
      >
        <div className=" hidden  md:block absolute xl:right-[186px] xl:-translate-x-1/2 xl:-top-5 bg-[#020C11] w-9 h-9 rounded-full  -translate-x-5 bottom-[140px] "></div>

        <div className=" hidden md:block absolute xl:right-[186px] xl:-translate-x-1/2 xl:-bottom-5 bottom-[140px]  lg:translate-x-[645px] md:translate-x-[470px] bg-[#020C11] w-9 h-9 rounded-full  "></div>

        <div className="flex flex-grow flex-col xl:flex-row">
          {/* Image Section */}
          <div className="xl:w-64 flex-shrink-0">
            <Image
              src={post.image ? post.image : "/images/standin.jpg"}
              alt={
                post.artistBand
                  ? `Image of ${post.artistBand}`
                  : "A stand-in image"
              }
              width={500}
              height={500}
              className="w-full xl:h-full h-80 object-cover object-center "
            />
          </div>

          {/* Info Section */}
          <div className=" pt-3 flex flex-col justify-between flex-grow text-center min-h-full">
            <div>
              <h2 className="text-4xl font-semibold">{post.artistBand}</h2>
              <h3 className="font-semibold text-xl italic">{post.tourName}</h3>
              {post.rating && (
                <div aria-label={`Rating: ${post.rating} out of 5`}>
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
              <time className=" text-black">
                {new Date(post.showDate).toLocaleDateString()}
              </time>
            </div>
          </div>
        </div>

        {/* Barcode Section */}
        <aside
          aria-labelledby="barcode-section"
          className="xl:border-l-4 border-t-4 md:border-solid border-dashed border-black xl:w-56 flex-shrink-0 flex flex-col xl:flex-row xl:justify-between items-center xl:items-stretch w-full"
        >
          <h4 id="barcode-section" className="sr-only">
            Barcode representing the concert ticket
          </h4>
          <div className="block xl:hidden">
            <BarcodeSmall2 />
          </div>
          <div className=" hidden flex-grow xl:flex items-center">
            <Barcode2 />
          </div>
          <div className="m-2 flex flex-col justify-between">
            {visibleTracks && visibleTracks.length > 0 && (
              <div className="pb-2">
                <h4 className="font-semibold mb-1">Top Tracks</h4>
                <ul className="list-disc">
                  {visibleTracks.map((track, index) => (
                    <li className="text-sm break-words" key={index}>
                      {track}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mb-3 hidden xl:block">
              <h4 className="font-semibold">Top emotions</h4>
              <ul className="list-disc">
                <li>😁</li>
                <li>👽</li>
                <li>💩</li>
              </ul>
            </div>
          </div>
        </aside>
      </section>

      {/* Like Button */}
      <div className="w-3/4 mt-2 flex justify-between">
        <LikeButton
          postId={post.id || ""}
          initialLikes={post.likes || 0}
          isLiked={userId ? post.likesBy?.includes(userId) || false : false}
          userId={userId || null}
        />
        <div className="flex justify-center align-baseline items-baseline">
          {userId === post.userId && post.id && (
            <DeleteButton postId={post.id} />
          )}
          {userId === post.userId && post.id && (
            <EditConcertButton editUrl={`/edit-concert/${post.id}`} />
          )}
        </div>
      </div>
      <div className="">
        {post.id && <CommentList postId={post.id} />}
        <CommentInput postId={post.id || ""} />
      </div>
    </article>
  );
}

export default PostConcertCard;
