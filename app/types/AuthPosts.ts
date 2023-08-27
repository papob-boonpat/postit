import { Post, User, Comment } from "@prisma/client";

export type AuthPost = User & {
  Post: (Post & {
    Comment: Comment[];
  })[];
};
