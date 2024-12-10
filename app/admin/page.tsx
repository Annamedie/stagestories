"use client";
import { useEffect, useState } from "react";
import { fetchPosts } from "../api/postActions";
import { fetchAllUsers } from "../api/userActions";
import { Post, Users } from "../types/dataTypes";

function AdminPage() {
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

  return (
    <div>
      <h1 className="text-white">Admin Page</h1>
      <p className="text-white">Only accessible by admins</p>
      <h2 className="text-white mt-8">Users</h2>
      <table className="text-white border-collapse w-full mt-4">
        <thead>
          <tr>
            <th className="border-b border-white p-2 text-left">Username</th>
            <th className="border-b border-white p-2 text-left">
              Date of Registration
            </th>
            <th className="border-b border-white p-2 text-left">User ID</th>
            <th className="border-b border-white p-2 text-left">Admin</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td className="border-b border-white p-2">{user.username}</td>
              <td className="border-b border-white p-2">
                {user.createdAt.toDate().toLocaleDateString()}
              </td>
              <td className="border-b border-white p-2">{user.id}</td>
              <td className="border-b border-white p-2">
                {user.isAdmin ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-white mt-8">Posts</h2>
      <table className="text-white border-collapse w-full mt-4">
        <thead>
          <tr>
            <th className="border-b border-white p-2 text-left">Username</th>
            <th className="border-b border-white p-2 text-left">
              Date of post
            </th>
            <th className="border-b border-white p-2 text-left">Post Id</th>
            <th className="border-b border-white p-2 text-left">Artist</th>
            <th className="border-b border-white p-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {postData.map((post) => (
            <tr key={post.id}>
              <td className="border-b border-white p-2">
                {post.username ? post.username : "Usename missing"}
              </td>
              <td className="border-b border-white p-2">
                {post.createdAt.toDate().toLocaleDateString()}
              </td>
              <td className="border-b border-white p-2">{post.id}</td>
              <td className="border-b border-white p-2">{post.artistBand}</td>
              <td className="border-b border-white p-2 truncate">
                {post.review ? post.review : "Review missing"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;