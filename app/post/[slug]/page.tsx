"use client";

import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Post";
import { PostDetail, PostType } from "@/app/types/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

type URL = {
  params: {
    slug: string;
  };
};

const PostDetail = (url: URL) => {
  const { data, isLoading } = useQuery<PostDetail>({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ["detail-post"],
  });

  if (isLoading) return "Loading....";
  console.log(data);

  return (
    <div>
      <Post
        id={data?.id || ""}
        avatar={data?.user.image || ""}
        name={data?.user.name || ""}
        postTitle={data?.title || ""}
        comments={data?.Comment || []}
      />
      <AddComment id={data?.id || ""} />
      {data?.Comment.map((comment) => (
        <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={comment.user.image || ""}
              alt="avartar"
            />
            <h3 className="font-bold">{comment.user.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="py-4">{comment.message}</div>
        </div>
      ))}
    </div>
  );
};

export default PostDetail;
