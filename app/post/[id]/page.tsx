import { fetchPostById } from "@/app/api/postActions";
import PostConcertCard from "@/app/components/PostConcertCard";

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
      <PostConcertCard post={post} />
    </div>
  );
}

export default PostPage;
