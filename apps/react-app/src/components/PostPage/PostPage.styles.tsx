import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled(Grid)`
  height: 100%;
  flex-direction: column;
  background-color: #f0f0ff;
`;

export const BannerContainer = styled(Grid)`
  flex-grow: 1;
`;

export const DescriptionContainer = styled(Grid)`
  padding: 16px;
`;

export const CommentsContainer = styled(Grid)`
  display: flex;
  flex-grow: 1;
  padding: 16px;
  justify-content: center;
`;
