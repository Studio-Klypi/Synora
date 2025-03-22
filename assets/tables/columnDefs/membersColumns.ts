import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { DateFormatter, toCalendarDate, fromDate, getLocalTimeZone, parseDate } from "@internationalized/date";
import { toDate } from "reka-ui/date";
import type { I18nTools } from "~/types/frontend/language";
import { Checkbox } from "#components";
import type { IBackUser } from "~/types/auth/users";
import type { IBackCompanyMember } from "~/types/companies/members";
import MembersActionDropdown from "~/components/library/members/MembersActionDropdown.vue";

export const columns = (t: I18nTools): ColumnDef<IBackCompanyMember>[] => {
  const df = new DateFormatter("fr-FR", {
    dateStyle: "long",
  });

  return [
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
    {
      id: "name",
      header: () => h("div", {}, t("members.table.headers.name")),
      cell: ({ row }) => {
        const { firstName, lastName } = row.original.user as IBackUser;
        return h("div", {}, `${firstName} ${lastName}`);
      },
    },
    {
      id: "email",
      header: () => h("div", {}, t("members.table.headers.email")),
      cell: ({ row }) => {
        const { email } = row.original.user as IBackUser;
        return h("div", {}, email);
      },
    },
    {
      accessorKey: "role",
      header: () => h("div", {}, t("members.table.headers.role")),
      cell: ({ row }) => {
        const { role } = row.original;
        if (!role) return h("div", "-");
        return h("div", role.name);
      },
    },
    {
      accessorKey: "createdAt",
      header: () => h("div", t("members.table.headers.created-at")),
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        const calendarDate = toCalendarDate(fromDate(date, getLocalTimeZone()));
        return h("div", df.format(toDate(parseDate(calendarDate.toString()))));
      },
    },
    {
      accessorKey: "updatedAt",
      header: () => h("div", t("members.table.headers.updated-at")),
      cell: ({ row }) => {
        const date = new Date(row.getValue("updatedAt"));
        const calendarDate = toCalendarDate(fromDate(date, getLocalTimeZone()));
        return h("div", df.format(toDate(parseDate(calendarDate.toString()))));
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => h("div", { class: "relative flex" }, h(MembersActionDropdown, { member: row.original, class: "ml-auto" })),
    },
  ];
};
