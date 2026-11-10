import {
  Container,
  BannerContainer,
  CommentsContainer,
  DescriptionContainer,
} from "./PostPage.styles";

import Banner from "../../Banner";
import Comments from "../../Comments";

const post = {
  image: "https://ts.accenture.com/sites/BrandSpace/Image%20Library/Agribusiness%20-%20Brand-Approved-GettyImages-1144627849.jpeg",
  title: "Title 1",
  postID: "post-001",
  comments: [
    {
      _id: "001",
      author: "jane_doe",
      content: "Great job!",
      createdAt: "10/20/2026",
      updatedAt: "10/20/2026",
      __v: "",
    },
    {
      _id: "002",
      author: "jon.doe",
      content: "Hello world!",
      createdAt: "10/25/2026",
      updatedAt: "10/25/2026",
      __v: "",
    },
  ],
  description: "Description as part of Act 1",
};

function PostPage() {
  return (
    <Container container>
      Post page
      <BannerContainer item>
        <Banner postTitle={post.title} postImage={post.image} />
      </BannerContainer>
      <DescriptionContainer item>
        <p>{post.description}</p>
      </DescriptionContainer>
      <CommentsContainer item>
        <Comments comments={post.comments} />
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;
