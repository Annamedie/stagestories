"use client";

import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { fetchCommentsByPostId } from "../api/commentsActions";
import { Comment } from "../types/dataTypes";
import DeleteComments from "./DeleteComments";

interface CommentListProps {
  postId: string;
}

function CommentList({ postId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

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
      {/* Scrollable Container */}
      <div
        className="max-h-96 overflow-y-auto bg-gray-900 rounded-lg p-4"
        aria-label="Comments section"
      >
        <ul className="space-y-2">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="flex items-start p-4 border-b border-gray-700 bg-[#F3F0E8]"
              tabIndex={0}
            >
              {/* Avatar Container */}
              <div
                className="w-10 h-10 rounded-full bg-footerHeader flex items-center justify-center my-auto"
                aria-hidden="true"
              >
                <span className="text-primary font-bold font-lacquer">
                  {comment.username?.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* Comment Content */}
              <div className="flex flex-col text-black pl-4">
                <div className="font-bold text-sm">{comment.username}</div>
                <div className="text-sm">{comment.content}</div>
                <time className="text-xs text-gray-800 mt-1">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </time>
              </div>
              {comment.userId === userId && (
                <div>
                  {comment.id && <DeleteComments commentId={comment.id} />}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default CommentList;
