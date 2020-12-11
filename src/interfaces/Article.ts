import { User } from "@/interfaces/User";

/**
 * Represents an Article object.
 */
export interface Article {
  _id: string;
  author: string | User;
  name: string;
  title: string;
  tags: string[];
  brief: string;
  image: string;
  attr: string;
  text: string;
  public: boolean;
  clicks: number;
  comments: Comment[];
  updatedAt: number;
  createdAt: number;
}
