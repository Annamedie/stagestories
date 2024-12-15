"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { addPost } from "../api/postActions";
import { Post } from "../types/dataTypes";
import { ConcertFormSchema } from "../validationSchemas/concertValidation";
import UploadBtn from "./UploadBtn";

function ConcertForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Post>({ resolver: zodResolver(ConcertFormSchema) });

  const onSubmit: SubmitHandler<Post> = async (concertData: Post) => {
    console.log(errors);
    setIsLoading(true);

    try {
      const postWithImage = { ...concertData, image: imageUrl };
      await addPost(postWithImage);
      reset();
      setImageUrl("");
      toast.success("Concert added successfully");
      console.log(errors);
    } catch (error: any) {
      if (error?.code) {
        toast.error(error.message, { position: "top-center" });
        console.log(errors);
      } else {
        toast.error("An unknown error occurred", { position: "top-center" });
        console.log(errors);
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
    { value: "other", label: "Other" },
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
      <h1 className="text-primary text-center text-3xl font-bold">
        Add your concert
      </h1>
      <div className="max-w-4xl mx-auto m-10 p-6 bg-[#F3F0E8] rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6 p-2"
        >
          <div className="border-r pr-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Artist or Band
                </label>
                <input
                  type="text"
                  {...register("artistBand")}
                  className={`w-full border p-2 rounded-md mt-1 focus:ring-2 focus:outline-none ${
                    errors.artistBand
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.artistBand && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.artistBand.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  {...register("location")}
                  className={`w-full border p-2 rounded-md mt-1 focus:ring-2 focus:outline-none ${
                    errors.location
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of concert
                </label>
                <input
                  type="date"
                  {...register("showDate")}
                  className={`w-full border p-2 rounded-md mt-1 focus:ring-2 focus:outline-none ${
                    errors.showDate
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.showDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.showDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rate your concert experience (1-5)
                </label>
                <select
                  {...register("rating")}
                  className={`w-full border p-2 rounded-md mt-1 focus:ring-2 focus:outline-none ${
                    errors.rating
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                >
                  <option value="" label="Select a rating">
                    Select a rating
                  </option>
                  {ratings.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.rating.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter your top 3 tracks from the concert
                </label>
                <input
                  type="text"
                  placeholder="Top Track 1"
                  {...register("topTracks.0")}
                  className="w-full border p-2 rounded-md mt-1"
                />
                <input
                  type="text"
                  placeholder="Top Track 2"
                  {...register("topTracks.1")}
                  className="w-full border p-2 rounded-md mt-1"
                />
                <input
                  type="text"
                  placeholder="Top Track 3"
                  {...register("topTracks.2")}
                  className="w-full border p-2 rounded-md mt-1"
                />
                {errors.topTracks && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.topTracks.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pl-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Venue Name
                </label>
                <input
                  type="text"
                  {...register("venue")}
                  className={`w-full border p-2 rounded-md mt-1 focus:ring-2 focus:outline-none ${
                    errors.venue
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.venue && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.venue.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tour or Festival Name
                </label>
                <input
                  type="text"
                  {...register("tourName")}
                  className={`w-full border p-2 rounded-md mt-1 focus:ring-2 focus:outline-none ${
                    errors.tourName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.tourName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.tourName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Genre
                </label>
                <select
                  {...register("genre")}
                  className={`w-full border p-2 rounded-md mt-1 focus:ring-2 focus:outline-none ${
                    errors.genre
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                >
                  <option value="" label="Select a genre">
                    Select a genre
                  </option>
                  {musicGenres.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <UploadBtn onUpload={(url) => setImageUrl(url)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Review
                </label>
                <textarea
                  rows={4}
                  {...register("review")}
                  className={`w-full border p-2 rounded-md mt-1 focus:ring-2 focus:outline-none ${
                    errors.review
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.review && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.review.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className={`w-1/3 py-2 text-white rounded-md ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-footerHeader hover:bg-[#1872B4]"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-footerHeader hover:underline">
            <h3>Finished? Back to the start page!</h3>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ConcertForm;
