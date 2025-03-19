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
    page: t("overview.tab"),
    name: company.value.name,
  }),
});
</script>

<template>
  <div
    v-if="company"
    role="main"
  >
    {{ company.name }}
  </div>
</template>
