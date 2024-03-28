import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { BannerContent, BannerTitle, Container } from './Banner.styles';
import { useNavigate } from 'react-router-dom';

interface BannerProps {
  title?: string;
  image?: string;
}

function Banner({ title, image }: BannerProps) {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  return (
    <Container image={image}>
      <BannerContent>
        <Button onClick={routeChange} sx={{ color: 'white' }} startIcon={<ArrowBackIosIcon />}>
          View Posts
        </Button>
        <BannerTitle variant="h3">{title}</BannerTitle>
      </BannerContent>
    </Container>
  );
}

export default Banner;
