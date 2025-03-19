<script setup lang="ts">
import ClientSidebar from "~/components/library/sidebars/ClientSidebar.vue";
</script>

<template>
  <SidebarProvider>
    <ClientSidebar />
    <SidebarInset class="overflow-hidden">
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator
            orientation="vertical"
            class="mr-2 h-4"
          />
          <p class="italic text-muted-foreground">
            breadcrumps
          </p>
        </div>
      </header>

      <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <NuxtPage />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
