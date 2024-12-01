"use client";
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

  const ratings = [
    {
      value: 1,
      label: "⭐ - This is bad",
    },
    { value: 2, label: "⭐⭐ - Just Okay" },
    { value: 3, label: "⭐⭐⭐ - Good" },
    { value: 4, label: "⭐⭐⭐⭐ - Amazing" },
    { value: 5, label: "⭐⭐⭐⭐⭐ - Perfection, nothing can top this" },
  ];

  const musicGenres = [
    { value: "pop", label: "Pop" },
    { value: "rock", label: "Rock" },
    { value: "hip-hop", label: "Hip-Hop" },
    { value: "r&b", label: "R&B" },
    { value: "eletronic-dance", label: "Electronic/Dance" },
    { value: "country", label: "Country" },
    { value: "jazz", label: "Jazz" },
    { value: "classical", label: "Classical" },
    { value: "reggae", label: "Reggae" },
    { value: "metal", label: "Metal" },
    { value: "blues", label: "Blues" },
    { value: "folk", label: "Folk" },
    { value: "indie", label: "Indie" },
    { value: "soul", label: "Soul" },
    { value: "kpop", label: "K-pop" },
    { value: "latin", label: "Latin" },
  ];

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
            {errors.artistBand && (
              <p className="text-red-500 text-sm">
                {errors.artistBand?.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Location</label>
            <input type="text" {...register("location")} />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location?.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Date of concert</label>
            <input type="date" {...register("showDate")} />
            {errors.showDate && (
              <p className="text-red-500 text-sm">{errors.showDate?.message}</p>
            )}
          </div>
          <div>
            {" "}
            <label className="block text-sm font-medium"></label>Rate your
            concert experience between 1 and 5.
            <select
              id="rating"
              {...register("rating")}
              className={`border p-2 rounded-md ${
                errors.rating ? "border-red-500" : "border-gray-300"
              }`}
            >
              {" "}
              {ratings.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}{" "}
            </select>
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating.message}</p>
            )}
          </div>
          <div>
            {" "}
            <label className="block text-sm font-medium">Venue name</label>
            <input type="text" {...register("venue")} />
            {errors.venue && (
              <p className="text-red-500 text-sm">{errors.venue?.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="tourName">Tour name</label>
            <input id="tourName" type="text" {...register("tourName")} />
            {errors.tourName && (
              <p className="text-red-500 text-sm">{errors.tourName?.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <div>
              <h3>Enter your top tracks from the concert</h3>
            </div>
            {/* Track 1 */}
            <div>
              <label
                htmlFor="topTracks-0"
                className="block text-xs font-medium"
              >
                Track 1
              </label>
              <input
                type="text"
                id="topTracks-0"
                {...register("topTracks.0")}
                className={`border p-2 rounded-md w-full ${
                  errors.topTracks?.[0] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.topTracks?.[0] && (
                <p className="text-red-500 text-sm">
                  {errors.topTracks[0]?.message}
                </p>
              )}
            </div>

            {/* Track 2 */}
            <div>
              <label
                htmlFor="topTracks-1"
                className="block text-xs font-medium"
              >
                Track 2
              </label>
              <input
                type="text"
                id="topTracks-1"
                {...register("topTracks.1")}
                className={`border p-2 rounded-md w-full ${
                  errors.topTracks?.[1] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.topTracks?.[1] && (
                <p className="text-red-500 text-sm">
                  {errors.topTracks[1]?.message}
                </p>
              )}
            </div>

            {/* Track 3 */}
            <div>
              <label
                htmlFor="topTracks-2"
                className="block text-xs font-medium"
              >
                Track 3
              </label>
              <input
                type="text"
                id="topTracks-2"
                {...register("topTracks.2")}
                className={`border p-2 rounded-md w-full ${
                  errors.topTracks?.[2] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.topTracks?.[2] && (
                <p className="text-red-500 text-sm">
                  {errors.topTracks[2]?.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              {...register("genre")}
              className={`border p-2 rounded-md ${
                errors.rating ? "border-red-500" : "border-gray-300"
              }`}
            >
              {" "}
              {musicGenres.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}{" "}
            </select>
          </div>
          <button>add photo</button>
          <button>add emoijs</button>

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
        <Link href={"/"}>
          <div>
            <h3>Finished? To the start page!</h3>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ConcertForm;
