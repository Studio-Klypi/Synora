import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { IBackRole } from "~/types/companies/roles";
import type { I18nTools } from "~/types/frontend/language";
import { Badge, Checkbox } from "#components";
import RoleActionsDropdown from "~/components/library/roles/RoleActionsDropdown.vue";
import type { IBackCompanyMember } from "~/types/companies/members";

export const columns = (t: I18nTools): ColumnDef<IBackRole>[] => [
  {
    id: "select",
    header: ({ table }) => h(Checkbox, {
      "modelValue": table.getIsAllPageRowsSelected(),
      "onUpdate:modelValue": (value: boolean) => table.toggleAllPageRowsSelected(value),
      "ariaLabel": t("labels.table.select-all"),
    }),
    cell: ({ row }) => h(Checkbox, {
      "modelValue": row.getIsSelected(),
      "onUpdate:modelValue": (value: boolean) => row.toggleSelected(value),
      "ariaLabel": t("labels.table.select-row"),
    }),
    enableSorting: false,
    enableHiding: false,
  },
  /* {
    accessorKey: "id",
    header: () => h("div", "#"),
    cell: ({ row }) => h("div", { class: "text-muted-foreground" }, row.getValue("id")),
  }, */
  {
    accessorKey: "name",
    header: () => h("div", {}, t("roles.table.headers.name")),
    cell: ({ row }) => h("div", {}, row.getValue("name")),
  },
  {
    accessorKey: "permissions",
    header: () => h("div", t("roles.table.headers.permissions")),
    cell: ({ row }) => {
      const permissions = row.getValue("permissions") as string[];
      const displayed = permissions.slice(0, 2);

      let children = [...displayed.map(p => h(Badge, { variant: "secondary" }, p))];
      if (permissions.length > 2) children = [
        ...children,
        h(
          Badge,
          { variant: "outline" },
          `+ ${Math.min(permissions.length - displayed.length, 99)}`,
        ),
      ];

      return h(
        "div",
        {
          class: "flex gap-1 flex-wrap",
        },
        children,
      );
    },
  },
  {
    accessorKey: "members",
    header: () => h("div", { class: "text-center" }, t("roles.table.headers.members")),
    cell: ({ row }) => {
      const members = row.getValue("members") as IBackCompanyMember[] | undefined;
      const length = members?.length ?? 0;

      return h("div", { class: "text-center font-medium" }, length);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => h("div", { class: "relative flex" }, h(RoleActionsDropdown, {
      role: row.original,
      class: "ml-auto",
    })),
  },
];
