<script setup lang="ts">
import { UserPlus, LayoutGrid, Tag, Trash } from "lucide-vue-next";
import { getCoreRowModel, useVueTable } from "@tanstack/vue-table";
import { columns } from "assets/tables/columnDefs/membersColumns";
import type { IBackCompany } from "~/types/companies/companies";
import type { IBackCompanyMember } from "~/types/companies/members";
import CreateMemberDialog from "~/components/library/members/CreateMemberDialog.vue";

definePageMeta({
  layout: "app-default",
  authRequired: true,
});

const { t } = useI18n();

useHead({
  title: t("tabs.company", {
    page: t("members.tab"),
    name: useBrandName(),
  }),
});

const store = useCompaniesStore();
const company = computed(() => store.selectedCompany as IBackCompany);
const members = computed(() => company.value.members as IBackCompanyMember[]);

const table = useVueTable({
  get data() { return members.value; },
  get columns() { return columns(t); },
  getCoreRowModel: getCoreRowModel(),
});
const rowsSelected = computed(() => table.getFilteredSelectedRowModel().rows.map(r => r.original));
const hasSelected = computed(() => !!rowsSelected.value.length);
</script>

<template>
  <div
    role="main"
    class="flex flex-col gap-4"
  >
    <header class="flex flex-col sm:flex-row sm:items-center gap-4">
      <template v-if="hasSelected">
        <p class="flex-1 text-sm text-muted-foreground">
          {{ t("labels.table.selected-rows-count", { count: rowsSelected.length }) }}.
        </p>
        <div class="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button>
                <LayoutGrid />
                {{ t("members.actions.selection.trigger") }}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Tag />
                {{ t("members.actions.selection.edit-roles") }}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash />
                {{ t("members.actions.selection.delete-many") }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </template>
      <template v-else>
        <Input
          type="search"
          placeholder="Search..."
        />
        <CreateMemberDialog>
          <Button :disabled="disabledByPermission('members.add')">
            <UserPlus />
            {{ t("members.actions.new") }}
          </Button>
        </CreateMemberDialog>
      </template>
    </header>

    <DataTable
      :table="table"
      :loading="false"
    />
  </div>
</template>
