import { Grid, Box } from "@mui/material";
import { styled } from "@mui/system";

export const PostCard = styled(Grid)<{ image: string }>`
  display: flex;
  flex-grow: 1;
  color: white;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${(props) => `url(${props.image})`};

  :hover .card-actions {
    visibility: visible;
  }
`;

export const CardContainer = styled(Box)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  background-color: #4b4b4b3b;
`;

export const CardContent = styled(Box)`
  display: flex;
  padding: 24px;
  padding-top: 160px;
  flex-direction: column;
`;

export const CardActions = styled(Box)`
  gap: 16px;
  padding: 16px;
  display: flex;
  visibility: hidden;
  justify-content: end;
`;
