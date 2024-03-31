import CreatePostButton from "../CreatePostButton";
import CategoryButtonGroup from "../CategoryButtonGroup";
import PostList from "../PostList";

function HomePage() {
  return (
    <>
      <CreatePostButton />
      <CategoryButtonGroup />
      <PostList />
    </>
  )
}

export default HomePage;
