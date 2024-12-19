"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { addPost, updatePost } from "../api/postActions";
import { Post } from "../types/dataTypes";
import { ConcertFormSchema } from "../validationSchemas/concertValidation";
import UploadBtn from "./UploadBtn";

interface ConcertFormProps {
  isEdit: boolean;
  postId?: string;
  initialData?: Partial<Post>;
}

function ConcertForm({ isEdit, postId, initialData = {} }: ConcertFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData.image || "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Post>({
    resolver: zodResolver(ConcertFormSchema),
    defaultValues: {
      artistBand: initialData.artistBand || "",
      location: initialData.location || "",
      showDate: initialData.showDate || "",
      rating: initialData.rating || undefined,
      topTracks: initialData.topTracks || ["", "", ""],
      venue: initialData.venue || "",
      tourName: initialData.tourName || "",
      genre: initialData.genre || "",
      review: initialData.review || "",
      image: initialData.image || "",
    },
  });

  const onSubmit: SubmitHandler<Post> = async (concertData: Post) => {
    console.log(errors);
    setIsLoading(true);

    try {
      const postWithImage = { ...concertData, image: imageUrl };

      if (isEdit && postId) {
        await updatePost(postId, postWithImage);
        toast.success("Concert updated successfully");
      } else {
        await addPost(postWithImage);
        toast.success("Concert added successfully");
      }

      reset();
      setImageUrl("");

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

      <h3 className="text-primary text-center text-3xl font-bold">
        {isEdit ? "Edit your concert" : "Add your concert"}
      </h3>
      <section className="max-w-4xl mx-auto m-10 p-6 bg-[#F3F0E8] rounded-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" lg:grid gap-6 p-2 lg:grid-cols-2"
        >
          <div className="lg:border-r lg:pr-6">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="artisBand"
                  className="block text-sm font-medium text-gray-700"
                >
                  Artist or Band
                </label>
                <input
                  id="artistBand"
                  type="text"
                  aria-describedby="artistBand-error"
                  placeholder=" Enter Artist or Band Name"
                  {...register("artistBand")}
                  className={`w-full border p-2 rounded-md mt-1 focus:ring-2 focus:outline-none ${
                    errors.artistBand
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.artistBand && (
                  <p
                    id="artistBand-error"
                    role="alert"
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.artistBand.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="City or Town"
                  aria-describedby="location-error"
                  {...register("location")}
                  className={`w-full border p-2 rounded-md mt-1 focus:ring-2 focus:outline-none ${
                    errors.location
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.location && (
                  <p
                    id="location-error"
                    role="alert"
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="showDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of concert
                </label>
                <input
                  id="showDate"
                  type="date"
                  aria-describedby="showDate-error"
                  {...register("showDate")}
                  className={`w-full border p-2 rounded-md mt-1 focus:ring-2 focus:outline-none ${
                    errors.showDate
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.showDate && (
                  <p
                    id="showDate-error"
                    role="alert"
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.showDate.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rate your concert experience (1-5)
                </label>
                <select
                  id="rating"
                  aria-describedby="rating-error"
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
                  <p
                    id="rating-error"
                    role="alert"
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.rating.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="topTracks"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter your top 3 tracks from the concert
                </label>
                <input
                  id="topTracks"
                  type="text"
                  aria-describedby="topTracks-error"
                  placeholder="Top Track 1"
                  {...register("topTracks.0")}
                  className="w-full border p-2 rounded-md mt-1"
                />
                <input
                  id="topTracks"
                  type="text"
                  aria-describedby="topTracks-error"
                  placeholder="Top Track 2"
                  {...register("topTracks.1")}
                  className="w-full border p-2 rounded-md mt-1"
                />
                <input
                  id="topTracks"
                  type="text"
                  aria-describedby="topTracks-error"
                  placeholder="Top Track 3"
                  {...register("topTracks.2")}
                  className="w-full border p-2 rounded-md mt-1"
                />
                {errors.topTracks && (
                  <p
                    id="topTracks"
                    role="alert"
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.topTracks.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:pl-6 mt-3 lg:mt-0">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="venue"
                  className="block text-sm font-medium text-gray-700"
                >
                  Venue Name
                </label>
                <input
                  id="venue"
                  type="text"
                  placeholder="Enter Venue Name"
                  aria-describedby="venue-error"
                  {...register("venue")}
                  className={`w-full border p-2 rounded-md mt-1 focus:ring-2 focus:outline-none ${
                    errors.venue
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.venue && (
                  <p
                    id="venue-error"
                    role="alert"
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.venue.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="tourFestivalname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tour or Festival Name
                </label>
                <input
                  id="tourFestivalname"
                  type="text"
                  placeholder="Enter Tour or Festival Name"
                  aria-describedby="tourName-error"
                  {...register("tourName")}
                  className={`w-full border p-2 rounded-md mt-1 focus:ring-2 focus:outline-none ${
                    errors.tourName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.tourName && (
                  <p
                    id="tourName-error"
                    role="alert"
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.tourName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="genre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Genre
                </label>
                <select
                  id="genre"
                  {...register("genre")}
                  className={`w-full border p-2 rounded-md mt-1 focus:ring-2 focus:outline-none ${
                    errors.genre
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                >
                  <option value="" label="Select a genre" disabled>
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
                <UploadBtn
                  imageUrl={imageUrl}
                  onUpload={(url) => setImageUrl(url)}
                />
              </div>

              <div>
                <label
                  htmlFor="review"
                  className="block text-sm font-medium text-gray-700"
                >
                  Review
                </label>
                <textarea
                  id="review"
                  aria-describedby="review-error"
                  placeholder="Write your review here"
                  rows={4}
                  {...register("review")}
                  className={`w-full border p-2 rounded-md mt-1 focus:ring-2 focus:outline-none ${
                    errors.review
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.review && (
                  <p
                    id="review-error"
                    role="alert"
                    className="text-red-500 text-sm mt-1"
                  >
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
              {isLoading
                ? isEdit
                  ? "Updating..."
                  : "Adding..."
                : isEdit
                ? "Update Concert"
                : "Add Concert"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <h3 className="text-footerHeader">
            Finished?{" "}
            <Link href="/" className="hover:underline">
              Back to the start page!
            </Link>
          </h3>
        </div>
      </section>
    </>
  );
}

export default ConcertForm;
