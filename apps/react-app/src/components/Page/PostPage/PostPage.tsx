import {
  Container,
  BannerContainer,
  CommentsContainer,
  DescriptionContainer,
} from "./PostPage.styles";
import { useEffect, useState } from "react";
import {getPost} from "../../../api/endpoints/posts";

import Banner from "../../Banner";
import Comments from "../../Comments";
import { PostN } from "apps/react-app/src/types";

//Example
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

const ID  = "f54da2fead6bd076594b66fc"

function PostPage(){
  // ListoACT 9 - Use postID variable to fetch the post data
  const [loginError, setLoginError] = useState<string | null>(null);
  const [postData, setPostData] = useState<PostN | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetPosts = () => {
    setLoginError(null);

    getPost({
      postID:ID,
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
  }, []);

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
