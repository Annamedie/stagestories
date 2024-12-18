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
    <div className="bg-gray-900 min-h-screen p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-primary text-center">
        Admin Dashboard
      </h1>

      <h2 className="text-xl md:text-2xl font-semibold text-primary mt-6 md:mt-8 text-center">
        Users
      </h2>
      <div className="overflow-x-auto">
        <DataTable
          data={userData}
          columns={[
            { header: "Username", accessor: "username" },
            { header: "Date of Registration", accessor: "createdAt" },
            { header: "User ID", accessor: "id" },
            { header: "Admin", accessor: "isAdmin" },
          ]}
          actions={(row) => (
            <button onClick={() => row.id && handleDeleteUser(row.id, isAdmin)}>
              <Trashcan />
            </button>
          )}
        />
      </div>

      <h2 className="text-xl md:text-2xl font-semibold text-primary mt-6 md:mt-8 text-center">
        Posts
      </h2>
      <div className="overflow-x-auto">
        <DataTable
          data={postData}
          columns={[
            { header: "Username", accessor: "username" },
            { header: "Date of Post", accessor: "createdAt" },
            { header: "Post ID", accessor: "id" },
            { header: "Artist", accessor: "artistBand" },
            { header: "Description", accessor: "review", isLongText: true },
          ]}
          actions={(row) => (
            <button onClick={() => row.id && handleDeletePost(row.id)}>
              <Trashcan />
            </button>
          )}
        />
      </div>
    </div>
  );
}

export default AdminPage;
