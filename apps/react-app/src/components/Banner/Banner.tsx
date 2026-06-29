import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";


import { BannerContent, BannerTitle, Container } from "./Banner.styles";

interface BannerProps {
  postImage: string;
  postTitle: string;
}

function Banner({ postImage, postTitle }: BannerProps) {
  return (
    <Container image={postImage}>
      {/* ACT 3 - Send postImage as image prop to Container component */}
      <BannerContent>
        <Button sx={{ color: "white" }} startIcon={<ArrowBackIosIcon />}>
          View Posts
        </Button>
        <BannerTitle variant="h3">
          {postTitle}
        </BannerTitle>
      </BannerContent>
    </Container>
  );
}

export default Banner;
