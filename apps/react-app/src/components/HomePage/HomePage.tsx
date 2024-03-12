import CategoryButtonGroup from "../CategoryButtonGroup";
import CreatePostButton from "../CreatePostButton";
import PostList from "../PostList";

function HomePage() {
  return <>
    <CreatePostButton/>
    <CategoryButtonGroup />
    <PostList/>
  </>;
}

export default HomePage;
