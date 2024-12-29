"use client";
import { useEffect, useState } from "react";
import { fetchCommentsByPostId } from "../api/commentsActions";
import CommentIcon from "../svg/CommentIcon.svg";
import { Comment } from "../types/dataTypes";

interface CommentCounterProps {
  postId: string;
}

function CommentCounter({ postId }: CommentCounterProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getComments() {
      try {
        const fetchedComments = await fetchCommentsByPostId(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    }
    getComments();
  }, [postId]);

  if (loading) {
    return <p className="text-white text-xs">Loading comments...</p>;
  }
  return (
    <div className="m-2 flex">
      <CommentIcon height={25} />
      <span className="text-white">{comments.length}</span>
    </div>
  );
}

export default CommentCounter;
