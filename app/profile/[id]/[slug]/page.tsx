import { fetchPostsByUserId } from "@/app/api/postActions";
import ConcertCard from "@/app/components/ConcertCard";
import QuickFacts from "@/app/components/QuickFacts";

type Props = {
  params: {
    id: string;
    slug: string;
  };
};

async function ProfilePage({ params }: Props) {
  const posts = await fetchPostsByUserId(params.id);
  return (
    <>
      <QuickFacts posts={posts} />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl text-white mb-6">Profile Page</h1>
        <p className="text-gray-300 mb-4">Posts by user {params.slug}</p>
        <div className="grid grid-cols-2 gap-4 mb-3">
          {posts.map((post) => (
            <ConcertCard key={post.id} post={post} isProfile={true} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
