<script setup lang="ts">
import { MoreHorizontal, Tag, Trash } from "lucide-vue-next";
import type { HTMLAttributes } from "vue";
import type { IBackCompanyMember } from "~/types/companies/members";

const props = defineProps<{
  member: IBackCompanyMember;
  class?: HTMLAttributes["class"];
}>();

const store = useCompaniesStore();
const roles = computed(() => store.getRoles);

async function updateRole(val: string) {
  console.log(val);
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
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
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
      <DropdownMenuItem>
        <Trash />
        {{ $t("members.table.actions.delete") }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
