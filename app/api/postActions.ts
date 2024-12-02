// Import Timestamp
import { db } from "@/utils/firebase";
import { User, getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { Post } from "../types/dataTypes";

export const fetchPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return { id: doc.id, ...data } as Post;
    });
  } catch (error) {
    console.error("Error fetching posts: ", error);
    throw error;
  }
};

export const fetchPostById = async (id: string): Promise<Post | null> => {
  try {
    const docSnap = await getDoc(doc(db, "posts", id));

    if (docSnap.exists()) {
      const data = docSnap.data();

      return { id: docSnap.id, ...data } as Post;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

export const fetchPostsByUserId = async (userId: string) => {
  try {
    const postsRef = collection(db, "posts");
    const queryPost = query(postsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(queryPost);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, ...data } as Post;
    });
  } catch (error) {
    console.error("Error fetching posts by user id: ", error);
    throw error;
  }
};

export const addPost = async (post: Post) => {
  const auth = getAuth();
  const user = auth.currentUser as User | null;
  if (!user) {
    console.error("User not authenticated");
    throw new Error("User not authenticated");
  }

  try {
    console.log(user);
    const postWithUser = {
      ...post,
      userId: user.uid,
      createdAt: serverTimestamp(),
    };
    await addDoc(collection(db, "posts"), postWithUser);
    console.log("Post added successfully");
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};
