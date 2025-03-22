<script setup lang="ts">
import { X, MoreHorizontal, Tag, Trash } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";
import type { IBackCompanyMember } from "~/types/companies/members";
import ConfirmationDialog from "~/components/library/dialogs/ConfirmationDialog.vue";

const props = defineProps<{
  member: IBackCompanyMember;
  class?: HTMLAttributes["class"];
}>();

const store = useCompaniesStore();
const roles = computed(() => store.getRoles);
const deletingMember = computed(() => store.deletingMember);

const deleteConfirm = ref<boolean>(false);

async function updateRole(val?: string) {
  const roleId = val ? Number(val) : null;
  if (roleId === props.member.role?.id) return;

  await store.editMemberRole(props.member, roleId);
}
async function deleteMember() {
  await store.deleteMember(props.member);
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
        <MoreHorizontal />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-if="member.roleId && member.role"
        :disabled="disabledByPermission('members.edit-role')"
        @click="updateRole"
      >
        <X />
        {{ $t("members.table.actions.delete-role") }}
      </DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger :disabled="disabledByPermission('members.edit-role')">
          <Tag />
          {{ $t("members.table.actions.edit-role") }}
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              :model-value="`${member.roleId}`"
              @update:model-value="updateRole"
            >
              <DropdownMenuRadioItem
                v-for="role in roles"
                :key="`role-${role.id}`"
                :value="`${role.id}`"
              >
                {{ role.name }}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
      <DropdownMenuItem
        :disabled="disabledByPermission('members.delete')"
        @click="deleteConfirm = true"
      >
        <Trash />
        {{ $t("members.table.actions.delete") }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <ConfirmationDialog
    caption="members.dialogs.delete-member.caption"
    :open="deleteConfirm"
    :action="deleteMember"
    :loading="deletingMember"
    @update:open="deleteConfirm = $event"
    @confirmed="deleteConfirm = false"
  />
</template>
