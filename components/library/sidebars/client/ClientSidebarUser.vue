<script setup lang="ts">
import { ChevronsUpDown, LogOut } from "lucide-vue-next";
import type { IUser } from "~/types/auth/users";
import { useSidebar } from "~/components/ui/sidebar";

const store = useUserStore();
const me = computed(() => store.getUser as IUser);
const initials = computed(() =>
  (store.getFullName as string)
    .split(" ")
    .map(p => p.substring(0, 1).toUpperCase())
    .join("").substring(0, 2));

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
              <AvatarFallback>{{ initials }}</AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ me.firstName }}</span>
              <span class="truncate text-xs text-muted-foreground">{{ me.email }}</span>
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
                <AvatarFallback>{{ initials }}</AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ me.firstName }}</span>
                <span class="truncate text-xs text-muted-foreground">{{ me.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            Coming Soon...
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem class="gap-2 p-1">
              <LogOut />
              {{ $t("btn.log-out") }}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
