<script setup lang="ts">
import { Home, LockKeyhole } from "lucide-vue-next";
import type { IBackCompany } from "~/types/companies/companies";
import type { INavSection } from "~/types/frontend/navigation";
import AppSidebarSection from "~/components/library/sidebars/compose/AppSidebarSection.vue";
import ClientCompanySwitcher from "~/components/library/sidebars/client/ClientCompanySwitcher.vue";
import ClientSidebarUser from "~/components/library/sidebars/client/ClientSidebarUser.vue";

const store = useCompaniesStore();
const company = computed(() => store.selectedCompany as IBackCompany);
const companies = computed(() => store.companies);

const getUrl = (path: string): string => `/app/${company.value.uuid}/${path.startsWith("/") ? path.substring(1) : path}`;

const navigation: INavSection[] = [
  {
    children: [
      {
        type: "item",
        label: "overview",
        icon: Home,
        url: getUrl("/"),
      },
    ],
  },
];
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <ClientCompanySwitcher
        :company="company"
        :companies="companies"
      />
    </SidebarHeader>
    <SidebarContent>
      <AppSidebarSection :sections="navigation" />
    </SidebarContent>
    <SidebarFooter>
      <ClientSidebarUser />
    </SidebarFooter>
  </Sidebar>
</template>
