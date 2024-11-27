import { Timestamp } from "firebase/firestore";

export interface User {
  id?: string;
  username: string;
  password: string;
  isAdmin: boolean;
  createdAt: Timestamp;
}

export interface Post {
  id?: string;
  review: string;
  createdAt: Timestamp;
  showDate: string;
  userId: string;
  artistBand: string;
  location: string;
  venue: string;
  rating: number;
  tourName?: string;
  photo?: string;
  topTracks?: string[];
  emojis?: string[];
}

export interface Comment {
  id?: string;
  content: string;
  createdAt: Date;
  postId: string;
  userId: string;
}

export interface Like {
  id?: string;
  postId: string;
  userId: string;
}
