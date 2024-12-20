"use client";
import { useRouter } from "next/navigation";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { deletePost } from "../api/postActions";
import WhiteTrashcan from "../svg/WhiteTrashcan.svg";

interface deleteProps {
  postId: string;
}

function DeleteButton({ postId }: deleteProps) {
  const router = useRouter();

  async function handelDelete(id: string) {
    try {
      await deletePost(id);
      toast.success("Post deleted successfully");
      setTimeout(() => {
        router.refresh();
      }, 3000);
    } catch (error) {
      console.error("Error deleting post: ", error);
      toast.error("Failed to delete the post.");
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
        transition={Bounce}
        role="alert"
      />
      <button
        onClick={() => handelDelete(postId)}
        className="focus:outline focus:outline-2 focus:outline-buttonDarkHover rounded"
      >
        <WhiteTrashcan height={30} aria-label="Delete this post" />
      </button>
    </>
  );
}
export default DeleteButton;
