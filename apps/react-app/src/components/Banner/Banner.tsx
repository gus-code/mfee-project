import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";


import { BannerContent, BannerTitle, Container } from "./Banner.styles";
import { useNavigate } from "react-router-dom";

interface BannerProps {
  postImage: string;
  postTitle: string;
}

function Banner({ postImage, postTitle }: BannerProps) {

  const navigate = useNavigate();

  return (
    <Container image={postImage}>
      {/* ACT 3 - Send postImage as image prop to Container component */}
      <BannerContent>
        <Button sx={{ color: "white" }} startIcon={<ArrowBackIosIcon />}
        // ACT 10 - Navigate to Home page 
          onClick={() => navigate('/')}
        >
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
