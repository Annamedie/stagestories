"use client";

import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { deletePost, fetchPosts } from "../api/postActions";
import { deleteUserandPostsAdmin, fetchAllUsers } from "../api/userActions";
import DataTable from "../components/DataTable";
import { useAuth } from "../context/Authcontext";
import Trashcan from "../svg/Trashcan.svg";
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

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
      setPostData((prev) => prev.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  const handleDeleteUser = async (userId: string, isAdmin: boolean) => {
    try {
      await deleteUserandPostsAdmin(userId, isAdmin);
      setUserData((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>

      <h2 className="text-2xl font-semibold text-primary mt-8">Users</h2>
      <DataTable
        data={userData}
        columns={
          [
            { header: "Username", accessor: "username" },
            { header: "Date of Registration", accessor: "createdAt" },
            { header: "User ID", accessor: "id" },
            { header: "Admin", accessor: "isAdmin" },
          ] as Array<{ header: string; accessor: keyof (typeof userData)[0] }>
        }
        actions={(row) => (
          <button onClick={() => row.id && handleDeleteUser(row.id, isAdmin)}>
            <Trashcan />
          </button>
        )}
      />

      <h2 className="text-2xl font-semibold text-primary mt-8">Posts</h2>
      <DataTable
        data={postData}
        columns={
          [
            { header: "Username", accessor: "username" },
            { header: "Date of Post", accessor: "createdAt" },
            { header: "Post ID", accessor: "id" },
            { header: "Artist", accessor: "artistBand" },
            { header: "Description", accessor: "review" },
          ] as Array<{ header: string; accessor: keyof (typeof postData)[0] }>
        }
        actions={(row) => (
          <button onClick={() => row.id && handleDeletePost(row.id)}>
            <Trashcan />
          </button>
        )}
      />
    </div>
  );
}

export default AdminPage;
