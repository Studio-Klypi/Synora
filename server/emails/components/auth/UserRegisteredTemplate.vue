<script setup lang="ts">
import { Html, Text, Tailwind, Hr, Heading, Section } from "@vue-email/components";
import config from "~/server/emails/tailwind.config";
</script>

<template>
  <Html lang="fr">
    <Tailwind :config="config">
      <Section class="bg-white">
        <Heading as="h2">
          Bonjour, je suis Josh.
        </Heading>
        <Hr />
        <Text class="text-black">
          C'est avec plaisir que je te souhaite la bienvenus ur Synora !
        </Text>
      </Section>
    </Tailwind>
  </Html>
</template>
