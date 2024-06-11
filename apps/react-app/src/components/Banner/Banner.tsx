import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { BannerContent, BannerTitle, Container } from "./Banner.styles";

//✅ ACT 1 - Put some image URL
//✅ ACT 1 -  Write a title

interface Props {
  postImage: string;
  postTitle: string;
}

//✅ ACT 3 - Receive postImage and postTitle props
function Banner( { postImage, postTitle }: Props ) {
  return (
    <Container image={ postImage }>
      {/*✅ ACT 3 - Send postImage as image prop to Container component */}
      <BannerContent>
        <Button sx={{ color: "white" }} startIcon={<ArrowBackIosIcon />}>
          View Posts
        </Button>
        {/*✅ ACT 1 - Render postTitle */}
        <BannerTitle variant="h3">{ postTitle }</BannerTitle>
      </BannerContent>
    </Container>
  );
}

export default Banner;
