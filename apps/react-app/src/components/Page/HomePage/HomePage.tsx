import { useCallback, useContext, useEffect, useState } from "react";

import PostList from "../../PostList";
import CategoryButtonGroup from "../../CategoryButtonGroup";
import CreatePostButton from "../../CreatePostButton";
import { Category } from "../../../types";
import { PostContext } from "../../../context";
import Loading from "../../Loading";

const categories: Category[] = [
  { id: "663fef70d513515319551d1f", name: "Travel" },
  { id: "663fef70d513515319546d1f", name: "Food" },
];

function HomePage() {
  const { posts, getPosts } = useContext(PostContext);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleOpenForm = () => {};

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

      <PostList
        posts={posts}
        selectedCategory={selectedCategory}
        handleOpenForm={handleOpenForm}
      />
    </>
  );
}

export default HomePage;
