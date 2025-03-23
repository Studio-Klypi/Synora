<script setup lang="ts">
import { Save, LoaderCircle } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { NAME_REGEX, PHONE_REGEX, SIRET_REGEX } from "assets/constants";
import { CalendarDate, DateFormatter, parseDate, toCalendarDate, fromDate, getLocalTimeZone, today } from "@internationalized/date";
import { toDate } from "reka-ui/date";
import type { IBackCompany } from "~/types/companies/companies";
import ConfirmationDialog from "~/components/library/dialogs/ConfirmationDialog.vue";

definePageMeta({
  layout: "app-default",
  authRequired: true,
});

const { t } = useI18n();

useHead({
  title: t("tabs.company", {
    page: t("settings.tab"),
    name: useBrandName(),
  }),
});

const text = (path: string) => t(`settings.${path}`);

const store = useCompaniesStore();
const updating = computed((): boolean => store.updatingCompany);
const deleting = computed((): boolean => store.deletingCompany);
const company = computed(() => store.selectedCompany as IBackCompany);

const confirmDelete = ref<boolean>(false);

const df = new DateFormatter("fr-FR", {
  dateStyle: "long",
});
const dob = computed({
  get: () => form.values.dateOfBirth ? parseDate(form.values.dateOfBirth) : undefined,
  set: val => val,
});

const schema = toTypedSchema(z.object({
  name: z.string({
    message: t("errors.fields.required"),
  }).regex(NAME_REGEX, t("errors.fields.name")),
  email: z.string({
    message: t("errors.fields.required"),
  }).email(t("errors.fields.email")),
  phone: z.string().regex(PHONE_REGEX, t("errors.fields.phone")).optional(),

  corporateName: z.string({
    message: t("errors.fields.required"),
  }).regex(NAME_REGEX, t("errors.fields.name")),
  address: z.string({
    message: t("errors.fields.required"),
  }).min(1, t("errors.fields.address")),
  siret: z.string({
    message: t("errors.fields.required"),
  }).regex(SIRET_REGEX, t("errors.fields.siret")).optional(),
  dateOfBirth: z.string({
    message: t("errors.fields.required"),
  }),
}));
const form = useForm({
  validationSchema: schema,
  initialValues: {
    name: company.value.name,
    email: company.value.email,
    phone: company.value.phone ?? undefined,
    corporateName: company.value.corporateName,
    address: company.value.address,
    siret: company.value.siret ?? undefined,
    dateOfBirth: toCalendarDate(fromDate(new Date(company.value.dateOfBirth), getLocalTimeZone())).toString(),
  },
});

const save = form.handleSubmit(async (values) => {
  await store.editCompany({
    ...values,
    siren: values.siret?.substring(0, 9) ?? undefined,
    dateOfBirth: new Date(values.dateOfBirth),
  });
});

async function deleteCompany() {
  await store.deleteCompany();
}
</script>

<template>
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
              <Input
                placeholder="John Doe Association"
                :disabled="disabledByPermission('company.edit.general')"
              />
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
                :disabled="disabledByPermission('company.edit.general')"
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
                :disabled="disabledByPermission('company.edit.general')"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="corporateName"
        >
          <FormItem>
            <FormLabel>{{ text("fields.corporate-name") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                placeholder="John Doe Association"
                :disabled="disabledByPermission('company.edit.general')"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="address"
        >
          <FormItem>
            <FormLabel>{{ text("fields.address") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                placeholder="12 rue du Paradis, 71100 Paris Cedex, France"
                :disabled="disabledByPermission('company.edit.general')"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="siret"
        >
          <FormItem>
            <FormLabel>{{ text("fields.siret") }} <span class="text-sm text-muted-foreground italic">{{ t("labels.fields.optional") }}</span></FormLabel>
            <FormControl v-bind="componentField">
              <Input
                placeholder="01234567890123"
                :disabled="disabledByPermission('company.edit.general')"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="dateOfBirth">
          <FormItem class="flex flex-col">
            <FormLabel>{{ text("fields.date-of-birth") }}</FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline"
                    class="justify-start"
                  >
                    <span>{{ dob ? df.format(toDate(dob)) : t("labels.fields.pick-a-date") }}</span>
                  </Button>
                  <input hidden>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar
                  v-model="dob"
                  calendar-label="Date of birth"
                  initial-focus
                  :min-value="new CalendarDate(1900, 1, 1)"
                  :max-value="today(getLocalTimeZone())"
                  @update:model-value="(v: any) => {
                    console.log(v);
                    form.setFieldValue('dateOfBirth', v ? v.toString() : undefined)
                  }"
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        </FormField>

        <footer>
          <Button :disabled="updating || disabledByPermission('company.edit.general')">
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

    <div class="flex flex-col mt-4 gap-4">
      <h2 class="text-3xl font-bold text-destructive">
        {{ text("danger-zone.title") }}
      </h2>

      <Card class="border-destructive">
        <CardContent class="p-0 divide-y">
          <section class="p-4 flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-6">
            <header class="flex flex-col">
              <h3 class="font-semibold">
                {{ text("danger-zone.delete.title") }}
              </h3>
              <p>{{ text("danger-zone.delete.caption") }}</p>
            </header>

            <Button
              variant="destructive"
              :disabled="disabledByPermission('company.security.delete')"
              @click="confirmDelete = true"
            >
              {{ text("danger-zone.delete.action") }}
            </Button>
            <ConfirmationDialog
              caption="settings.danger-zone.delete.confirmation"
              :action="deleteCompany"
              :open="confirmDelete"
              :loading="deleting"
              @update:open="confirmDelete = $event"
              @confirmed="confirmDelete = false"
            />
          </section>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
