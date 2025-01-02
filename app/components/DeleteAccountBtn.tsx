"use client";
import { deleteUser } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { deleteUserData } from "../api/userActions";
import { useAuth } from "../context/Authcontext";

interface DeleteAccountBtnProps {
  userId: string;
}

function DeleteAccountBtn({ userId }: DeleteAccountBtnProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, uid } = useAuth();

  const deleteAccount = async () => {
    if (!user || !uid) {
      toast.error("User must be logged in to delete account.");
      return;
    }
    try {
      await deleteUser(user);
      await deleteUserData(uid);
      toast.success("Account deleted successfully");
      router.push("/");
    } catch (error) {
      if ((error as any).code === "auth/requires-recent-login") {
      }
      toast.error(`Error deleting account: ${error}`);
    } finally {
      setIsModalOpen(false);
    }
  };

  if (uid !== userId) {
    return null;
  }
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

      {/* The button that opens the modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        Delete My Account
      </button>

      {/* Simple modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-2">Confirm Deletion</h2>
            <p className="text-sm mb-4">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 rounded-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={deleteAccount}
                className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteAccountBtn;
