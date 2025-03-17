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
      <NuxtLink
        v-if="item.url.startsWith('http')"
        :to="item.url"
        target="_blank"
      >
        <span class="truncate">{{ $t(`navigation.${parent.label ? `${parent.label}.${group.label}` : group.label}.${item.label}`) }}</span>
        <Badge
          v-if="parent.new || group.new || item.new"
          class="ml-auto"
        >
          {{ $t("labels.new") }}
        </Badge>
        <Badge
          v-if="parent.planned || group.planned || item.planned"
          variant="secondary"
          class="ml-auto"
        >
          {{ $t("labels.planned") }}
        </Badge>
      </NuxtLink>
      <NuxtLinkLocale
        v-else
        :to="`${path}${item.url}`"
        active-class="bg-sidebar-accent text-sidebar-accent-foreground"
      >
        <span class="truncate">{{ $t(`navigation.${parent.label ? `${parent.label}.${group.label}` : group.label}.${item.label}`) }}</span>
        <Badge
          v-if="parent.new || group.new || item.new"
          class="ml-auto"
        >
          {{ $t("labels.new") }}
        </Badge>
        <Badge
          v-if="parent.planned || group.planned || item.planned"
          variant="secondary"
          class="ml-auto"
        >
          {{ $t("labels.planned") }}
        </Badge>
      </NuxtLinkLocale>
    </SidebarMenuSubButton>
  </SidebarMenuSubItem>
</template>
