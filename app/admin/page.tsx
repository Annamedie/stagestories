"use client";

import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { deletePost, fetchPosts } from "../api/postActions";
import {
  deleteUserandPostsAdmin,
  fetchAllUsers,
  setAdmin,
} from "../api/userActions";
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

  const handleToggleAdmin = async (user: Users) => {
    try {
      const newValue = !user.isAdmin; // flipping the boolean
      if (user.id) {
        await setAdmin(user.id, isAdmin, newValue);
      } else {
        throw new Error("User ID is undefined");
      }

      // Update local userData so the UI matches new admin status
      setUserData((prev) =>
        prev.map((userData) =>
          userData.id === user.id
            ? { ...userData, isAdmin: newValue }
            : userData
        )
      );

      toast.success(
        `User ${user.username} admin set to: ${newValue ? "true" : "false"}`
      );
    } catch (error) {
      console.error("Error toggling admin:", error);
      toast.error("Failed to toggle admin status.");
    }
  };

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
        <h3 className="text-2xl md:text-3xl font-bold text-primary text-center">
          Admin Dashboard
        </h3>
        <section aria-labelledby="users-section">
          <h4
            id="users-section"
            className="text-xl md:text-2xl font-semibold text-primary mt-6 md:mt-8 text-center"
          >
            Users
          </h4>
          <div className="overflow-x-auto">
            <DataTable
              data={userData}
              columns={[
                { header: "Username", accessor: "username" },
                { header: "Date of Registration", accessor: "createdAt" },
                { header: "User ID", accessor: "id" },
                { header: "Email", accessor: "email" },
                {
                  header: "Admin",
                  accessor: "isAdmin",
                  format: (value) => (value ? "Admin" : "Not Admin"),
                },
              ]}
              actions={(row) => (
                <div className="flex space-x-4">
                  <div className="flex flex-col mr-2">
                    <label
                      htmlFor="admin-toggle"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Set Admin role
                    </label>
                    <input
                      id="admin-toggle"
                      type="checkbox"
                      checked={Boolean(row.isAdmin)}
                      onChange={() => handleToggleAdmin(row)}
                      aria-label={`Toggle admin for user ${row.username}`}
                      className="focus:outline-none focus:ring-2 focus:ring-buttonDarkHover"
                    ></input>
                  </div>
                  <button
                    onClick={() => row.id && handleDeleteUser(row.id, isAdmin)}
                    aria-label={`Delete user ${row.username}`}
                    className="focus:outline focus:outline-2 focus:outline-buttonDarkHover rounded"
                  >
                    <Trashcan />
                  </button>
                </div>
              )}
            />
          </div>
        </section>
        <section aria-labelledby="posts-section">
          <h5
            id="posts-section"
            className="text-xl md:text-2xl font-semibold text-primary mt-6 md:mt-8 text-center"
          >
            Posts
          </h5>
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
