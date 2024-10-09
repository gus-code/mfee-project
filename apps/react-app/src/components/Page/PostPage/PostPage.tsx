import { useCallback, useEffect, useState } from 'react';

import { Container, BannerContainer, CommentsContainer, DescriptionContainer } from './PostPage.styles';
import Banner from '../../Banner';
import Comments from '../../Comments';
import { getPost } from '../../../api';
import { Comment, Post } from '../../../types/index';
import { useParams } from 'react-router-dom';

function PostPage() {
  const [post, setPost] = useState<Post>();
  const [comments, setComment] = useState<Comment[]>([]);

  const { postId } = useParams();
  useEffect(() => {
    getPost({
      postId: postId ?? '',
      onSuccess: async (res) => {
        setPost({
          id: res._id,
          title: res.title,
          image: res.image,
          description: res.description,
          category: res.category,
          comments: res.comments.map((comment) => comment.content)
        });
        setComment(
          res.comments.map((comment) => {
            return {
              id: comment._id,
              author: comment.author,
              content: comment.content
            };
          })
        );
        console.log('Got post!');
      },
      onError: async () => {
        console.log('Post not gotten!');
      },
      onLoading: async () => {}
    });
  }, [postId]);

  const handleCommentSubmition = useCallback(
    (comment: Comment) => {
      console.log(comments);
      setComment([...comments, comment]);
    },
    [comments]
  );

  return (
    <Container container>
      <BannerContainer item>
        <Banner postImage={post ? post.image : ''} postTitle={post ? post.title : ''} />
      </BannerContainer>
      <DescriptionContainer item>
        <p>{post?.description}</p>
      </DescriptionContainer>
      <CommentsContainer item>
        <Comments comments={comments} handleCommentSubmition={handleCommentSubmition} />
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;
