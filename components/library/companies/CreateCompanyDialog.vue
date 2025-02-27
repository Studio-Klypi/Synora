<script setup lang="ts">
import { X, Plus, LoaderCircle } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { NAME_REGEX, PHONE_REGEX, SIRET_REGEX } from "assets/constants";

const { t } = useI18n();

const props = withDefaults(defineProps<{
  open?: boolean;
}>(), {
  open: false,
});
const emit = defineEmits<{
  "update:open": [boolean];
}>();

const open = ref<boolean>(props.open);
watch(props, (val) => {
  open.value = val.open ?? false;
});

const store = useCompaniesStore();
const loading = computed(() => store.loading);

const schema = toTypedSchema(z.object({
  name: z.string({
    message: t("errors.fields.required"),
  }).regex(NAME_REGEX, t("dialogs.create-company.fields.name.error")),
  email: z.string({
    message: t("errors.fields.required"),
  }).email(t("errors.fields.email")),
  phone: z.string().regex(PHONE_REGEX, t("errors.fields.phone")).optional(),
  address: z.string({
    message: t("errors.fields.required"),
  }).min(1, t("errors.fields.address")),
  corporateName: z.string({
    message: t("errors.fields.required"),
  }).regex(NAME_REGEX, t("dialogs.create-company.fields.corporate-name.error")),
  siret: z.string().regex(SIRET_REGEX, t("errors.fields.siret")).optional(),
  dateOfBirth: z.string({
    message: t("errors.fields.required"),
  }).refine(val => new Date(val).getTime() < Date.now(), t("dialogs.create-company.fields.date-of-birth.error")),
  terms: z.boolean().refine(val => val, t("errors.fields.required")),
}));
const form = useForm({
  validationSchema: schema,
});
const submit = form.handleSubmit(async (values) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (values as any).terms;

  const company = await store.createCompany({
    ...values,
    dateOfBirth: new Date(values.dateOfBirth),
  });

  if (!company) return;
  emit("update:open", false);
  await navigateTo(useLocalePath()(`/app/${company.uuid}`));
});
</script>

<template>
  <Dialog
    :open="open"
    @update:open="toggleState"
  >
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t("dialogs.create-company.title") }}</DialogTitle>
      </DialogHeader>

      <form
        class="flex flex-col gap-4"
        @submit="submit"
      >
        <div class="grid gap-4 sm:grid-cols-2">
          <FormField
            v-slot="{ componentField }"
            name="name"
          >
            <FormItem class="sm:col-span-2">
              <FormLabel>{{ t("dialogs.create-company.fields.name.label") }}</FormLabel>
              <FormControl v-bind="componentField">
                <Input :placeholder="t('dialogs.create-company.fields.name.placeholder')" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="email"
          >
            <FormItem>
              <FormLabel>{{ t("dialogs.create-company.fields.email") }}</FormLabel>
              <FormControl v-bind="componentField">
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
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
              <FormLabel>{{ t("dialogs.create-company.fields.phone") }} <span class="text-sm text-muted-foreground italic">{{ t("labels.fields.optional") }}</span></FormLabel>
              <FormControl v-bind="componentField">
                <Input
                  type="tel"
                  placeholder="01 23 45 67 89"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="address"
          >
            <FormItem class="sm:col-span-2">
              <FormLabel>{{ t("dialogs.create-company.fields.address") }}</FormLabel>
              <FormControl v-bind="componentField">
                <Input placeholder="12 rue du Paradis, 71000, Paris, France" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="corporateName"
          >
            <FormItem class="sm:col-span-2">
              <FormLabel>{{ t("dialogs.create-company.fields.corporate-name.label") }}</FormLabel>
              <FormControl v-bind="componentField">
                <Input :placeholder="t('dialogs.create-company.fields.corporate-name.placeholder')" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="siret"
          >
            <FormItem>
              <FormLabel>{{ t("dialogs.create-company.fields.siret") }} <span class="text-sm text-muted-foreground italic">{{ t("labels.fields.optional") }}</span></FormLabel>
              <FormControl v-bind="componentField">
                <Input
                  inputmode="numeric"
                  placeholder="01234567890123"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="dateOfBirth"
          >
            <FormItem>
              <FormLabel>{{ t("dialogs.create-company.fields.date-of-birth.label") }}</FormLabel>
              <FormControl v-bind="componentField">
                <Input
                  type="date"
                  :placeholder="t('dialogs.create-company.fields.date-of-birth.placeholder')"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ value, handleChange }"
            name="terms"
          >
            <FormItem class="sm:col-span-2 flex flex-row items-center gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  :model-value="value"
                  @update:model-value="handleChange"
                />
              </FormControl>
              <FormLabel class="font-normal">
                {{ t("dialogs.create-company.fields.terms") }}
              </FormLabel>
            </FormItem>
          </FormField>
        </div>

        <DialogFooter>
          <DialogClose as-child>
            <Button
              type="button"
              variant="secondary"
              :disabled="loading"
            >
              <X />
              {{ t("btn.cancel") }}
            </Button>
          </DialogClose>
          <Button :disabled="loading">
            <LoaderCircle
              v-if="loading"
              class="animate-spin"
            />
            <Plus v-else />
            {{ t("dialogs.create-company.actions.create") }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
