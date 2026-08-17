import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Navigate, useNavigate } from "react-router-dom";
import { BannerContent, BannerTitle, Container } from "./Banner.styles";

// ListoACT 3 - Receive postImage and postTitle props
interface PostProps {
  postImage: string;
  postTitle: string;
}

function Banner({postImage, postTitle}: PostProps) {
  let navigate = useNavigate();

  return (
    <Container image={postImage}>
      {/* ListoACT 3 - Send postImage as image prop to Container component */}
      <BannerContent>
        <Button sx={{ color: "white" }} startIcon={<ArrowBackIosIcon />}
        // ListoACT 10 - Navigate to Home page 
          onClick={() => navigate("/")}
        >
          View Posts
        </Button>
        {/* ListoACT 1 - Render postTitle */}
        <BannerTitle variant="h3">{postTitle}</BannerTitle>
      </BannerContent>
    </Container>
  );
}

export default Banner;
