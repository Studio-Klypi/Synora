<script setup lang="ts">
import { Ellipsis, Pen, Trash } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";
import type { IBackRole } from "~/types/companies/roles";
import ConfirmationDialog from "~/components/library/dialogs/ConfirmationDialog.vue";
import EditRoleDialog from "~/components/library/roles/EditRoleDialog.vue";

const props = defineProps<{
  role: IBackRole;
  class?: HTMLAttributes["class"];
}>();

const store = useCompaniesStore();

// EDIT
const editRole = ref<boolean>(false);

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
      <DropdownMenuItem
        :disabled="disabledByPermission('roles.manage')"
        @select="editRole = true"
      >
        <Pen />
        {{ $t("roles.table.actions.single.edit") }}
      </DropdownMenuItem>
      <DropdownMenuItem
        :disabled="disabledByPermission('roles.manage')"
        @select="deleteAlert = true"
      >
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
  <EditRoleDialog
    :open="editRole"
    :role="role"
    @update:open="editRole = $event"
  />
</template>
