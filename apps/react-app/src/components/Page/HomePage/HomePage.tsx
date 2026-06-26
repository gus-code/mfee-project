import PostList from "../../PostList";
import CategoryButtonGroup from "../../CategoryButtonGroup";
import CreatePostButton from "../../CreatePostButton";
import { Category } from "../../../types";

const categories: Category[] = [
  { id: "123", name: "Travel" },
  { id: "1234", name: "Food" },
];
const selectedCategory: Category = { id: "123", name: "Travel" };
const posts = [
  {
    id: "345",
    title: "The average path a grandparent took to get to school",
    image:
      "https://th.bing.com/th/id/R.df8ba69a16ad146c6e8cc769fa900ab0?rik=qYqjcnEnWzdXug&pid=ImgRaw&r=0",
    description:
      "Don't forget to bring your machete in case you encounter the devil or some stones in case witches appear. ",
    category: null,
    comments: ["13242"],
  },
];

function HomePage() {
  const handleOpenForm = () => {};
  const handleSelectCategory = (category: Category) => {
    console.log(category);
  };

  return (
    <>
      <CreatePostButton handleOpenForm={handleOpenForm} />
      <CategoryButtonGroup
        categories={categories}
        selectedCategory={selectedCategory}
        handleSelectCategory={handleSelectCategory}
      />

      <PostList posts={posts} handleOpenForm={handleOpenForm} />
    </>
  );
}

export default HomePage;
