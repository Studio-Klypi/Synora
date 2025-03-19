<script setup lang="ts">
import { Save, LoaderCircle } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { NAME_REGEX, PHONE_REGEX } from "assets/constants";
import type { IBackCompany } from "~/types/companies/companies";

definePageMeta({
  layout: "app-default",
  authRequired: true,
});

const { t } = useI18n();

useHead({
  title: t("tabs.company", {
    page: t("settings.general.tab"),
    name: useBrandName(),
  }),
});

const text = (path: string) => t(`settings.general.${path}`);

const store = useCompaniesStore();
const updating = computed((): boolean => store.updatingCompany);
const company = computed(() => store.selectedCompany as IBackCompany);

const schema = toTypedSchema(z.object({
  name: z.string({
    message: t("errors.fields.required"),
  }).regex(NAME_REGEX, t("errors.fields.name")),
  email: z.string({
    message: t("errors.fields.required"),
  }).email(t("errors.fields.email")),
  phone: z.string().regex(PHONE_REGEX, t("errors.fields.phone")).optional(),
}));
const form = useForm({
  validationSchema: schema,
  initialValues: {
    name: company.value.name,
    email: company.value.email,
    phone: company.value.phone ?? undefined,
  },
});

const save = form.handleSubmit(async (values) => {
  await store.editGeneralInfo(values);
});
</script>

<template>
  <div role="main">
    <h1 class="text-5xl">
      {{ t("settings.general.title") }}
    </h1>
  <div
    role="main"
    class="flex flex-col gap-6"
  >
    <header class="border-b pb-6">
      <h1 class="text-3xl font-bold">
        {{ text("title") }}
      </h1>
    </header>

    <div class="grid sm:grid-cols-3 gap-4">
      <form
        class="flex flex-col gap-4 sm:col-span-2"
        @submit="save"
      >
        <FormField
          v-slot="{ componentField }"
          name="name"
        >
          <FormItem>
            <FormLabel>{{ text("fields.display-name") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input placeholder="John Doe Association" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="email"
        >
          <FormItem>
            <FormLabel>{{ text("fields.email") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                type="email"
                placeholder="john.doe@association.xyz"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="phone"
        >
          <FormItem>
            <FormLabel>{{ text("fields.phone") }} <span class="text-sm text-muted-foreground italic">{{ t("labels.fields.optional") }}</span></FormLabel>
            <FormControl v-bind="componentField">
              <Input
                type="tel"
                placeholder="01 23 45 67 89"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <footer>
          <Button :disabled="updating">
            <LoaderCircle v-if="updating" />
            <Save v-else />
            {{ t("btn.save") }}
          </Button>
        </footer>
      </form>
      <div class="row-start-1 sm:col-start-3 flex flex-col items-start gap-4">
        <Label>{{ text("fields.avatar.label") }}</Label>
        <Avatar
          size="lg"
          shape="square"
        >
          <AvatarFallback>{{ company.name.substring(0, 2).toUpperCase() }}</AvatarFallback>
        </Avatar>
        <Button :disabled="true">
          {{ text("fields.avatar.action") }}
        </Button>
      </div>
    </div>
  </div>
</template>
