<script setup lang="ts">
definePageMeta({
  authRequired: true,
});

const userStore = useUserStore();
const fullName = computed(() => userStore.getFullName);
</script>

<template>
  <div>
    {{ fullName }}
  </div>
</template>
