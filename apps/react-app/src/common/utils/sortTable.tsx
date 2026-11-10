import { Order, TableData } from "../../types";

function descendingComparator(
  a: TableData,
  b: TableData,
  orderBy: string
) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function comparator({
  a,
  b,
  order,
  orderBy,
}: {
  a: TableData;
  b: TableData;
  order: Order;
  orderBy: string;
}) {
  return order === "desc"
    ? descendingComparator(a, b, orderBy)
    : -descendingComparator(a, b, orderBy);
}

export function stableSort({
  rows,
  order: selectedOrder,
  orderBy,
}: {
  rows: TableData[];
  order: Order;
  orderBy: string;
}) {
  const stabilizedThis = rows.map(
    (el, index) => [el, index] as [TableData, number]
  );
  stabilizedThis.sort((a, b) => {
    const order = comparator({
      a: a[0],
      b: b[0],
      order: selectedOrder,
      orderBy,
    });
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
