import { getAuth } from "firebase/auth";
import { Comment } from "../types/dataTypes";

function addComment(comment: Comment) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
}
