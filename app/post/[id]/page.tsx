import { fetchPostById } from "@/app/api/postActions";
import ConcertCard from "@/app/components/ConcertCard";

type Props = {
  params: {
    id: string;
  };
};

async function PostPage({ params }: Props) {
  const post = await fetchPostById(params.id);

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className="container mx-auto px-4 m-2">
      <ConcertCard post={post} />
    </div>
  );
}

export default PostPage;
