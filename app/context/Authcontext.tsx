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
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  username: string | null;
  isloading: boolean;
  isAdmin: boolean;
  registerUser: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  username: null,
  isloading: true,
  isAdmin: false,
  registerUser: async () => {},
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
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
          setIsAdmin(userDoc.data().isAdmin || false);
        }
      } else {
        setUsername(null);
        setIsAdmin(false);
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
      const usersRef = collection(db, "users");
      const usernameQuery = query(usersRef, where("username", "==", username));
      const usernameSnapshot = await getDocs(usernameQuery);

      if (!usernameSnapshot.empty) {
        throw new Error(
          "Username already exists, please choose another username"
        );
      }

      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userRef = doc(db, "users", userInfo.user.uid);
      await setDoc(userRef, {
        username,
        email: userInfo.user.email,
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

  return (
    <AuthContext.Provider
      value={{
        user,
        username,
        isloading,
        isAdmin,
        registerUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
