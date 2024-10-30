import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { BannerContent, BannerTitle, Container } from "./Banner.styles";
import { NavLink } from "react-router-dom";

const postImage = "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"; // ACT 1 - Put some image URL
const postTitle = "Gatito chino"; //ACT 1 -  Write a title

interface BannerProps {
  postImage: string;
  postTitle: string;
}

function Banner({postImage, postTitle}: BannerProps) {
  return (
    <Container image={postImage}>
      {/* ACT 3 - Send postImage as image prop to Container component */}
      <BannerContent>
        <NavLink to="/">
          <Button sx={{ color: "white" }} startIcon={<ArrowBackIosIcon />}
          // ACT 10 - Navigate to Home page 
          >
            View Posts
          </Button>
        </NavLink>
        <BannerTitle variant="h3">{/* Activity 1 - Render post title */}</BannerTitle>
      </BannerContent>
    </Container>
  );
}

export default Banner;
