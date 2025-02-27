<script setup lang="ts">
import type { INavGroup, INavItem, INavSection } from "~/types/frontend/navigation";

defineProps<{
  parent: INavSection;
  group: INavGroup;
  item: INavItem;
}>();
</script>

<template>
  <SidebarMenuSubItem>
    <SidebarMenuSubButton as-child>
      <NuxtLinkLocale
        :href="item.url"
        class="bg-sidebar-accent text-sidebar-accent-foreground"
      >
        <span>{{ $t(`navigation.${parent.label ? `${parent.label}.${group.label}` : group.label}.${item.label}`) }}</span>
      </NuxtLinkLocale>
    </SidebarMenuSubButton>
  </SidebarMenuSubItem>
</template>
