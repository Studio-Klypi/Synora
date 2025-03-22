<script setup lang="ts">
import { Html, Text } from "@vue-email/components";

defineProps<{
  adderName: string;
  firstName: string;
}>();
</script>

<template>
  <Html lang="fr">
    <Text>{{ adderName }} vient de donner accès à votre portail à {{ firstName }}.</Text>
  </Html>
</template>
