import { fetchPostsByUserId } from "@/app/api/postActions";
import AddConcertButton from "@/app/components/AddConcertButton";
import ConcertCard from "@/app/components/ConcertCard";
import QuickFacts from "@/app/components/QuickFacts";
import Link from "next/link";

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
      <h1 className="text-3xl text-white text-center p-5 font-semibold">
        The venue of {params.slug}{" "}
      </h1>

      <div className="container mx-auto m-6">
        <div className="flex flex-col-reverse lg:flex-row gap-7 mb-6 justify-between">
          <QuickFacts posts={posts} />
          <AddConcertButton />
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-8 mb-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <ConcertCard key={post.id} post={post} isProfile={true} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
