import { useState, useContext, useEffect, useCallback } from "react";

import Form from "../../Form";
import PostList from "../../PostList";
import CategoryButtonGroup from "../../CategoryButtonGroup";
import {
  PostContext,
  // SnackbarContext
} from "../../../context";
import { CategoriesResponse, Category, Post } from "../../../types";
import Loading from "../../Loading";
import CreatePostButton from "../../CreatePostButton";
import { getCategories } from "../../../api";

function HomePage() {
  // const createAlert = useContext(SnackbarContext);
  const { posts, loadingPosts, getPostList } = useContext(PostContext);
  const [open, setOpen] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleOpenForm = (defaultValues?: Post) => {
    setOpen(true);
    if (defaultValues) setSelectedPost(defaultValues);
  };

  const handleSelectCategory = useCallback(
    async (category: Category) => {
      const isCategoryAlreadySelected = category.id === selectedCategory?.id;
      await getPostList(isCategoryAlreadySelected ? undefined : category.id);
      setSelectedCategory(isCategoryAlreadySelected ? null : category);
    },
    [selectedCategory, getPostList]
  );

  const getCategoriesList = useCallback(async () => {
    const onSuccess = (data: CategoriesResponse[]) => {
      const newRows = data.map((category) => ({
        id: category._id,
        name: category.name,
      }));
      setCategories(newRows);
    };

    const onError = () => {
      // createAlert({
      //   message: "Something went wrong.",
      //   severity: "error",
      // });
    };

    const onLoading = (isLoading: boolean) => {
      setLoadingCategories(isLoading);
    };

    await getCategories({ onSuccess, onError, onLoading });
  }, []);

  useEffect(() => {
    getPostList();
    getCategoriesList();
  }, [getPostList, getCategoriesList]);

  if (!categories || loadingCategories) return <Loading />;

  return (
    <>
      <CreatePostButton handleOpenForm={handleOpenForm} />
      <CategoryButtonGroup
        categories={categories}
        selectedCategory={selectedCategory}
        handleSelectCategory={handleSelectCategory}
      />

      {!posts || loadingPosts ? (
        <Loading />
      ) : (
        <PostList
          posts={posts}
          selectedCategory={selectedCategory}
          handleOpenForm={handleOpenForm}
        />
      )}

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
