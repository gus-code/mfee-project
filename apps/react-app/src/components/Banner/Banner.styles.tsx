import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled(Box)<{ image: string }>`
  display: flex;
  flex-grow: 1;
  height: 100%;
  color: white;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${(props) => `url(${props.image})`};
`;

export const BannerContent = styled(Box)`
  flex-grow: 1;
  padding: 16px;
  background-color: #4b4b4b3b;
`;

export const BannerTitle = styled(Typography)`
  display: flex;
  flex-grow: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: calc(100% - 103px);
  font-weight: 600;
  padding: 30px;
`;
