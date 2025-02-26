<script setup lang="ts">

</script>

<template>
  <div>
    <p>{{ $t("welcome") }}</p>
    <Button as-child>
      <NuxtLinkLocale to="/portal/auth/register">
        {{ $t("join-us") }}
      </NuxtLinkLocale>
    </Button>
  </div>
</template>
