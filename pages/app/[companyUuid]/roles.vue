<script setup lang="ts">
import type { IBackCompany } from "~/types/companies/companies";

definePageMeta({
  layout: "app-default",
  authRequired: true,
});

const { t } = useI18n();
const store = useCompaniesStore();
const company = computed(() => store.selectedCompany as IBackCompany);

useHead({
  title: t("tabs.company", {
    page: t("roles.tab"),
    name: company.value.name,
  }),
});
</script>

<template>
  <div role="main">
    ROLES
  </div>
</template>
