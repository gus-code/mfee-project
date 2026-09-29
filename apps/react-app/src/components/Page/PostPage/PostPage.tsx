import {
  Container,
  BannerContainer,
  CommentsContainer,
  DescriptionContainer,
} from "./PostPage.styles";

import Banner from "../../Banner/Banner";
import Comments from "../../Comments/Comments";

// ACT 1 - Fill all this properties with random data (Done)
const post = {
  image: "https://newsroom.accenture.com/branding-assets/media_1cdc3315ee05e0f3d2e334f3568a0123158b5a94e.jpeg?width=2000&format=webply&optimize=medium",
  title: "Sample Post",
  postID: "98765",
  comments: [
    {
      _id: "12365",
      author: "Dave Doe",
      content: "This is a sample comment, also hello.",
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
      __v: "0",
    },
  ],
  description: "This is a sample post description.",
};

function PostPage() {
  return (
    <Container container>
      Post page
      <BannerContainer item>
        {/* ACT 1 - Render Banner component (Done) */
          <Banner />}
      </BannerContainer>
      <DescriptionContainer item>
        {/* ACT 1 - Render post description (Done) */
          <p>{post.description}</p>}
      </DescriptionContainer>
      <CommentsContainer item>
        {/* ACT 1 - Render Comments component (Done) */
          <Comments />}
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;
