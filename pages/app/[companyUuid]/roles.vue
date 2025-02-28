<script setup lang="ts">
import type { IBackCompany } from "~/types/companies/companies";

definePageMeta({
  layout: "app-default",
  authRequired: true,
});

const { t } = useI18n();
const store = useCompaniesStore();
const loadingRoles = computed(() => store.loadingRoles);
const company = computed(() => store.selectedCompany as IBackCompany);

useHead({
  title: t("tabs.company", {
    page: t("roles.tab"),
    name: company.value.name,
  }),
});

await store.fetchRoles();
</script>

<template>
  <div role="main">
    <Button @click="selectPage(2)">
      Next page
    </Button>
    <template v-if="loadingRoles">
      LOADING
    </template>
    <template v-else>
      <template v-if="company.roles?.length">
        <p
          v-for="role in company.roles"
          :key="role.id"
        >
          {{ role.name }}
        </p>
      </template>
      <template v-else>
        No Roles
      </template>
    </template>
  </div>
</template>
