import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { addPost } from "../api/postActions";
import { Post } from "../types/dataTypes";

function ConcertForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Post>();
  const onSubmit: SubmitHandler<Post> = async (concertData: Post) => {
    setIsLoading(true);

    try {
      await addPost(concertData);
      reset();
      toast.success("Concert added successfully");
    } catch (error: any) {
      if (error?.code) {
        toast.error(error.message, { position: "top-center" });
      } else {
        toast.error("An unknown error occurred", { position: "top-center" });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
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
      <div className="max-w-md mx-auto mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Artist or Band</label>
            <input type="text" {...register("artistBand")} />
          </div>

          <div>
            <label className="block text-sm font-medium">Location</label>
            <input type="text" {...register("location")} />
          </div>
          <div>
            <label className="block text-sm font-medium">Date of concert</label>
            <input type="text" {...register("showDate")} />
          </div>
          <div>
            {" "}
            <label className="block text-sm font-medium"></label>Rating
          </div>
          <input type="text" {...register("rating")} />

          <button
            className={`w-full py-2 rounded ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-lime-500 hover:bg-lime-600 text-white"
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <Link href={"/auth/login"}>
          <div>
            <h3>
              Already a user? Sign In <i>here</i>
            </h3>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ConcertForm;
