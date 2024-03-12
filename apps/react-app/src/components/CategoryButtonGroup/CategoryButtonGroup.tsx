import { ButtonGroup } from "@mui/material";

import { Container, StyledButton } from "./CategoryButtonGroup.styles";

const categoryOptions = [
  {
    key: "all",
    name: "All",
  },
  {
    key: "healt",
    name: "Health",
  },
  {
    key: "travel",
    name: "Travel",
  },
  {
    key: "sports",
    name: "Sports",
  },
];

function CategoryButtonGroup() {
  return (
    <Container item>
      <ButtonGroup aria-label="category button group" color="inherit">
        {categoryOptions.map((option) => (
          <StyledButton key={option.key} type="button" selected={false}>
            {option.name}
          </StyledButton>
        ))}
      </ButtonGroup>
    </Container>
  );
}

export default CategoryButtonGroup;
