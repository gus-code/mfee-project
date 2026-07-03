
import { useQuery } from '@tanstack/react-query';
import Banner from "../../Banner";
import Comments from "../../Comments/Comments";
import {
  Container,
  BannerContainer,
  CommentsContainer,
  DescriptionContainer,
} from "./PostPage.styles";
import { getPostById } from "../../../api";
import { Post } from "../../../types";
import Loading from "../../Loading";

interface PostPageProps {
  postId?: string;
}

function PostPage({ postId }: PostPageProps) {

   // ACT 10 - Get postID from route params

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
      Post page
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
