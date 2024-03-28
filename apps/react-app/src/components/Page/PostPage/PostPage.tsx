import { useContext, useEffect, useState } from 'react';
import Banner from '../../Banner';
import Comments from '../../Comments';
import { Container, BannerContainer, CommentsContainer, DescriptionContainer } from './PostPage.styles';
import { PostContext } from '../../../context';
import { useParams } from 'react-router-dom';

function PostPage() {
  const { id } = useParams();
  const { post, getPost } = useContext(PostContext);

  useEffect(() => {
    getPost(id || '');
  }, []);

  return (
    <Container container>
      <BannerContainer item>
        <Banner title={post?.title} image={post?.image} />
      </BannerContainer>
      <DescriptionContainer item>
        <p>{post?.description}</p>
      </DescriptionContainer>
      <CommentsContainer item>
        <Comments comments={post?.comments} />
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;
