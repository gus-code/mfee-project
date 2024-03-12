import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton, Typography } from '@mui/material';

import { shorten } from '../../utils/index';
import { CardActions, CardContainer, CardContent, PostCard } from './PostList.styles';
import { Post } from '../../types';

interface PostListProps {
  posts: Post[];
  handleOpenForm: (defaultValues?: Post) => void;
}

function PostList({posts, handleOpenForm}: PostListProps) {
  return (
    <Grid container columns={{ md: 12, xs: 12 }}>
      <PostCard item xs={12} image={posts[0].image} md={6}>
        <CardContainer>
          <CardContent>
            <h1>{posts[0].title}</h1>
            <h3>{posts[0].comments.length > 1 ? `Comments [${posts[0].comments.length}]` : `Comment [${posts[0].comments.length}]`}</h3>
            <h3>{shorten(posts[0].description, 70)}</h3>
            <Typography variant="overline">{posts[0].category}</Typography>
          </CardContent>
          <CardActions className="card-actions">
            <IconButton color="inherit">
              <EditIcon />
            </IconButton>
            <IconButton color="inherit">
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </CardContainer>
      </PostCard>
      <PostCard item xs={12} image={posts[1].image} md={6}>
        <CardContainer>
          <CardContent>
            <h1>{posts[1].title}</h1>
            <h3>{posts[1].comments.length > 1 ? `Comments [${posts[1].comments.length}]` : `Comment [${posts[1].comments.length}]`}</h3>
            <h3>{shorten(posts[1].description, 70)}</h3>
            <Typography variant="overline">{posts[1].category}</Typography>
          </CardContent>
          <CardActions className="card-actions">
            <IconButton color="inherit">
              <EditIcon />
            </IconButton>
            <IconButton color="inherit">
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </CardContainer>
      </PostCard>
    </Grid>
  );
}

export default PostList;
