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

interface CategoryButtonGroupProps {
  categorySelected: string;
  handleSelectCategory: (category: string) => void;
}

function CategoryButtonGroup({ categorySelected, handleSelectCategory }: CategoryButtonGroupProps) {
  return (
    <Container item>
      <ButtonGroup aria-label="category button group" color="inherit">
        <StyledButton type="button" selected={false}>
          {categoryOptions[0].name}
        </StyledButton>
        <StyledButton type="button" selected={false}>
          {categoryOptions[1].name}
        </StyledButton>
        <StyledButton type="button" selected={false}>
          {categoryOptions[2].name}
        </StyledButton>
        <StyledButton type="button" selected={false}>
          {categoryOptions[3].name}
        </StyledButton>
      </ButtonGroup>
    </Container>
  );
}

export default CategoryButtonGroup;
