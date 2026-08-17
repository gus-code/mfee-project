import { ButtonGroup } from "@mui/material";

import { Container, StyledButton } from "./CategoryButtonGroup.styles";
import { CategoryN } from "../../types";

interface CategoryButtonGroupProps {
  categories: CategoryN[];
  selectedCategory: CategoryN | null;
  handleSelectCategory: (category: CategoryN) => void;
}

function CategoryButtonGroup({
  categories,
  selectedCategory,
  handleSelectCategory,
}: CategoryButtonGroupProps) {
  return (
    <Container item>
      <ButtonGroup aria-label="category button group" color="inherit">
        {categories.map((category) => (
          <StyledButton
            type="button"
            key={category._id}
            selected={category.name === selectedCategory?.name}
            onClick={() => handleSelectCategory(category)}
          >
            {category.name}
          </StyledButton>
        ))}
      </ButtonGroup>
    </Container>
  );
}

export default CategoryButtonGroup;
