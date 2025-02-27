<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import CreateCompanyDialog from "~/components/library/companies/CreateCompanyDialog.vue";

definePageMeta({
  layout: "app-empty",
  authRequired: true,
});

const companiesStore = useCompaniesStore();
const companies = computed(() => companiesStore.getCompanies);
const loading = computed(() => companiesStore.loading);

if (!companies.value.length)
  companiesStore.fetchUserCompanies().then();
</script>

<template>
  <div
    role="main"
    class="flex-1 flex flex-col items-center justify-center gap-4"
  >
    <nav class="flex flex-wrap gap-2 items-center">
      <template v-if="loading">
        loading
      </template>
      <template v-else>
        <template v-if="companies.length">
          <Button
            v-for="company in companies"
            :key="company.uuid"
            variant="outline"
            class="h-auto p-0 rounded-full"
            as-child
          >
            <NuxtLinkLocale :to="`/app/${company.uuid}/`">
              <Avatar size="base">
                <AvatarFallback>{{ company.name.substring(0, 2).toUpperCase() }}</AvatarFallback>
              </Avatar>
            </NuxtLinkLocale>
          </Button>
        </template>
        <template v-else>
          no companies
        </template>

        <CreateCompanyDialog>
          <Button
            variant="secondary"
            class="p-6 h-auto rounded-full"
          >
            <div class="flex">
              <Plus />
            </div>
          </Button>
        </CreateCompanyDialog>
      </template>
    </nav>

    <footer>
      go to administration
    </footer>
  </div>
</template>
