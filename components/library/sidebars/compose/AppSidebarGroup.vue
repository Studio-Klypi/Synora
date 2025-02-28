<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
import type { INavGroup, INavSection } from "~/types/frontend/navigation";
import AppSidebarSubItem from "~/components/library/sidebars/compose/AppSidebarSubItem.vue";

defineProps<{
  parent: INavSection;
  group: INavGroup;
}>();
</script>

<template>
  <Collapsible
    as-child
    :default-open="group.isActive"
    class="group/collapsible"
  >
    <SidebarMenuItem>
      <CollapsibleTrigger as-child>
        <SidebarMenuButton :tooltip="$t(`navigation.${parent.label ? `${parent.label}.${group.label}` : group.label}.DEFAULT`)">
          <component :is="group.icon" />
          <span class="truncate">{{ $t(`navigation.${parent.label ? `${parent.label}.${group.label}` : group.label}.DEFAULT`) }}</span>
          <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <AppSidebarSubItem
            v-for="(item, k) in group.children"
            :key="`${item.label}-${k}`"
            :parent="parent"
            :group="group"
            :item="item"
          />
        </SidebarMenuSub>
      </CollapsibleContent>
    </SidebarMenuItem>
  </Collapsible>
</template>
