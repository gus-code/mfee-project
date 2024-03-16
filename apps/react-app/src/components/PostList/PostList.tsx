import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton, Typography } from '@mui/material';

import { shorten } from '../../utils/index';
import { Post } from '../../types';
import { CardActions, CardContainer, CardContent, PostCard } from './PostList.styles';

interface PostListProps {
  posts: Post[];
  handleOpenForm: (defaultValues?: Post) => void;
}

function PostList({ posts, handleOpenForm }: PostListProps) {
  return (
    <Grid container columns={{ md: 12, xs: 12 }}>
      {posts?.map((post) => (
        <PostCard item xs={12} key={post.id} image={post.image} md={posts.length === 1 ? 12 : 6}>
          <CardContainer>
            <CardContent>
              <h1>{post.title}</h1>
              <h3>
                {post.comments.length}
                {post.comments.length > 1 ? ' Comments' : ' Comment'}
                {/* Activity 4 - Render the word "Comments" if it contains more than one comment and "Comment" if there is only one */}
              </h3>
              <h3>{shorten(post.description, 70)}</h3>
              <Typography variant="overline">
                {/* Activity 1 - Render post category */}
                {post.category}
              </Typography>
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
              <IconButton color="inherit">
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
