<script setup lang="ts">
import { Html, Text } from "@vue-email/components";

defineProps<{
  firstName: string;
  companyName: string;
}>();
</script>

<template>
  <Html lang="fr">
    <Text>Bravo {{ firstName }} ! "{{ companyName }}" est dès maintenant enregistrée. Continue la configuration sur la plateforme, personnalise-la à ta guise ou demande à quelqu'un de ton organisation de t'aider.</Text>
  </Html>
</template>
