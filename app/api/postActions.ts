// Import Timestamp
import { db } from "@/utils/firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { Post } from "../types/dataTypes";

export const fetchPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();

      if (data.showDate instanceof Timestamp) {
        data.showDate = data.showDate.toDate().toISOString();
      }

      // Add the document ID
      return { id: doc.id, ...data } as Post;
    });
  } catch (error) {
    console.error("Error fetching posts: ", error);
    throw error;
  }
};
