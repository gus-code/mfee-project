import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { BannerContent, BannerTitle, Container } from "./Banner.styles";

interface BannerProps {
  postTitle: string,
  postImage: string
}

function Banner(props: BannerProps) {
  return (
    <Container image={props.postImage}>
      <BannerContent>
        <Button sx={{ color: "white" }} startIcon={<ArrowBackIosIcon />}>
          View Posts
        </Button>
        <BannerTitle variant="h3">
          {props.postTitle}
        </BannerTitle>
      </BannerContent>
    </Container>
  );
}

export default Banner;
