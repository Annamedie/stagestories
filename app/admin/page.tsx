"use client";

import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { deletePost, fetchPosts } from "../api/postActions";
import { fetchAllUsers } from "../api/userActions";
import { useAuth } from "../context/Authcontext";

import DataTable from "../components/DataTable";
import { Post, Users } from "../types/dataTypes";

function AdminPage() {
  const auth = getAuth();
  const user = auth.currentUser;
  const { isAdmin } = useAuth();
  const [userData, setUserData] = useState<Users[]>([]);
  const [postData, setPostData] = useState<Post[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const [users, posts] = await Promise.all([fetchAllUsers(), fetchPosts()]);
      setUserData(users);
      setPostData(posts);
    };
    getUsers();
  }, []);

  if (!user || !isAdmin) {
    return (
      <div>
        <h1 className="text-white">
          User must be logged in and an admin to view this page
        </h1>
      </div>
    );
  }

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId);
      setPostData((prev) => prev.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  return (
    <div>
      <h1 className="text-white">Admin Page</h1>
      <p className="text-white">Only accessible by admins</p>

      <h2 className="text-white mt-8">Users</h2>
      <DataTable
        data={userData}
        columns={
          [
            { header: "Username", accessor: "username" },
            { header: "Date of Registration", accessor: "createdAt" },
            { header: "User ID", accessor: "id" },
            { header: "Admin", accessor: "isAdmin" },
          ] as Array<{ header: string; accessor: keyof Users }>
        }
      />

      <h2 className="text-white mt-8">Posts</h2>
      <DataTable
        data={postData}
        columns={
          [
            { header: "Username", accessor: "username" },
            { header: "Date of Post", accessor: "createdAt" },
            { header: "Post ID", accessor: "id" },
            { header: "Artist", accessor: "artistBand" },
            { header: "Description", accessor: "review" },
          ] as Array<{ header: string; accessor: keyof Post }>
        }
        actions={(row: Post) => (
          <button
            onClick={() => row.id && handleDelete(row.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        )}
      />
    </div>
  );
}

export default AdminPage;
