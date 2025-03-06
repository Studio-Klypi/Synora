<script setup lang="ts">
import { Html, Text } from "@vue-email/components";

defineProps<{
  firstName: string;
  companyName: string;
}>();
</script>

<template>
  <Html lang="fr">
    <Text>Bonjour {{ companyName }} ! {{ firstName }} a enregistré votre organisation sur Synora ! Il est aujourd'hui le seul à avoir les droits sur l'organisation. Contactez-le pour vous accorder les droits qui vous sont attribués.</Text>
  </Html>
</template>
