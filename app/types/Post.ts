import { Post, User, Comment } from "@prisma/client";

export type PostType = Post & {
  user: User;
  Comment: Comment[];
};

export type PostDetail = Post & {
  user: User;
  Comment: (Comment & {
    user: User;
  })[];
};
