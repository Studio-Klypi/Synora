<script setup lang="ts">
import { Bell, Mail } from "lucide-vue-next";
import ClientSidebar from "~/components/library/sidebars/ClientSidebar.vue";
</script>

<template>
  <SidebarProvider>
    <ClientSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
        <div class="flex w-full items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />

          <div class="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              :disabled="true"
            >
              <Bell />
            </Button>
            <Separator
              orientation="vertical"
              class="h-6"
            />
            <Button
              variant="ghost"
              size="icon"
              :disabled="true"
            >
              <Mail />
            </Button>
          </div>
        </div>
      </header>

      <main class="flex flex-1 flex-col gap-4 p-4">
        <NuxtPage />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
