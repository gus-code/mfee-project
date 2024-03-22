import { useContext, useEffect, useState } from 'react';
import { Post } from '../../types';
import CategoryButtonGroup from '../CategoryButtonGroup';
import CreatePostButton from '../CreatePostButton';
import PostList from '../PostList';
import { PostContext } from '../../context';

function HomePage() {
  const {
    posts,
    getPosts,
    deletePost
  } = useContext(PostContext);

  const [categorySelected, setCategorySelected] = useState('All');

  const handleOpenForm = (defaultValues?: Post) => {
    console.log(defaultValues);
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
    </>
  );
}

export default HomePage;
