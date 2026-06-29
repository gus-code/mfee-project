import {
  Container,
  BannerContainer,
  CommentsContainer,
  DescriptionContainer,
} from "./PostPage.styles";
import Banner from "../../Banner";
import Comments from "../../Comments"

const post = {
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJg9MMmYtrfdK60hhoaDdGwc3UxWqEWe4f4g&s",
  title: "Traveling to Italy!",
  postID: "post-198312",
  comments: [
    {
      _id: "121314",
      author: "Albert",
      content: "I had such an amazing time visiting italy too, specially Rome",
      createdAt: "03-08-2025",
      updatedAt: "03-08-2025",
      __v: "0",
    },
  ],
  description: "Traveling Around the globe is so awesome!",
};

function PostPage() {
  return (
    <Container container>
      Post page
      <BannerContainer item>
        <Banner/>
      </BannerContainer>
      <DescriptionContainer item>
        <p>{post.description}</p>
      </DescriptionContainer>
      <CommentsContainer item>
        <Comments/>
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;
