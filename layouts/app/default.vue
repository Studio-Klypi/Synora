<script setup lang="ts">
import { Bell, Mail } from "lucide-vue-next";
import ClientSidebar from "~/components/library/sidebars/ClientSidebar.vue";
</script>

<template>
  <SidebarProvider>
    <ClientSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex w-full items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />

          <div class="ml-auto">
            <Button
              variant="ghost"
              size="icon"
            >
              <Bell />
            </Button>
            <Button
              variant="outline"
              size="icon"
            >
              <Mail />
            </Button>
          </div>
        </div>
      </header>

      <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <NuxtPage />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
