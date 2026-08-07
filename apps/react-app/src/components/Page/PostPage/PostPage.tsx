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
      _id: "12",
      author: "Rosita Fresita",
      content: "So pretty!",
      createdAt: "12/07/20261",
      updatedAt: "06/08/2026",
      __v: "0",
    },
    {
      _id: "13",
      author: "Pancho Pantera",
      content: "Cute!",
      createdAt: "13/07/20261",
      updatedAt: "05/08/2026",
      __v: "0",
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
        <Banner postImage={post.image} postTitle={post.title}/>
        {/* ListoACT 3 - Send postImage and postTitle as props to Banner component */}
      </BannerContainer>

      <DescriptionContainer item>
        {/* ListoACT 1 - Render post description */}
        <p>{post.description}</p>
      </DescriptionContainer>

      <CommentsContainer item>
        {/* ListoACT 1 - Render Comments component */}
        <Comments commentsArray={post.comments.map(({_id, author, content}) =>({id:_id, author, content}))} />
        {/* ListoACT 3 - Send comments as prop to Comments component */}
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;
