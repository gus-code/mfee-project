import React, { createContext, useCallback, useEffect, useState } from "react";

import { NewPost, Post } from "../types";

interface PostContextProps {
  posts: Post[] | null;
  getPosts: (categoryID?: string) => void;
  removePost: (postID: string) => void;
  createOrUpdatePost: ({
    method,
    newPost,
    postID
  }: {
    method: "post" | "patch";
    newPost: NewPost;
    postID?:string
  }) => void;
}

interface PostProviderProps {
  children: React.JSX.Element;
}

export const PostContext = createContext<PostContextProps>({
  posts: [] || null,
  getPosts: () => {},
  removePost: () => {},
  createOrUpdatePost: () => {},
});

const postList: Post[] = [
  {
    id: "664128a212f505651c18d676",
    title: "A nice place to camp",
    image:
      "https://th.bing.com/th/id/R.e0bad63364a867fea652212c254bf869?rik=avtecz5aXVdevA&riu=http%3a%2f%2fwww.viajejet.com%2fwp-content%2fviajes%2fLago-Moraine-Parque-Nacional-Banff-Alberta-Canada.jpg&ehk=6qRhWDqqQAEkSFs%2bHP8p2Bl6XfPbjznSoORh%2bsEJ%2bQE%3d&risl=&pid=ImgRaw&r=0",
    description: "Post 2.0 description",
    category: {
      _id: "663fef70d513515319551d1f",
      name: "Travel",
      createdAt: "2024-05-11T22:21:36.759Z",
      updatedAt: "2024-05-14T13:47:54.653Z",
      __v: 0,
    },
    comments: [
      "6641f7d912f505651c18d68e",
      "66424d2c12f505651c18d91c",
      "66424d3812f505651c18d923",
    ],
  },
  {
    id: "664128a212f505651c18d6kf6",
    title: "Favorite food ;)",
    image:
      "https://th.bing.com/th/id/R.2d66d3ce21d052726c2c527a03da4f4c?rik=3FedcY2H7LDtBw&riu=http%3a%2f%2ftheartofplating.com%2fwp-content%2fuploads%2f2015%2f06%2fEvan_Feature.jpg&ehk=KCxZkONbpjuAYhfpKxoeHgIizR%2fy1U0LM6olKn1d8go%3d&risl=&pid=ImgRaw&r=0",
    description: "Post 2.0 description",
    category: {
      _id: "663fef70d513515319546d1f",
      name: "Food",
      createdAt: "2024-05-11T22:21:36.759Z",
      updatedAt: "2024-05-14T13:47:54.653Z",
      __v: 0,
    },
    comments: [
      "6641f7d912f505651c18d68e",
      "66424d2c12f505651c18d91c",
      "66424d3812f505651c18d923",
    ],
  },
];

export function PostProvider({
  children,
}: PostProviderProps): React.JSX.Element {
  const [serverData, setServerData] = useState(postList);
  const [posts, setPosts] = useState<Post[] | null>(postList);

  const getPosts = useCallback(
    (categoryID?: string) => {
      const selectedCategory = serverData.filter(
        (post: Post) => post.category?._id === categoryID
      );
      const newPosts = categoryID ? selectedCategory : serverData;
      setPosts(newPosts);
    },
    [serverData]
  );

  const createOrUpdatePost = useCallback(
    ({
      method,
      newPost,
      postID,
    }: {
      method: "post" | "patch";
      newPost: NewPost;
      postID?: string;
    }) => {
      const { category: postCategory, ...rest } = newPost;
      const selectedCategory = postList
        ?.map((post) => post.category)
        .filter((category) => category?._id === postCategory)[0];
      if (method === "post") {
        const post: Post = {
          id: Math.random().toString(),
          category: selectedCategory,
          comments: [],
          ...rest,
        };
        setServerData((prev) => [...prev, post]);
      }
      if (method === "patch") {
        setServerData((prev) =>
          prev.map((post) =>
            post.id === postID
              ? { ...post, ...newPost, category: selectedCategory }
              : post
          )
        );
      }
    },
    []
  );

  const removePost = useCallback((postID: string) => {
    setServerData((prev) => prev.filter((post: Post) => post.id !== postID));
    // ACT 7 - Use createAlert function to notify the user that the item was successfully deleted
  }, []);

  useEffect(() => setPosts(serverData), [serverData]);

  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
        removePost,
        createOrUpdatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
