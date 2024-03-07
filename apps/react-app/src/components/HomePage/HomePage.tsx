import CategoryButtonGroup from "../CategoryButtonGroup";
import CreatePostButton from "../CreatePostButton";
import PostList from "../PostList";

function HomePage() {
  return <>
  <CreatePostButton></CreatePostButton>
  <CategoryButtonGroup></CategoryButtonGroup>
  <PostList></PostList>
  </>;
}

export default HomePage;
