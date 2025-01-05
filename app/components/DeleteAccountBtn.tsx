"use client";

import {
  deleteUser,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";

import { deleteUserData } from "../api/userActions";
import { useAuth } from "../context/Authcontext";

interface FirebaseError {
  code?: string;
  message?: string;
}

interface DeleteAccountBtnProps {
  userId: string;
}

type FormInputs = {
  password: string;
};

export default function DeleteAccountBtn({ userId }: DeleteAccountBtnProps) {
  const router = useRouter();
  const { user, uid } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<"confirm" | "reauth">("confirm");

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  async function handleDeleteAccount() {
    if (!user || !uid) {
      toast.error("No logged-in user found.");
      return;
    }

    try {
      await deleteUserData(uid);
      await deleteUser(user);

      toast.success("Account deleted successfully!");
      router.push("/");
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError.code === "auth/requires-recent-login") {
        setModalStep("reauth");
      } else {
        toast.error(
          `Error deleting account: ${firebaseError.message || error}`
        );
        setIsModalOpen(false);
      }
    }
  }

  async function onSubmit(formData: FormInputs) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser || !currentUser.email) {
      toast.error("User data is missing for re-auth.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        formData.password
      );
      await reauthenticateWithCredential(currentUser, credential);
      await deleteUserData(uid!);
      await deleteUser(currentUser);

      toast.success("Account successfully deleted!");
      router.push("/");
    } catch (error) {
      const firebaseError = error as FirebaseError;
      toast.error(firebaseError.message || "Failed to re-authenticate.");
    } finally {
      reset();
      setIsModalOpen(false);
      setModalStep("confirm");
    }
  }

  useEffect(() => {
    if (!isModalOpen) {
      setModalStep("confirm");
      reset();
    }
  }, [isModalOpen, reset]);

  const shouldHideButton = uid !== userId;

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

      {!shouldHideButton && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-card1 text-black font-medium p-4 rounded-md hover:scale-105 transform transition-transform m-4"
        >
          Delete My Account
        </button>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
          onKeyDown={(e) => e.key === "Escape" && setIsModalOpen(false)}
          tabIndex={-1}
        >
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm">
            {modalStep === "confirm" ? (
              <>
                <h2 className="text-lg font-bold mb-2">Confirm Deletion</h2>
                <p className="text-sm mb-4">
                  Are you sure you want to delete your account? This cannot be
                  undone.
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1 rounded-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold mb-2">Re-Enter Password</h2>
                <p className="text-sm mb-4">
                  Please re-enter your password to confirm account deletion.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="border border-gray-300 rounded w-full px-2 py-1 mt-1"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-3 py-1 rounded-md border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
