<script setup lang="ts">
import { Html, Text, Link } from "@vue-email/components";
import { usePlatformUrl } from "~/server/services/generics/emails";

defineProps<{
  firstName: string;
}>();
</script>

<template>
  <Html lang="fr">
    <Text>
      Super {{ firstName }}, ton mot de passe a bien été réinitialisé ! Pour une question de sécurité, tous les appareils connectés à ton compte ont été déconnecté, reconnecte-toi : <Link :href="usePlatformUrl(`/portal/auth/login`)" />
    </Text>
  </Html>
</template>
