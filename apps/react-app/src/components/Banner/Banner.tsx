import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { BannerContent, BannerTitle, Container } from "./Banner.styles";

// ACT 1 - Put some image URL (Done)
const postImage = "https://newsroom.accenture.com/branding-assets/media_19149162765e2b478c1ff36821a4319f9a41c05b3.png?width=2000&format=webply&optimize=medium";

// ACT 1 -  Write a title (Done)
const postTitle = "Welcome to Act 1 of React";

function Banner() {
  return (
    <Container image={postImage}>
      <BannerContent>
        <Button sx={{ color: "white" }} startIcon={<ArrowBackIosIcon />}>
          View Posts
        </Button>
        <BannerTitle variant="h3">
          {/* ACT 1 - Render postTitle  (Done) */
            postTitle
          }
        </BannerTitle>
      </BannerContent>
    </Container>
  );
}

export default Banner;
