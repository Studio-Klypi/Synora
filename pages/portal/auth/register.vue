<script setup lang="ts">
import { UserPlus, LoaderCircle } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { NAME_REGEX, PASSWORD_REGEX, PHONE_REGEX } from "assets/constants";
import { useForm } from "vee-validate";

definePageMeta({
  layout: "authentication",
  noAuth: true,
});

const { t } = useI18n();
useHead({
  title: t("register.tab", { name: useBrandName() }),
});

const userStore = useUserStore();
const loading = computed(() => userStore.loading);

const schema = toTypedSchema(z.object({
  firstName: z.string({
    message: t("errors.fields.required"),
  }).regex(NAME_REGEX, t("register.fields.firstName.error")),
  lastName: z.string({
    message: t("errors.fields.required"),
  }).regex(NAME_REGEX, t("register.fields.lastName.error")).transform(val => val.toUpperCase()),
  address: z.string({
    message: t("errors.fields.required"),
  }).min(1, t("errors.fields.address")),
  email: z.string({
    message: t("errors.fields.required"),
  }).email({
    message: t("errors.fields.email"),
  }),
  phone: z.string().regex(PHONE_REGEX, t("errors.fields.phone")).optional(),
  credentials: z.object({
    password: z.string({
      message: t("errors.fields.required"),
    }).regex(PASSWORD_REGEX, t("errors.fields.password.regex")),
    confirm: z.string({
      message: t("errors.fields.required"),
    }).regex(PASSWORD_REGEX, t("errors.fields.password.regex")),
  }).refine(val => val.password === val.confirm, t("errors.fields.password.no-match")),
}));
const form = useForm({
  validationSchema: schema,
});
const submit = form.handleSubmit(async ({ firstName, lastName, address, email, phone, credentials }) => {
  await userStore.registerUser({
    firstName,
    lastName,
    address,
    email,
    phone,
    password: credentials.confirm,
  });
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ t("register.title") }}</CardTitle>
    </CardHeader>

    <form @submit="submit">
      <CardContent class="grid sm:grid-cols-2 gap-4">
        <FormField
          v-slot="{ componentField }"
          name="firstName"
        >
          <FormItem>
            <FormLabel>{{ t("register.fields.firstName.label") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input placeholder="John" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="lastName"
        >
          <FormItem>
            <FormLabel>{{ t("register.fields.lastName.label") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input placeholder="DOE" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="address"
        >
          <FormItem class="sm:col-span-2">
            <FormLabel>{{ t("register.fields.address.label") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input placeholder="12 Rue du Paradis, 71000, Paris, France" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="email"
        >
          <FormItem>
            <FormLabel>{{ t("register.fields.email.label") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                type="email"
                placeholder="john.doe@example.xyz"
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
            <FormLabel>{{ t("register.fields.phone.label") }} <span class="text-sm text-muted-foreground italic">{{ t("labels.fields.optional") }}</span></FormLabel>
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
          name="credentials.password"
        >
          <FormItem>
            <FormLabel>{{ t("register.fields.password.label") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                type="password"
                placeholder="············"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="credentials.confirm"
        >
          <FormItem>
            <FormLabel>{{ t("register.fields.confirm.label") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                type="password"
                placeholder="············"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>

      <CardFooter class="flex flex-col items-stretch gap-2 sm:flex-row sm:justify-between sm:items-center">
        <p class="text-muted-foreground italic text-sm">
          {{ t("register.actions.terms") }}
        </p>

        <Button
          class="shrink-0"
          :disabled="loading"
        >
          <LoaderCircle v-if="loading" />
          <UserPlus v-else />
          {{ t("register.actions.createAccount") }}
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
