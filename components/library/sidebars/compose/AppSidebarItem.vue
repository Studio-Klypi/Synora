<script setup lang="ts">
import type { INavItem, INavSection } from "~/types/frontend/navigation";

defineProps<{
  parent: INavSection;
  item: INavItem;
}>();
</script>

<template>
  <SidebarMenuItem>
    <SidebarMenuButton
      :tooltip="$t(`navigation.${parent.label ? `${parent.label}.${item.label}` : item.label}`)"
      as-child
    >
      <NuxtLinkLocale
        :to="item.url"
        class="bg-sidebar-accent text-sidebar-accent-foreground"
      >
        <component
          :is="item.icon"
          v-if="item.icon"
        />
        <span class="truncate">{{ $t(`navigation.${parent.label ? `${parent.label}.${item.label}` : item.label}`) }}</span>
      </NuxtLinkLocale>
    </SidebarMenuButton>
  </SidebarMenuItem>
</template>
