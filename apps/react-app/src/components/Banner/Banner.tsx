import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { BannerContent, BannerTitle, Container } from "./Banner.styles";

// ListoACT 3 - Receive postImage and postTitle props
interface PostProps {
  postImage: string;
  postTitle: string;
}

function Banner({postImage, postTitle}: PostProps) {
  return (
    <Container image={postImage}>
      {/* ListoACT 3 - Send postImage as image prop to Container component */}
      <BannerContent>
        <Button sx={{ color: "white" }} startIcon={<ArrowBackIosIcon />}>
          View Posts
        </Button>
        {/* ListoACT 1 - Render postTitle */}
        <BannerTitle variant="h3">{postTitle}</BannerTitle>
      </BannerContent>
    </Container>
  );
}

export default Banner;