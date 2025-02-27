<script setup lang="ts">
definePageMeta({
  layout: "app-default",
  authRequired: true,
});

const store = useCompaniesStore();
const company = computed(() => store.selectedCompany);
</script>

<template>
  <div
    v-if="company"
    role="main"
  >
    {{ company.name }}
  </div>
</template>
