import { fetchPostsByUserId } from "@/app/api/postActions";
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
      <main aria-label={`${params.slug} concert reviews`}>
        <h3 className="text-3xl text-white text-center p-5 font-semibold">
          The venue of {params.slug}{" "}
        </h3>

        <section className="container mx-auto m-6">
          <div className="flex flex-col-reverse lg:flex-row gap-7 mb-6 justify-between">
            <div aria-live="polite">
              <QuickFacts posts={posts} />
            </div>
          </div>
          <section className="grid lg:grid-cols-2 grid-cols-1 lg:gap-8 mb-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.id}`}
                className="focus:outline focus:outline-2 focus:outline-buttonDarkHover rounded"
                aria-label={`Read more about this concert: ${post.artistBand}`}
              >
                <ConcertCard key={post.id} post={post} isProfile={true} />
              </Link>
            ))}
          </section>
        </section>
      </main>
    </>
  );
}

export default ProfilePage;
