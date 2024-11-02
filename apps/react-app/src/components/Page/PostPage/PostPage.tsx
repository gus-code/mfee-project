import {
  Container,
  BannerContainer,
  CommentsContainer,
  DescriptionContainer,
} from "./PostPage.styles";

import Banner from "../../Banner";
import Comments from "../../Comments";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post, PostResponse } from "../../../types";
import { AxiosError } from "axios";
import { getPost } from "../../../api";

// const postID = "664128a212f505651c18d676"


function PostPage() {
  // ACT 9 - Use postID variable to fetch the post data
  // ACT 10 - Get postID from route params
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
 
  useEffect(() => {
    const fetchPost = async () => {
      
      const onSuccess = (data: PostResponse) => {
        setPost({
          id: data._id,
          title: data.title,
          image: data.image,
          description: data.description,
          category: data.category,
          comments: data.comments
        });
      };

      const onError = (error: AxiosError) => {
        console.error("Error al obtener el post:", error);
      };

      const onLoading = () => {
      };

      onLoading(); 
      getPost({ postID: id!, onSuccess, onError });
    };

    fetchPost(); 
    
  }, []); 

  return (
    <>
    {post && (
    <Container container>
      Post page
      <BannerContainer item>
        <Banner postImage={post!.image} postTitle={post!.title}/>
      </BannerContainer>
      <DescriptionContainer item>
        <p>{post!.description}</p>
      </DescriptionContainer>
      <CommentsContainer item>
        <Comments comments={post!.comments} id={id!}/>
      </CommentsContainer>
    </Container>)}
    </>
  );
}

export default PostPage;
