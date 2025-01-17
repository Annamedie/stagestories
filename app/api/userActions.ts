import { auth, db } from "@/utils/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import { Users } from "../types/dataTypes";

export const fetchAllUsers = async () => {
  try {
    const usersCollectionRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollectionRef);

    return usersSnapshot.docs.map((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt.toDate().toLocaleDateString();
      return { id: doc.id, ...data, createdAt } as Users;
    });
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
};

export const deleteUserandPostsAdmin = async (
  userId: string,
  isAdmin: boolean
) => {
  const currentUser = auth.currentUser;
  if (!isAdmin && (!currentUser || currentUser.uid !== userId)) {
    throw new Error("User is not authorized to delete this user");
  }
  try {
    const postsRef = collection(db, "posts");
    const postQuery = query(postsRef, where("userId", "==", userId));
    const postsSnapshot = await getDocs(postQuery);
    if (!postsSnapshot.empty) {
      const batch = writeBatch(db);
      postsSnapshot.forEach((docSnap) => {
        const docRef = doc(db, "posts", docSnap.id);
        batch.delete(docRef);
      });
      await batch.commit();
    }

    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);
  } catch (error) {
    console.error("Error deleting user and posts: ", error);
    throw error;
  }
};

export const deleteUserData = async (userId: string) => {
  const currentUser = auth.currentUser;
  if (!currentUser || currentUser.uid !== userId) {
    throw new Error("User is not authorized to delete this user");
  }

  try {
    // References
    const userRef = doc(db, "users", userId);

    //Posts
    const postsCollectionRef = collection(db, "posts");
    const postsQuery = query(postsCollectionRef, where("userId", "==", userId));
    const postsSnapshot = await getDocs(postsQuery);

    //Comments
    const commentsCollectionRef = collection(db, "comments");
    const commentsQuery = query(
      commentsCollectionRef,
      where("userId", "==", userId)
    );
    const commentsSnapshot = await getDocs(commentsQuery);

    const batch = writeBatch(db);

    batch.delete(userRef);

    postsSnapshot.forEach((postDoc) => {
      batch.delete(postDoc.ref);
    });

    commentsSnapshot.forEach((commentDoc) => {
      batch.delete(commentDoc.ref);
    });

    await batch.commit();
  } catch (error) {
    console.error("Error deleting user data: ", error);
    throw error;
  }
};

export const setAdmin = async (
  userId: string,
  isAdmin: boolean,
  newAdminValue: boolean
) => {
  if (!isAdmin) {
    throw new Error("User is not authorized to set admin status");
  }
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      isAdmin: newAdminValue,
    });
  } catch (error) {
    console.error("Error setting admin: ", error);
    throw error;
  }
};
