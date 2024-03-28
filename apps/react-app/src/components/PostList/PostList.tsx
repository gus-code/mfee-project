import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton, Typography } from '@mui/material';

import { shorten } from '../../utils/index';
import { CardActions, CardContainer, CardContent, PostCard } from './PostList.styles';
import { Post } from '../../types';
import { useContext } from 'react';
import { PostContext } from '../../context';

interface PostListProps {
  posts: Post[] | null;
  handleOpenForm: (defaultValues?: Post) => void;
}

function PostList({ posts, handleOpenForm }: PostListProps) {
  const { deletePost } = useContext(PostContext);

  return (
    <Grid container columns={{ md: 12, xs: 12 }}>
      {posts?.map((post) => (
        <PostCard key={post.id} item xs={12} image={post.image} md={6}>
          <CardContainer>
            <CardContent>
              <h1>{post.title}</h1>
              <h3>{post.comments.length > 1 ? `Comments [${post.comments.length}]` : `Comment [${post.comments.length}]`}</h3>
              <h3>{shorten(post.description, 70)}</h3>
              <Typography variant="overline">{post.category}</Typography>
            </CardContent>
            <CardActions className="card-actions">
              <IconButton
                color="inherit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenForm(post);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePost(post.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </CardContainer>
        </PostCard>
      ))}
    </Grid>
  );
}

export default PostList;
