import { fetchPostById } from "@/app/api/postActions";
import PostConcertCard from "@/app/components/PostConcertCard";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

async function PostPage({ params }: Props) {
  const post = await fetchPostById(params.id);

  if (!post) {
    return (
      <main role="alert">
        <h1 className="text-white text-center m-4">
          We are sorry, this concert does not exist anymore. Rock on!
        </h1>
        <Link
          href="/"
          className=" inline-block px-6 py-3 m-3 text-white bg-buttonDark rounded-md text-lg font-medium hover:bg-buttonDarkHover hover:shadow-lg transition duration-300"
        >
          Back to the concerts!
        </Link>
      </main>
    );
  }
  return (
    <main
      className="container mx-auto px-4 m-2"
      aria-label={`Concert post about ${post.artistBand}`}
    >
      <PostConcertCard post={post} />
    </main>
  );
}

export default PostPage;
