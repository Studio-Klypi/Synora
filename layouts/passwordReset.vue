<script setup lang="ts">
import { ChevronLeft } from "lucide-vue-next";
</script>

<template>
  <div
    role="application"
    class="w-full min-h-dvh p-6 sm:grid sm:place-items-center"
  >
    <main class="flex flex-col gap-2 w-[min(100%,480px)]">
      <header>
        <Button
          variant="ghost"
          as-child
        >
          <NuxtLinkLocale to="/portal/auth/login">
            <ChevronLeft />
            {{ $t("btn.backToLogin") }}
          </NuxtLinkLocale>
        </Button>
      </header>

      <NuxtPage />
    </main>
  </div>
</template>
