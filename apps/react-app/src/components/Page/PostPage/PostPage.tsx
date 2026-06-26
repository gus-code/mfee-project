import Banner from "../../Banner";
import Comments from "../../Comments/Comments";
import {
  Container,
  BannerContainer,
  CommentsContainer,
  DescriptionContainer,
} from "./PostPage.styles";

const post = {
  image: "url",
  title: "Post Title",
  postID: "post-id",
  comments: [
    {
      _id: "comment-id",
      author: "John Doe",
      content: "This is a sample comment.",
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
      __v: 0,
    },
  ],
  description: "This is a sample post description.",
}; // ACT 1 - Fill all this properties with random data

function PostPage() {
  return (
    <Container container>
      Post page
      <BannerContainer item>
        <Banner postImage={post.image} postTitle={post.title} />
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
