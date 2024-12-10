"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPosts } from "./api/postActions";
import AddConcertButton from "./components/AddConcertButton";
import ConcertCard from "./components/ConcertCard";
import { useAuth } from "./context/Authcontext";
import { Post } from "./types/dataTypes";

function Home() {
  const { user, isloading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!isloading) {
      if (!user) {
        router.push("/auth/login");
      } else {
        fetchPosts().then((data) => setPosts(data));
      }
    }
  }, [user, isloading, router]);

  if (isloading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Concert Reviews</h1>
      <div className="grid grid-cols-2  gap-4 mb-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <ConcertCard key={post.id} post={post} />
          </Link>
        ))}
      </div>
      <AddConcertButton />
    </div>
  );
}

export default Home;
