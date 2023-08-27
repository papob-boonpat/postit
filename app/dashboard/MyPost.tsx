"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPost } from "../types/AuthPosts";
import EditPost from "./EditPost";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

const MyPost = () => {
  const { data, isLoading } = useQuery<AuthPost>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-post"],
  });

  if (isLoading) return <h1>Posts are loading....</h1>;

  console.log(data);
  return (
    <div>
      {data?.Post.map((post) => {
        return (
          <EditPost
            key={post.id}
            id={post.id}
            avatar={data.image || ""}
            comments={post.Comment}
            name={data.name || ""}
            title={post.title}
          />
        );
      })}
    </div>
  );
};

export default MyPost;
