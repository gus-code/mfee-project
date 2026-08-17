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
import { PostN } from "apps/react-app/src/types";


// ListoACT 10 - Get postID from route params
function PostPage(){
  // ListoACT 9 - Use postID variable to fetch the post data
  const { ID } = useParams();
  // usar el id predeterminado en la variable ID o ingresar un id desde la url en el navegador
  const postId = ID ?? "60024592a4ce39d8173cdbf6";
  const [loginError, setLoginError] = useState<string | null>(null);
  const [postData, setPostData] = useState<PostN | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetPosts = () => {
    setLoginError(null);

    getPost({
      postID: postId,
      onLoading: (loading) => setIsLoading(loading),
      onSuccess: (data: PostN) => {
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

  if (isLoading || !postData) return <p>Cargando...</p>;
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
