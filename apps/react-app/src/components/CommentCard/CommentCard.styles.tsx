import { Grid, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled(Grid)`
  display: flex;
  gap: 16px;
  flex-grow: 1;
  padding: 16px;
  margin-bottom: 24px;
  background-color: white;
  border-radius: 8px;
  height: fit-content;
`;

export const Content = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const Author = styled(Typography)`
  font-weight: bold;
  margin-bottom: 8px;
`;
