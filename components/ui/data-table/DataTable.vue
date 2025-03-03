<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";
import { FlexRender } from "@tanstack/vue-table";
import type { DataTableProps } from "~/components/ui/data-table/index";
import { cn } from "~/lib/utils";

const props = defineProps<DataTableProps>();
</script>

<template>
  <div :class="cn('border rounded-md', props.class)">
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="loading">
          <TableRow>
            <TableCell
              :colspan="table.getAllColumns.length"
              class="h-24 text-center"
            >
              <LoaderCircle class="animate-spin mx-auto" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell
                :colspan="table.getAllColumns.length"
                class="h-24 text-center"
              >
                <!-- TODO: setup literals -->
                No results.
              </TableCell>
            </TableRow>
          </template>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
