// Import Timestamp
import { db } from "@/utils/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { Post } from "../types/dataTypes";

export const fetchPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();

      if (data.showDate instanceof Timestamp) {
        data.showDate = data.showDate.toDate().toISOString();
      }

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
      if (data.showDate instanceof Timestamp) {
        data.showDate = data.showDate.toDate().toISOString();
      }

      return { id: docSnap.id, ...data } as Post;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};
