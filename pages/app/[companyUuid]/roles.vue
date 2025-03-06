<script setup lang="ts">
import { getCoreRowModel, useVueTable } from "@tanstack/vue-table";
import { columns } from "assets/tables/columnDefs/rolesColumns";
import { Plus, Trash, LayoutGrid, Tags } from "lucide-vue-next";
import type { IBackCompany } from "~/types/companies/companies";
import CreateRoleDialog from "~/components/library/roles/CreateRoleDialog.vue";

definePageMeta({
  layout: "app-default",
  authRequired: true,
});

const { t } = useI18n();
const store = useCompaniesStore();
const loadingRoles = computed(() => store.loadingRoles);
const company = computed(() => store.selectedCompany as IBackCompany);

const route = useRoute();
const perPage = ref<number>(Number(route.query.perPage ?? 20));
const page = ref<number>(Number(route.query.page ?? 1));

useHead({
  title: t("tabs.company", {
    page: t("roles.tab"),
    name: company.value.name,
  }),
});

const table = useVueTable({
  get data() { return company.value.roles ?? []; },
  get columns() { return columns(t); },
  getCoreRowModel: getCoreRowModel(),
});
const hasSelected = computed(() => table.getIsSomeRowsSelected() || table.getIsAllRowsSelected());
const rowsSelected = computed(() => table.getFilteredSelectedRowModel().rows.map(r => Number(r.id)));

watch(perPage, updateQueryParams);
watch(page, updateQueryParams);

await store.fetchRoles(perPage.value, page.value);

function updateQueryParams() {
  navigateTo({
    query: {
      perPage: perPage.value,
      page: page.value,
    },
  });
  store.fetchRoles(perPage.value, page.value).then();
}
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
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button>
              <LayoutGrid />
              <span>{{ t("roles.table.actions.trigger") }}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="end"
          >
            <DropdownMenuItem>
              <Tags />
              <span>{{ t("roles.table.actions.multiple.manage-permissions") }}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash />
              <span>{{ t("roles.table.actions.multiple.delete") }}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </template>
      <template v-else>
        <Input
          type="search"
          placeholder="Search..."
        />
        <div class="flex gap-4">
          <Select v-model="perPage">
            <SelectTrigger class="sm:w-min gap-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem :value="20">
                {{ t("filters.table.perPage.20") }}
              </SelectItem>
              <SelectItem :value="50">
                {{ t("filters.table.perPage.50") }}
              </SelectItem>
              <SelectItem :value="100">
                {{ t("filters.table.perPage.100") }}
              </SelectItem>
              <SelectItem :value="-1">
                {{ t("filters.table.perPage.all") }}
              </SelectItem>
            </SelectContent>
          </Select>
          <CreateRoleDialog>
            <Button>
              <Plus />
              <span>{{ t("roles.new") }}</span>
            </Button>
          </CreateRoleDialog>
        </div>
      </template>
    </header>

    <DataTable
      :table="table"
      :loading="loadingRoles"
    />
  </div>
</template>
