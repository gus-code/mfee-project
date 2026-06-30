import { useCallback, useContext, useEffect, useState } from "react";


import { Category, Post } from "../../../types";
import { PostContext } from "../../../context";

import Form from "../../Form";
import CategoryButtonGroup from "../../CategoryButtonGroup/CategoryButtonGroup";
import CreatePostButton from "../../CreatePostButton/CreatePostButton";
import Loading from "../../Loading/Loading";
import PostList from "../../PostList/PostList";

const categories: Category[] = [
  { id: "663fef70d513515319551d1f", name: "Travel" },
  { id: "663fef70d513515319546d1f", name: "Food" },
];

function HomePage() {
  const [openForm, setOpenForm] = useState(false);
  const { posts, getPosts } = useContext(PostContext);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleOpenForm = (defaultValues?: Post) => {
    setOpenForm(true);
    if (defaultValues) setSelectedPost(defaultValues);
  };

  const handleSelectCategory = useCallback(
    (category: Category) => {
      const isCategoryAlreadySelected = category.id === selectedCategory?.id;
      getPosts(isCategoryAlreadySelected ? undefined : category.id);
      setSelectedCategory(isCategoryAlreadySelected ? null : category);
    },
    [selectedCategory, getPosts]
  );

  useEffect(getPosts, [getPosts]);

  if (!posts) return <Loading />;

  return (
    <>
      <CreatePostButton handleOpenForm={handleOpenForm} />
      <CategoryButtonGroup
        categories={categories}
        selectedCategory={selectedCategory}
        handleSelectCategory={handleSelectCategory}
      />
      <PostList posts={posts} handleOpenForm={handleOpenForm} selectedCategory={null} />
      <Form
        open={openForm}
        post={selectedPost}
        setOpen={setOpenForm}
        setSelectedPost={setSelectedPost}
      />
    </>
  );
}

export default HomePage;
