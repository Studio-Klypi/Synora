<script setup lang="ts">
import { ChevronLeft } from "lucide-vue-next";
</script>

<template>
  <div
    role="application"
    class="w-full min-h-dvh p-6 sm:grid sm:place-items-center"
  >
    <main class="flex flex-col gap-2">
      <header>
        <Button
          variant="ghost"
          as-child
        >
          <NuxtLinkLocale to="/">
            <ChevronLeft />
            {{ $t("btn.backToHome") }}
          </NuxtLinkLocale>
        </Button>
      </header>

      <NuxtPage />

      <footer class="flex items-center justify-center flex-wrap gap-4">
        <Button
          size="sm"
          variant="link"
        >
          {{ $t("links.tou") }}
        </Button>
        <Button
          size="sm"
          variant="link"
        >
          {{ $t("links.policies") }}
        </Button>
      </footer>
    </main>
  </div>
</template>
