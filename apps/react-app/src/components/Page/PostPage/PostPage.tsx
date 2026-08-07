
import { useQuery } from '@tanstack/react-query';
import Banner from "../../Banner";
import Comments from "../../Comments/Comments";
import {
  Container,
  BannerContainer,
  CommentsContainer,
  DescriptionContainer,
} from "./PostPage.styles";
import { Post } from "../../../types";
import Loading from "../../Loading";
import { getPostById } from "../../../api/endpoints";
import { useParams } from 'react-router-dom';

function PostPage() {

  // ACT 10 - Get postID from route params
  const { postId } = useParams();

  const { data: post, isLoading } = useQuery<Post | null>({
    queryKey: ['post', postId],
    queryFn: () => (postId ? getPostById(postId) : Promise.resolve(null)),
    enabled: Boolean(postId),
  });

  if (!postId) return <div>Select a post to view.</div>;
  if (isLoading) return <Loading />;
  if (!post) return <div>Post not found</div>;

  return (
    <Container container>
      <BannerContainer item>
        <Banner postImage={post.image} postTitle={post.title} />
      </BannerContainer>
      <DescriptionContainer item>
        <p>{post.description}</p>
      </DescriptionContainer>
      <CommentsContainer item>
        <Comments comments={post.comments} postId={postId} />
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;
