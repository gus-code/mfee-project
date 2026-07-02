import { useContext, useEffect } from "react";
import { Button, Typography } from "@mui/material";

import {
  Container,
  BannerContainer,
  CommentsContainer,
  DescriptionContainer,
} from "./PostPage.styles";

import Banner from "../../Banner";
import Comments from "../../Comments";
import { PostContext } from "../../../context";

const post = {
  image: "https://wallpaper.forfun.com/fetch/e8/e844b4573d679fbcd5717247f25a2b14.jpeg",
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
    {
      _id: "121314",
      author: "Richy",
      content: "Great Content! ",
      createdAt: "03-08-2025",
      updatedAt: "03-08-2025",
      __v: "0",
    },
  ],
  description: "Traveling Around the globe is so awesome!",
};

function PostPage() {
  /*  ========== TEST SNACKBAR ========
  const { posts, getPosts, removePost } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleRemovePost = () => {
    if (posts && posts.length > 0) {
      removePost({ postID: posts[0].id });
    }
  };
*/
  return (
    <Container container>
      Post page
        <Button variant="contained" sx={{ mb: 1.5, width: "fit-content" }} /* == SNACKBAR TEST == onClick={handleRemovePost}*/>
          Remove post test
        </Button>
        
      <BannerContainer item>
        {/* ACT 3 */}
        <Banner postImage={post.image} postTitle={post.title} />
      </BannerContainer>
      <DescriptionContainer item>
        <p>{post.description}</p>
      </DescriptionContainer>
      <CommentsContainer item>
        {/* ACT 3 */}
        <Comments comments={post.comments} />
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;
