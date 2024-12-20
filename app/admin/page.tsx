"use client";

import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
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
      <main>
        <h2 className="text-white">
          User must be logged in and an admin to view this page
        </h2>
      </main>
    );
  }

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
      toast.success("Post deleted successfully!");
      setPostData((prev) => prev.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post: ", error);
      toast.error("Failed to delete the post.");
    }
  };

  const handleDeleteUser = async (userId: string, isAdmin: boolean) => {
    try {
      await deleteUserandPostsAdmin(userId, isAdmin);
      toast.success("User deleted successfully!");
      setUserData((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error("Failed to delete the user.");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        role="alert"
      />
      <main className="bg-gray-900 min-h-screen p-4 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center">
          Admin Dashboard
        </h2>
        <section aria-labelledby="users-section">
          <h3
            id="users-section"
            className="text-xl md:text-2xl font-semibold text-primary mt-6 md:mt-8 text-center"
          >
            Users
          </h3>
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
                <button
                  onClick={() => row.id && handleDeleteUser(row.id, isAdmin)}
                  aria-label={`Delete user ${row.username}`}
                  className="focus:outline focus:outline-2 focus:outline-buttonDarkHover rounded"
                >
                  <Trashcan />
                </button>
              )}
            />
          </div>
        </section>
        <section aria-labelledby="posts-section">
          <h3
            id="posts-section"
            className="text-xl md:text-2xl font-semibold text-primary mt-6 md:mt-8 text-center"
          >
            Posts
          </h3>
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
                <button
                  onClick={() => row.id && handleDeletePost(row.id)}
                  aria-label={`Delete Post By ${row.username}`}
                  className="focus:outline focus:outline-2 focus:outline-buttonDarkHover rounded"
                >
                  <Trashcan />
                </button>
              )}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default AdminPage;
