import { useContext, useEffect, useState } from 'react';
import { Post } from '../../types';
import CategoryButtonGroup from '../CategoryButtonGroup';
import CreatePostButton from '../CreatePostButton';
import PostList from '../PostList';
import { PostContext } from '../../context';
import Form from '../Form';

function HomePage() {
  const { posts, getPosts } = useContext(PostContext);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [open, setOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState('All');

  const handleOpenForm = (defaultValues?: Post) => {
    setOpen(true);
    if (defaultValues) setSelectedPost(defaultValues);
  };

  const handleSelectCategory = (category: string) => {
    setCategorySelected(category);
  };

  useEffect(() => {
    getPosts(categorySelected);
  }, [categorySelected]);

  return (
    <>
      <CreatePostButton handleOpenForm={handleOpenForm} />
      <CategoryButtonGroup categorySelected={categorySelected} handleSelectCategory={handleSelectCategory} />
      <PostList posts={posts} handleOpenForm={handleOpenForm} />
      <Form open={open} post={selectedPost} categorySelected={categorySelected} setOpen={setOpen} setSelectedPost={setSelectedPost} />
    </>
  );
}

export default HomePage;
