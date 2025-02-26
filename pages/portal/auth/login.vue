<script setup lang="ts">
import { Key, LoaderCircle } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { PASSWORD_REGEX } from "assets/constants";
import { useForm } from "vee-validate";

definePageMeta({
  layout: "authentication",
  noAuth: true,
});

const { t } = useI18n();
useHead({
  title: t("login.tab", { name: useBrandName() }),
});

const userStore = useUserStore();
const loading = computed(() => userStore.loading);

const schema = toTypedSchema(z.object({
  email: z.string({
    message: t("errors.fields.required"),
  }).email({
    message: t("errors.fields.email"),
  }),
  password: z.string({
    message: t("errors.fields.required"),
  }).regex(PASSWORD_REGEX, t("errors.fields.password.regex")),
}));
const form = useForm({
  validationSchema: schema,
});
const submit = form.handleSubmit(async (values) => {
  await userStore.loginUser(values);
});
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>{{ t("login.title") }}</CardTitle>
    </CardHeader>

    <form @submit="submit">
      <CardContent class="grid gap-4">
        <FormField
          v-slot="{ componentField }"
          name="email"
        >
          <FormItem>
            <FormLabel>{{ t("login.fields.email.label") }}</FormLabel>
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
          name="password"
        >
          <FormItem>
            <FormLabel>{{ t("login.fields.password.label") }}</FormLabel>
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

      <CardFooter class="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center sm:gap-8">
        <Button
          variant="link"
          class="sm:-ml-4"
          as-child
        >
          <NuxtLinkLocale to="/portal/auth/register">
            {{ t("login.actions.needAnAccount") }}
          </NuxtLinkLocale>
        </Button>
        <Button
          class="shrink-0"
          :disabled="loading"
        >
          <LoaderCircle v-if="loading" />
          <Key v-else />
          {{ t("login.actions.loginAccount") }}
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
