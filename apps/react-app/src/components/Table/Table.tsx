import { Category } from "../../types";


interface TableProps {
  categories: Category[];
}

interface RowProps {
  category: Category
}

export const CategoryRow = ({ category }: RowProps) => {
  return (
    <tr>
      <th>
        {category.id}
      </th>
      <th>
        {category.name}
      </th>
    </tr>
  )
}

export const CategoryTable = ({categories}: TableProps) => {
  return (
    <table>
      <tr>
        <th>
          Id
        </th>
        <th>
          Category Name
        </th>
      </tr>
      {
        categories.map(c => (
          <CategoryRow category={c}/>
        ))
      }
    </table>
  )
}