// Import Timestamp
import { db } from "@/utils/firebase";
import { User, getAuth } from "firebase/auth";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  updateDoc,
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
    throw new Error("User not authenticated");
  }

  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const username = userSnap.exists() ? userSnap.data().username : "Unknown";

    const postWithUser = {
      ...post,
      userId: user.uid,
      username,
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "posts"), postWithUser);
    console.log("Post added successfully");
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

export const likePost = async (postId: string) => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  if (!userId) {
    throw new Error("User must be logged in to like a post.");
  }

  const postRef = doc(db, "posts", postId);

  try {
    await updateDoc(postRef, {
      likes: increment(1),
      likesBy: arrayUnion(userId),
    });
  } catch (error) {
    console.error("Error liking post:", error);
    // Initialize fields if they don't exist
    await updateDoc(postRef, {
      likes: 1,
      likesBy: [userId],
    });
  }
};
export const unlikePost = async (postId: string) => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  if (!userId) {
    throw new Error("User must be logged in to unlike a post.");
  }

  const postRef = doc(db, "posts", postId);

  try {
    await updateDoc(postRef, {
      likes: increment(-1),
      likesBy: arrayRemove(userId),
    });
  } catch (error) {
    console.error("Error unliking post:", error);
  }
};
