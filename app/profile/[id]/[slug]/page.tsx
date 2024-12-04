import { fetchPostsByUserId } from "@/app/api/postActions";
import ConcertCard from "@/app/components/ConcertCard";

type Props = {
  params: {
    id: string;
    slug: string;
  };
};

async function profilePage({ params }: Props) {
  const posts = await fetchPostsByUserId(params.id);
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Posts by user {params.slug}</p>
      {posts.map((post) => (
        <ConcertCard key={post.id} post={post} isProfile={true} />
      ))}
    </div>
  );
}

export default profilePage;
