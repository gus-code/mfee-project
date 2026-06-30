import { useCallback, useContext, useEffect, useState } from "react";


import { Category } from "../../../types";
import { PostContext } from "../../../context";
import CategoryButtonGroup from "../../CategoryButtonGroup/CategoryButtonGroup";
import CreatePostButton from "../../CreatePostButton/CreatePostButton";
import Loading from "../../Loading/Loading";
import PostList from "../../PostList/PostList";


const categories: Category[] = [
  { id: "663fef70d513515319551d1f", name: "Travel" },
  { id: "663fef70d513515319546d1f", name: "Food" },
];

function HomePage() {
  const { posts, getPosts } = useContext(PostContext);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleOpenForm = () => { };

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
