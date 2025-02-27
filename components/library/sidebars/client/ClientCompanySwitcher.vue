<script setup lang="ts">
import { ChevronsUpDown, Plus } from "lucide-vue-next";
import type { IBackCompany } from "~/types/companies/companies";
import { useSidebar } from "~/components/ui/sidebar";
import CreateCompanyDialog from "~/components/library/companies/CreateCompanyDialog.vue";

defineProps<{
  company: IBackCompany;
  companies: IBackCompany[];
}>();

const dialogOpen = ref<boolean>(false);

const { isMobile } = useSidebar();
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar
              class="size-8"
              shape="square"
            >
              <AvatarFallback>
                {{ company.name.substring(0, 2).toUpperCase() }}
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ company.name }}</span>
              <span class="truncate text-xs text-muted-foreground">{{ company.email }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start"
          :side="isMobile ? 'bottom' : 'right'"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar
                class="size-8"
                shape="square"
              >
                <AvatarFallback>
                  {{ company.name.substring(0, 2).toUpperCase() }}
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ company.name }}</span>
                <span class="truncate text-xs text-muted-foreground">{{ company.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel class="text-xs text-muted-foreground">
              {{ $t("nav-actions.label") }}
            </DropdownMenuLabel>
            <DropdownMenuItem
              v-for="c in companies"
              :key="c.name"
              class="gap-2 p-2"
              :class="{ 'bg-accent text-sidebar-accent-foreground': company.uuid === c.uuid }"
              as-child
            >
              <NuxtLinkLocale :to="`/app/${c.uuid}`">
                <Avatar
                  class="size-6"
                  shape="square"
                >
                  <AvatarFallback class="text-[0.5rem]">
                    {{ c.name.substring(0, 2).toUpperCase() }}
                  </AvatarFallback>
                </Avatar>
                {{ c.name }}
              </NuxtLinkLocale>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              class="gap-2 p-2"
              @click="dialogOpen = true"
            >
              <div class="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus class="size-4" />
              </div>
              <span class="font-medium text-muted-foreground">{{ $t("nav-actions.new-company") }}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>

  <CreateCompanyDialog
    :open="dialogOpen"
    @update:open="dialogOpen = $event"
  />
</template>
