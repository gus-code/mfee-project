import { useContext } from "react";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton, Typography } from "@mui/material";

import { shorten } from "../../common/utils";
import { CategoryN, Post } from "../../types";
import { PostContext } from "../../context";
import {
  CardActions,
  CardContainer,
  CardContent,
  PostCard,
} from "./PostList.styles";

interface PostListProps {
  posts: Post[];
  selectedCategory: CategoryN | null;
  handleOpenForm: (defaultValues?: Post) => void;
}

function PostList({ posts, selectedCategory, handleOpenForm }: PostListProps) {
  const { removePost } = useContext(PostContext);
  let navigate = useNavigate();

  return (
    <Grid container columns={{ md: 12, xs: 12 }}>
      {posts.map((post) => (
        <PostCard
          item
          xs={12}
          key={post.id}
          image={post.image}
          md={posts.length === 1 ? 12 : 6}
          // ListoACT 10 - Navigate to PostPage component and send postID as route params
        >
          <Button sx={{ color: "white" }} startIcon={<ArrowBackIosIcon />}
            onClick={() => navigate("/post/0d4dc0777805c4321d6846e0")}
          >
            View Posts
          </Button>

          <CardContainer>
            <CardContent>
              <h1>{post.title}</h1>
              <h3>
                {post.comments.length}
                {post.comments.length > 1 ? " Comments" : " Comment"}
              </h3>
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
                  removePost({
                    postID: post.id,
                    selectedCategoryID: selectedCategory?._id,
                  });
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
