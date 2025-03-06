<script setup lang="ts">
import { Ellipsis, Pen, Trash } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";
import type { IBackRole } from "~/types/companies/roles";

const props = defineProps<{
  role: IBackRole;
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        size="icon"
        :class="props.class"
      >
        <Ellipsis />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>
        <Pen />
        {{ $t("roles.table.actions.single.edit") }}
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Trash />
        {{ $t("roles.table.actions.single.delete") }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
