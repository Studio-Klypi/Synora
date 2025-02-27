<script setup lang="ts">
import type { INavSection } from "~/types/frontend/navigation";
import AppSidebarGroup from "~/components/library/sidebars/compose/AppSidebarGroup.vue";
import AppSidebarItem from "~/components/library/sidebars/compose/AppSidebarItem.vue";

defineProps<{
  sections: INavSection[];
}>();
</script>

<template>
  <SidebarGroup
    v-for="(section, i) in sections"
    :key="`nav-${i}`"
  >
    <SidebarGroupLabel v-if="section.label">
      {{ $t(`navigation.${section.label}.DEFAULT`) }}
    </SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <template
          v-for="(menu, j) in section.children"
          :key="`${menu.label}-${j}`"
        >
          <AppSidebarItem
            v-if="menu.type === 'item'"
            :parent="section"
            :item="menu"
          />
          <AppSidebarGroup
            v-if="menu.type === 'group'"
            :parent="section"
            :group="menu"
          />
        </template>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
