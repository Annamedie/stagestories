"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPosts } from "./api/postActions";
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <div key={post.id} className="border rounded-lg p-4 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{post.artistBand}</h2>
                <span className="text-sm text-gray-500">{post.rating}/5</span>
              </div>
              <p className="text-gray-700 mb-2">{post.review}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {post.venue} - {post.location}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(post.showDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
