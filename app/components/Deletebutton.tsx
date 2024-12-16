import { Bounce, toast, ToastContainer } from "react-toastify";
import { deletePost } from "../api/postActions";
import WhiteTrashcan from "../svg/WhiteTrashcan.svg";

interface deleteProps {
  postId: string;
}

function DeleteButton({ postId }: deleteProps) {
  async function handelDelete(id: string) {
    try {
      await deletePost(id);
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post: ", error);
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
      />
      <button onClick={() => handelDelete(postId)}>
        <WhiteTrashcan height={30} />
      </button>
    </>
  );
}
export default DeleteButton;
