<script setup lang="ts">
definePageMeta({
  layout: "app-default",
  authRequired: true,
});

const { t } = useI18n();

useHead({
  title: t("tabs.company", {
    page: t("settings.general.tab"),
    name: useBrandName(),
  }),
});
</script>

<template>
  <div role="main">
    <h1 class="text-5xl">
      {{ t("settings.general.title") }}
    </h1>
  </div>
</template>
