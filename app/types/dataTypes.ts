import { Timestamp } from "firebase/firestore";

export interface Users {
  id?: string;
  username: string;
  password?: string;
  isAdmin: boolean;
  createdAt: Timestamp;
}

export interface Post {
  id?: string;
  username?: string;
  review: string;
  createdAt?: Timestamp;
  showDate: string;
  userId?: string;
  artistBand: string;
  location: string;
  venue: string;
  rating: number;
  genre?: string;
  tourName?: string;
  image?: string;
  topTracks?: string[];
  emojis?: string[];
  likes?: number;
  likesBy?: string[];
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
