<script setup lang="ts">
import { Ellipsis, Pen, Trash } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";
import type { IBackRole } from "~/types/companies/roles";
import ConfirmationDialog from "~/components/library/dialogs/ConfirmationDialog.vue";

const props = defineProps<{
  role: IBackRole;
  class?: HTMLAttributes["class"];
}>();

const store = useCompaniesStore();

// DELETE
const deleteAlert = ref<boolean>(false);
const deleteLoading = computed(() => store.deletingRole);
async function deleteRole() {
  await store.deleteRole(props.role);
}
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
      <DropdownMenuItem @click="deleteAlert = true">
        <Trash />
        {{ $t("roles.table.actions.single.delete") }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <ConfirmationDialog
    caption="roles.dialogs.delete-confirmation.caption"
    :open="deleteAlert"
    :action="deleteRole"
    :loading="deleteLoading"
    @update:open="deleteAlert = $event"
    @confirmed="deleteAlert = false"
  />
</template>
