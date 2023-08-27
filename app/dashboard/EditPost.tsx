"use client";

import { Comment } from "@prisma/client";
import Image from "next/image";
import Toggle from "./Toggle";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
type Props = {
  avatar: string;
  name: string;
  title: string;
  comments: Comment[];
  id: string;
};
const EditPost = ({ avatar, name, title, comments, id }: Props) => {
  const [toggle, setToggle] = useState(false);
  const deleteToastID = useRef("");

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: { id } }),
    {
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting that post", { id: deleteToastID.current });
      },
      onSuccess: (data) => {
        console.log(data);
        toast.success("Post has been deleted", { id: deleteToastID.current });
        queryClient.invalidateQueries(["auth-post"]);
      },
    }
  );

  const deletePost = () => {
    deleteToastID.current = toast.loading("Deleting your post.", {
      id: deleteToastID.current,
    });
    mutate(id);
    setToggle(true);
  };

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments.length} Comments
          </p>
          <button
            onClick={() => {
              setToggle(true);
            }}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
};

export default EditPost;
