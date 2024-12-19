"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { addComment } from "../api/commentsActions";
import { useAuth } from "../context/Authcontext";

interface CommentInputProps {
  postId: string;
}

interface CommentFromData {
  content: string;
}

function CommentInput({ postId }: CommentInputProps) {
  const { username } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFromData>();

  const router = useRouter();

  const onSubmit: SubmitHandler<CommentFromData> = async (commentData) => {
    if (!commentData.content.trim()) {
      return;
    }

    try {
      await addComment({
        content: commentData.content.trim(),
        postId,
        username: username ?? "Anonymous",
      });

      window.location.reload();
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      reset();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2">
      <label htmlFor="content" className="sr-only">
        Write your comment here
      </label>
      <input
        id="Commet input"
        type="text"
        placeholder="Write a comment..."
        aria-label="Write a comment"
        aria-describedby={errors.content ? "comment-error" : ""}
        {...register("content", {
          required: "Comment text is required",
          maxLength: {
            value: 250,
            message: "Comment cannot exceed 250 characters",
          },
        })}
        className={`border rounded p-2 ${
          errors.content ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.content && (
        <p
          id="commen-error"
          aria-live="polite"
          className="text-red-500 text-sm"
        >
          {errors.content.message}
        </p>
      )}

      <button
        type="submit"
        className="bg-card1 py-1 px-3 rounded focus:outline focus:outline-2 focus:outline-buttonDarkHover"
      >
        Comment
      </button>
    </form>
  );
}
export default CommentInput;
