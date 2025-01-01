"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { likePost, unlikePost } from "../api/postActions";
import Hand from "../svg/Hand.svg";
import MetalHand from "../svg/MetalHand.svg";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
  isLiked: boolean;
  userId: string | null;
}

const LikeButton = ({
  postId,
  initialLikes,
  isLiked,
  userId,
}: LikeButtonProps) => {
  const router = useRouter();
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!userId) {
      console.error("User must be logged in to like a post.");
      return;
    }

    try {
      if (liked) {
        await unlikePost(postId);
        setLikes((prev) => prev - 1);
      } else {
        await likePost(postId);
        setLikes((prev) => prev + 1);
      }
      setLiked((prev) => !prev);
      router.refresh();
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return (
    <div className="m-2 flex items-center">
      <button
        onClick={handleLike}
        aria-label={liked ? "Unlike this post" : "Like this post"}
        aria-pressed={liked}
        className="focus:outline focus:outline-2 focus:outline-buttonDarkHover rounded"
      >
        {liked ? <MetalHand height={30} /> : <Hand height={30} />}
      </button>
      <span className="ml-2 text-white" aria-live="polite">
        {likes} Rock on!
      </span>
    </div>
  );
};

export default LikeButton;
