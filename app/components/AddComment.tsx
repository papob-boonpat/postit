"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

const AddComment = ({ id }: { id: string }) => {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  const commentToastID = useRef("");
  const { mutate } = useMutation(
    async (data: { title: string; postId: string }) =>
      axios.post("/api/posts/addComment", { ...data }),
    {
      onError: (error) => {
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, {
            id: commentToastID.current,
          });
        }
      },
      onSuccess: (data) => {
        setTitle("");
        setIsDisabled(false);
        toast.success("Added your comment", { id: commentToastID.current });
        queryClient.invalidateQueries(["detail-post"]);
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    commentToastID.current = toast.loading("Adding your comment", {
      id: commentToastID.current,
    });
    mutate({ title, postId: id });
  };

  return (
    <form className="my-8" onSubmit={submitComment}>
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          type="submit"
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-lg disabled:opacity-50 "
        >
          Add Comment
        </button>
        <p
          className={`font-bold ${
            title.length > 300 ? "text-red-700 " : "text-gray-700"
          }`}
        >
          {title.length}/300
        </p>
      </div>
    </form>
  );
};

export default AddComment;
