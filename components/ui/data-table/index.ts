import type { HTMLAttributes } from "vue";
import type { Table } from "@tanstack/vue-table";

export { default as DataTable } from "./DataTable.vue";

export interface DataTableProps {
  class?: HTMLAttributes["class"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
  loading: boolean;
}
