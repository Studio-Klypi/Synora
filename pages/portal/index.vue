<script setup lang="ts">
import { Plus, LoaderCircle } from "lucide-vue-next";
import CreateCompanyDialog from "~/components/library/companies/CreateCompanyDialog.vue";

definePageMeta({
  layout: "app-empty",
  authRequired: true,
});

const { t } = useI18n();
useHead({
  title: t("portal.tab", { name: useBrandName() }),
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
    <nav class="flex flex-col items-center gap-4">
      <template v-if="loading">
        <div class="w-full grid place-items-center">
          <LoaderCircle class="animate-spin" />
        </div>
      </template>
      <template v-else>
        <template v-if="companies.length">
          <h2 class="text-lg font-bold mb-2">
            {{ t("portal.title") }}
          </h2>

          <div class="flex flex-wrap gap-4 items-center">
            <Button
              v-for="company in companies"
              :key="company.uuid"
              variant="outline"
              size="avatar"
              class="outline outline-border hover:outline-offset-4 transition-all"
              as-child
            >
              <NuxtLinkLocale :to="`/app/${company.uuid}/`">
                <Avatar size="lg">
                  <AvatarFallback>{{ company.name.substring(0, 2).toUpperCase() }}</AvatarFallback>
                </Avatar>
              </NuxtLinkLocale>
            </Button>

            <CreateCompanyDialog>
              <Button
                variant="outline"
                size="avatar"
                class="text-muted-foreground"
              >
                <div class="flex">
                  <Plus />
                </div>
              </Button>
            </CreateCompanyDialog>
          </div>
        </template>
        <template v-else>
          <h2 class="text-muted-foreground">
            {{ t("portal.empty.label") }}
          </h2>

          <CreateCompanyDialog>
            <Button class="mt-2">
              <Plus />
              {{ t("portal.empty.action") }}
            </Button>
          </CreateCompanyDialog>
        </template>
      </template>
    </nav>

    <!-- TODO: enable admin panel -->
    <template v-if="false">
      <Separator
        class="mt-6 mb-2"
        :label="t('labels.or').toUpperCase()"
      />

      <footer>
        <Button variant="link">
          {{ t("portal.joinAdminPanel") }}
        </Button>
      </footer>
    </template>
  </div>
</template>
