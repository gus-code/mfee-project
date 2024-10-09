import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

import { BannerContent, BannerTitle, Container } from './Banner.styles';

interface BannerProps {
  postImage: string;
  postTitle: string;
}

function Banner({ postImage, postTitle }: BannerProps) {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <Container image={postImage}>
      <BannerContent>
        <Button sx={{ color: 'white' }} startIcon={<ArrowBackIosIcon />} onClick={goToHome}>
          View Posts
        </Button>
        <BannerTitle variant="h3">{postTitle}</BannerTitle>
      </BannerContent>
    </Container>
  );
}

export default Banner;
