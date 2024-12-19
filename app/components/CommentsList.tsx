"use client";

import { useEffect, useState } from "react";
import { fetchCommentsByPostId } from "../api/commentsActions";
import { Comment } from "../types/dataTypes";

interface CommentListProps {
  postId: string;
}

function CommentList({ postId }: CommentListProps) {
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
    return (
      <p className="text-white" aria-live="polite">
        Loading comments...
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {comments.length === 0 && <p className="text-white">No comments yet.</p>}
      <ul>
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="comment flex items-start p-4 border-b border-gray-700 bg-black"
            tabIndex={0}
          >
            {/* Avatar Container */}
            <div
              className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4"
              aria-hidden="true"
            >
              <span className="text-white font-bold">
                {comment.username?.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Comment Content */}
            <div className="flex flex-col text-white">
              <div className="font-bold text-sm">{comment.username}</div>
              <div className="text-sm">{comment.content}</div>
              <time className="text-xs text-gray-400 mt-1">
                {new Date(comment.createdAt).toLocaleDateString()}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CommentList;
