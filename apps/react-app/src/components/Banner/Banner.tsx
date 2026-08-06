import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { BannerContent, BannerTitle, Container } from "./Banner.styles";

const url = "https://upload.wikimedia.org/wikipedia/commons/b/b3/Monet_-_Waves_Breaking%2C_1881.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original";
const postImage = url; // ListoACT 1 - Put some image URL
const postTitle = "Waves Breaking"; // ListoACT 1 -  Write a title

function Banner() {
  return (
    <Container image={postImage}>
      <BannerContent>
        <Button sx={{ color: "white" }} startIcon={<ArrowBackIosIcon />}>
          View Posts
        </Button>
        <BannerTitle variant="h3">
          {/* ListoACT 1 - Render postTitle */}
          {postTitle}
        </BannerTitle>
      </BannerContent>
    </Container>
  );
}

export default Banner;
