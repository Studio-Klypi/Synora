<script setup lang="ts">
import { Home, LockKeyhole } from "lucide-vue-next";
import type { IBackCompany } from "~/types/companies/companies";
import type { INavSection } from "~/types/frontend/navigation";
import AppSidebarSection from "~/components/library/sidebars/compose/AppSidebarSection.vue";
import ClientCompanySwitcher from "~/components/library/sidebars/client/ClientCompanySwitcher.vue";
import ClientSidebarUser from "~/components/library/sidebars/client/ClientSidebarUser.vue";

const store = useCompaniesStore();
const company = computed(() => store.selectedCompany as IBackCompany);
const companies = computed(() => store.getReducedCompanies);
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
