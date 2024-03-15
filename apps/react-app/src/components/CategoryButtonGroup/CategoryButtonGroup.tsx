import { ButtonGroup } from "@mui/material";

import { Container, StyledButton } from "./CategoryButtonGroup.styles";
interface CategoryButtonGroupProps{
  categorySelected: string;
  handleSelectCategory: (string:string) => void;
}

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

function CategoryButtonGroup({categorySelected,handleSelectCategory}:CategoryButtonGroupProps) {
  return (
    <Container item>
      <ButtonGroup aria-label="category button group" color="inherit">
        {/* Activity 5 - Iterate categoryOptions */}
        <StyledButton
          type="button"

          // Activity 4 - Set a condition so that the props selected is true only if the option is selected. This value can be hardcoded in the following way: categoryOptions[0].name
          // Activity 5 - Replaces the hardcoded value "categoryOptions[0].name" with the variable obtained from the iteration and uses the variable "categorySelected" obtained from the props
        
          selected={categoryOptions[0].name===categorySelected?true:false}
          onClick={() => {
            //  Activity 5 - After you have iterated the "categoryOptions" array, send the "name" property as a parameter to the "handleSelectCategory" function
          }}
        >
          
          {/* Activity 5 - Render category name */}
        </StyledButton>
      </ButtonGroup>
    </Container>
  );
}

export default CategoryButtonGroup;
