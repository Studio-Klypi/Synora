<script setup lang="ts">
import ClientSidebar from "~/components/library/sidebars/ClientSidebar.vue";
</script>

<template>
  <div role="application">
    <SidebarProvider>
      <ClientSidebar />

      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SidebarTrigger />
          <p>breadcrumb</p>
        </header>

        <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
          <NuxtPage />
        </main>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
