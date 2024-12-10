import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

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
