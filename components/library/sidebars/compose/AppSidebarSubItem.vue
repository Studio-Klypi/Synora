<script setup lang="ts">
import type { INavGroup, INavItem, INavSection } from "~/types/frontend/navigation";
import type { IBackCompany } from "~/types/companies/companies";

defineProps<{
  parent: INavSection;
  group: INavGroup;
  item: INavItem;
}>();

const store = useCompaniesStore();
const company = computed(() => store.selectedCompany as IBackCompany);
const path = computed(() => `/app/${company.value.uuid}`);
</script>

<template>
  <SidebarMenuSubItem>
    <SidebarMenuSubButton as-child>
      <NuxtLinkLocale
        :to="`${path}${item.url}`"
        active-class="bg-sidebar-accent text-sidebar-accent-foreground"
      >
        <span>{{ $t(`navigation.${parent.label ? `${parent.label}.${group.label}` : group.label}.${item.label}`) }}</span>
        <Badge v-if="parent.new || group.new || item.new">
          {{ $t("labels.new") }}
        </Badge>
      </NuxtLinkLocale>
    </SidebarMenuSubButton>
  </SidebarMenuSubItem>
</template>
