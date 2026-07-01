import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { BannerContent, BannerTitle, Container } from "./Banner.styles";

const postImage = "https://images.wallpapersden.com/image/download/cloudy-mountains_a2toaWWUmZqaraWkpJRobWllrWdma2U.jpg";
const postTitle = "Discovering the World App"; 

// ACT 3 - Receive postImage and postTitle props
function Banner() {
  return (
    <Container image={""}>
      {/* ACT 3 - Send postImage as image prop to Container component */}
      <BannerContent>
        <Button sx={{ color: "white" }} startIcon={<ArrowBackIosIcon />}>
          View Posts
        </Button>
<<<<<<< HEAD
        <BannerTitle variant="h3">
          {postTitle}
        </BannerTitle>
=======
        <BannerTitle variant="h3">{/* ACT 1 - Render postTitle */}</BannerTitle>
>>>>>>> origin/react/session-02
      </BannerContent>
    </Container>
  );
}

export default Banner;
