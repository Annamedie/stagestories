"use client";

import { auth, db } from "@/utils/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { Users } from "../types/dataTypes";

interface AuthContextType {
  user: User | null;
  username: string | null;
  isloading: boolean;
  registerUser: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchAllUsers: () => Promise<Users[]>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  username: null,
  isloading: true,
  fetchAllUsers: async () => [],
  registerUser: async () => {},
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUsername(userDoc.data().username || null);
        }
      } else {
        setUsername(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const registerUser = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userRef = doc(db, "users", userInfo.user.uid);
      await setDoc(userRef, {
        username,
        isAdmin: false,
        createdAt: Timestamp.now(),
      });
      setUsername(username);
    } catch (error) {
      console.error("Error registering user: ", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error logging in: ", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setUsername(null);
    } catch (error) {
      console.error("Error logging out: ", error);
      throw error;
    }
  };

  const fetchAllUsers = async () => {
    try {
      const userCollection = collection(db, "users");
      const usersSnapshot = await getDocs(userCollection);
      const usersData = usersSnapshot.docs.map((doc) => ({
        userId: doc.id,
        ...doc.data(),
      }));
      return usersData as (Users & { userId: string })[];
    } catch (error) {
      console.error("Error fetching users: ", error);
      throw error;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        username,
        isloading,
        registerUser,
        login,
        logout,
        fetchAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
