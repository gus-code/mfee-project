import { ButtonGroup } from "@mui/material";

import { Container, StyledButton } from "./CategoryButtonGroup.styles";
import { Category } from "../../types";

interface CategoryButtonGroupProps {
  categories: Category[];
  selectedCategory: Category | null;
  handleSelectCategory: (category: Category) => void;
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
            key={category.id}
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
