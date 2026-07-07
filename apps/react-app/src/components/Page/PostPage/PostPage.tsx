import { Button, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import {Container,BannerContainer,CommentsContainer,DescriptionContainer,} from "./PostPage.styles";
import Banner from "../../Banner";
import Comments from "../../Comments";
import { PostContext } from "../../../context";
import Loading from "../../Loading";

function PostPage() { 
  const { postID } = useParams();
  const { posts, getPostList, removePost } = useContext(PostContext);
  
  useEffect(() => {
    getPostList();
  }, [getPostList]);

  const currentPost = posts?.find(
    (post) => post._id === postID
  );

  if (!currentPost) {
    return <Loading/>;
  }

  const handleRemovePost = () => {
    if (posts && posts.length > 0) {
    removePost({ postID: currentPost._id });    }
  };

  console.log("Current post:", currentPost);


  return (
    <Container container>    
      <BannerContainer item>
        <Banner postImage={currentPost.image} postTitle={currentPost.title} />
      </BannerContainer>
      <DescriptionContainer item>
        <p>{currentPost.description}</p>
      </DescriptionContainer>
      <CommentsContainer item>
        <Comments comments={currentPost.comments}/>     
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;