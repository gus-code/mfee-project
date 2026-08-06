import {
  Container,
  BannerContainer,
  CommentsContainer,
  DescriptionContainer,
} from "./PostPage.styles";

//import components
import Banner from "../../Banner";
import Comments from "../../Comments";

const post = {
  image: "https://tse2.mm.bing.net/th/id/OIP.MgpgSarYfCmuLI85J3Du2gHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  title: "Red Flowers",
  postID: "287",
  comments: [
    {
      _id: "23",
      author: "Pancho Pantera",
      content: "Wow!",
      createdAt: "12/07/2025",
      updatedAt: "11/01/2026",
      __v: "",
    },
  ],
  description: "It's a pretty red flower",
}; // ListoACT 1 - Fill all this properties with random data

function PostPage() {
  return (
    <Container container>
      Post page
      <BannerContainer item>
        {/* ListoACT 1 - Render Banner component */}
        <Banner />
      </BannerContainer>

      <DescriptionContainer item>
        {/*ListoACT 1 - Render post description */}
        <p>{post.description}</p>
      </DescriptionContainer>

      <CommentsContainer item>
        {/* ListoACT 1 - Render Comments component */}
        <Comments />
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;
