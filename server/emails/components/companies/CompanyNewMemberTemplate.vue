<script setup lang="ts">
import { Html, Text, Link } from "@vue-email/components";
import { usePlatformUrl } from "~/server/services/generics/emails";

defineProps<{
  adderName: string;
  companyName: string;
}>();
</script>

<template>
  <Html lang="fr">
    <Text>
      Bienvenue sur {{ companyName }}. {{ adderName }} vous a accordé l'accès au portal de l'association. Connectez-vous <Link :href="usePlatformUrl('/portal/auth/login')">
        ici
      </Link>.
    </Text>
  </Html>
</template>
