import {
  Container,
  BannerContainer,
  CommentsContainer,
  DescriptionContainer,
} from "./PostPage.styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getPost} from "../../../api/services/posts";

import Banner from "../../Banner";
import Comments from "../../Comments";
import { Post } from "apps/react-app/src/types";
import Loading from "../../Loading";


function PostPage(){
  
  const { ID } = useParams();
  // usar el id predeterminado en la variable ID o ingresar un id desde la url en el navegador
  const postId = ID ?? "f5a1d4abd168ba375a9c199a";
  const [loginError, setLoginError] = useState<string | null>(null);
  const [postData, setPostData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetPosts = () => {
    setLoginError(null);

    getPost({
      postID: postId,
      onLoading: (loading) => setIsLoading(loading),
      onSuccess: (data: Post) => {
        setPostData(data);
      },
      onError: (error) => {
        setLoginError(
          (error.response?.data as any)?.message ?? "No se pudo cargar la información"
        );
      },
    });
  };
  
  useEffect (()=>{
    handleGetPosts();
  }, [ID]);

  if (isLoading || !postData) return <Loading/>;
  if (loginError) return <p>{loginError}</p>;

  return (
    <Container container>
      Post page
      <BannerContainer item>
        {/* ListoACT 1 - Render Banner component */}
        <Banner postImage={postData.image} postTitle={postData.title}/>
        {/* ListoACT 3 - Send postImage and postTitle as props to Banner component */}
      </BannerContainer>

      <DescriptionContainer item>
        {/* ListoACT 1 - Render post description */}
        <p>{postData.description}</p>
      </DescriptionContainer>

      <CommentsContainer item>
        {/* ListoACT 1 - Render Comments component */}
        <Comments
          commentsArray={postData.comments.map((comment) => ({
            ...comment,
          })) as any}
        />
        {/* ListoACT 3 - Send comments as prop to Comments component */}
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;
