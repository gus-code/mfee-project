import { Button, Grid } from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled(Grid)`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  padding-bottom: 16px;
`;

export const StyledButton = styled(Button)<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? "#DCDCDC" : undefined)};
`;
