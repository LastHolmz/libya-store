import { OrdersProps } from "@/types/interfaces";
import { ColumnDef } from "@tanstack/react-table";

const ParseCity: ColumnDef<OrdersProps> = {
  accessorKey: "city",
  header: "City",
  cell: ({ row }) => <div>{"hello"}</div>,
};

export default ParseCity;
