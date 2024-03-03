import { useContext, useState } from "react";
import CategoryButtonGroup from "../../CategoryButtonGroup";
import CreatePostButton from "../../CreatePostButton";
import PostList from "../../PostList";
import { Post } from "../../../types";
import { PostContext } from "../../../context";
import Loading from "../../Loading";
import Form from "../../Form";

function HomePage() {
  const {
    posts,
    // getPosts
  } = useContext(PostContext);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [open, setOpen] = useState(false);
  const categorySelected = "All";

  const handleOpenForm = (defaultValues?: Post) => {
    setOpen(true);
    if (defaultValues) setSelectedPost(defaultValues);
  };

  // const handleSelectCategory = (category: string) => {
  // getPosts(category)
  // Activity 6 - Use the useState hook to handle the state of categorySelected
  // };

  // Activity 6 - Use the useEffect hook to call the getPosts function only when the component is rendered for the first time

  if (!posts) return <Loading />;

  return (
    <>
      <CreatePostButton handleOpenForm={handleOpenForm} />
      {/* Activity 3 - Send categorySelected and handleSelectCategory props */}
      <CategoryButtonGroup />
      <PostList posts={posts} handleOpenForm={handleOpenForm} />
      <Form
        open={open}
        post={selectedPost}
        categorySelected={categorySelected}
        setOpen={setOpen}
        setSelectedPost={setSelectedPost}
      />
    </>
  );
}

export default HomePage;
