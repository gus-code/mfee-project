import { ButtonGroup } from '@mui/material';

import { Container, StyledButton } from './CategoryButtonGroup.styles';

const categoryOptions = [
  {
    key: 'all',
    name: 'All'
  },
  {
    key: 'healt',
    name: 'Health'
  },
  {
    key: 'travel',
    name: 'Travel'
  },
  {
    key: 'sports',
    name: 'Sports'
  }
];

// const categorySelected = 'All';

interface CategoryButtonGroupProps {
  categorySelected: string;
  handleSelectCategory: (category: string) => void;
}

function CategoryButtonGroup({ categorySelected, handleSelectCategory }: CategoryButtonGroupProps) {
  return (
    <Container item>
      <ButtonGroup aria-label="category button group" color="inherit">
        {categoryOptions.map((option) => (
          <StyledButton
            key={option.key}
            type="button"
            selected={option.name === categorySelected}
            onClick={() => {
              handleSelectCategory(option.name);
            }}
          >
            {option.name}
          </StyledButton>
        ))}
      </ButtonGroup>
    </Container>
  );
}

export default CategoryButtonGroup;
