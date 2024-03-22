import React, { createContext, useState, useCallback } from 'react';

import { Post } from '../types';

interface PostContextProps {
  posts: Post[] | null;
  getPosts: (category: string) => void;
  deletePost: (postId: string) => void;
}

interface PostProviderProps {
  children: React.JSX.Element;
}

export const PostContext = createContext<PostContextProps>({
  posts: [] || null,
  getPosts: () => {},
  deletePost: () => {}
});

const postList = [
  {
    id: '1.23',
    title: 'A good place to camp',
    image:
      'https://th.bing.com/th/id/R.e0bad63364a867fea652212c254bf869?rik=avtecz5aXVdevA&riu=http%3a%2f%2fwww.viajejet.com%2fwp-content%2fviajes%2fLago-Moraine-Parque-Nacional-Banff-Alberta-Canada.jpg&ehk=6qRhWDqqQAEkSFs%2bHP8p2Bl6XfPbjznSoORh%2bsEJ%2bQE%3d&risl=&pid=ImgRaw&r=0',
    description: 'Beautiful water, incredible landscapes and huge bears everywhere. Everything your soul needs.',
    category: 'Travel',
    comments: [
      {
        id: '2.1',
        author: 'Anonymus',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      {
        id: '2.2',
        author: 'Anonymus',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    ]
  },
  {
    id: '1.24',
    title: 'The average path a grandparent took to get to school',
    image: 'https://th.bing.com/th/id/R.df8ba69a16ad146c6e8cc769fa900ab0?rik=qYqjcnEnWzdXug&pid=ImgRaw&r=0',
    description: "Don't forget to bring your machete in case you encounter the devil or some stones in case witches appear. ",
    category: 'Travel',
    comments: [
      {
        id: '2.1',
        author: 'Anonymus',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    ]
  }
];

export function PostProvider({ children }: PostProviderProps): React.JSX.Element {
  const [serverData, setServerData] = useState(postList);
  const [posts, setPosts] = useState<Post[] | null>(postList);

  const getPosts = useCallback(
    (category: string) => {
      const selectedCategory = serverData.filter((post: Post) => post.category === category);
      const newPosts = category === 'All' ? serverData : selectedCategory;
      setPosts(newPosts);
    },
    [serverData]
  );

  const deletePost = useCallback(
    (postId: string) => {
      setServerData((prev) => {
        const filteredList = prev.filter((post: Post) => post.id !== postId);
        return filteredList;
      });
      getPosts('All');
    },
    [getPosts]
  );

  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
        deletePost
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
