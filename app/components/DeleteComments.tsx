"use client";

import { toast, ToastContainer } from "react-toastify";
import { deleteComment } from "../api/commentsActions";
import Trashcan from "../svg/Trashcan.svg";

interface DeleteCommentsProps {
  commentId: string;
}

function DeleteComments({ commentId }: DeleteCommentsProps) {
  async function handelDelete(id: string) {
    try {
      await deleteComment(id);
      toast.success("Comment deleted successfully");

      window.location.reload();
    } catch (error) {
      console.error("Error deleting comment: ", error);
      toast.error("Failed to delete the comment.");
    }
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        role="alert"
      />
      <button
        onClick={() => handelDelete(commentId)}
        className="focus:outline focus:outline-2 focus:outline-buttonDarkHover rounded"
      >
        <Trashcan height={20} aria-label="Delete this comment" />
      </button>
    </>
  );
}
export default DeleteComments;
