<script setup lang="ts">
import type { INavItem, INavSection } from "~/types/frontend/navigation";
import type { IBackCompany } from "~/types/companies/companies";

defineProps<{
  parent: INavSection;
  item: INavItem;
}>();

const store = useCompaniesStore();
const company = computed(() => store.selectedCompany as IBackCompany);
const path = computed(() => `/app/${company.value.uuid}`);
</script>

<template>
  <SidebarMenuItem>
    <SidebarMenuButton
      :tooltip="$t(`navigation.${parent.label ? `${parent.label}.${item.label}` : item.label}`)"
      as-child
    >
      <NuxtLinkLocale
        :to="`${path}${item.url}`"
        active-class="bg-sidebar-accent text-sidebar-accent-foreground"
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
