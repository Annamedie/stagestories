import { db } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { Comment } from "../types/dataTypes";

export async function addComment(comment: Partial<Comment>) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const commentRef = collection(db, "comments");
  const newComment = {
    ...comment,
    createdAt: serverTimestamp(),
    userId: user.uid,
  };

  await addDoc(commentRef, newComment);
}

export async function fetchCommentsByPostId(
  postId: string
): Promise<Comment[]> {
  try {
    const commentsRef = collection(db, "comments");
    const queryComments = query(commentsRef, where("postId", "==", postId));
    const querySnapshot = await getDocs(queryComments);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt?.toDate().toLocaleDateString() || null;
      return { id: doc.id, ...data, createdAt } as Comment;
    });
  } catch (error) {
    console.error("Error fetching comments by post id: ", error);
    throw error;
  }
}

export async function deleteComment(commentId: string) {
  try {
    const commentRef = doc(db, "comments", commentId);
    await deleteDoc(commentRef);
  } catch (error) {
    console.error("Error deleting comment: ", error);
    throw new Error("Failed to delete comment");
  }
}
