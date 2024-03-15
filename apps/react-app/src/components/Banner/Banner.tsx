import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { BannerContent, BannerTitle, Container } from "./Banner.styles";

function Banner() {
  return (
    <Container
      // Activity 3 - Replace string with postImage prop
      image={""}
    >
      <BannerContent>
        <Button sx={{ color: "white" }} startIcon={<ArrowBackIosIcon />}>
          View Posts
        </Button>
        <BannerTitle variant="h3">{/* Activity 1 - Render post title */}</BannerTitle>
      </BannerContent>
    </Container>
  );
}

export default Banner;