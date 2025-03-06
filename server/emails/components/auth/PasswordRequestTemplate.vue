<script setup lang="ts">
import { Html, Text, Link } from "@vue-email/components";
import { usePlatformUrl } from "~/server/services/generics/emails";

defineProps<{
  userUuid: string;
  code: string;
}>();
</script>

<template>
  <Html lang="en">
    <Text>Oh non, tu as oublié ton mot de passe ? Pas de soucis, voici un lien pour le réinitialiser : <Link :href="usePlatformUrl(`/security/resetPassword/${userUuid}/${code}`)" /> (attention, il n'est valable que 15 minutes)</Text>
  </Html>
</template>
