export interface User {
  id?: string;
  username: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface Post {
  id?: string;
  content: string;
  createdAt: Date;
  dateOfEvent: string;
  userId: string;
  artist: string;
  location: string;
  venue: string;
  rating: number;
  tourName?: string;
  imageUrl?: string;
  topTracks?: string[];
  emoji?: string[];
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
