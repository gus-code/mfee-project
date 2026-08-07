import { useState, useCallback } from "react";

import Form from "../../Form";
import PostList from "../../PostList";
import CategoryButtonGroup from "../../CategoryButtonGroup";
import { Category, Post } from "../../../types";
import Loading from "../../Loading";
import CreatePostButton from "../../CreatePostButton";

import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getPostByCategory, getAllPost } from "../../../api";

function HomePage() {
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const {
    data: categories,
    isLoading: loadingCategories,
  } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  const {
    data: posts,
    isLoading: loadingPosts,
  } = useQuery<Post[]>({
    queryKey: ['posts', selectedCategory?.id ?? 'all'],
    queryFn: () =>
      selectedCategory ? getPostByCategory(selectedCategory.id) : getAllPost(),
  });

  const handleOpenForm = (defaultValues?: Post) => {
    setOpen(true);
    if (defaultValues) setSelectedPost(defaultValues);
  };

  const handleSelectCategory = useCallback(
    (category: Category) => {
      const isCategoryAlreadySelected = category.id === selectedCategory?.id;
      setSelectedCategory(isCategoryAlreadySelected ? null : category);
    },
    [selectedCategory]
  );

  if (loadingCategories || !categories) return <Loading />;

  if (loadingPosts || !posts) return <Loading />;

  return (
    <>
      <CreatePostButton handleOpenForm={handleOpenForm} />
      <CategoryButtonGroup
        categories={categories}
        selectedCategory={selectedCategory}
        handleSelectCategory={handleSelectCategory}
      />

      <PostList
        posts={posts}
        selectedCategory={selectedCategory}
        handleOpenForm={handleOpenForm}
      />

      <Form
        open={open}
        post={selectedPost}
        categories={categories}
        selectedCategory={selectedCategory}
        setOpen={setOpen}
        setSelectedPost={setSelectedPost}
      />
    </>
  );
}

export default HomePage;
