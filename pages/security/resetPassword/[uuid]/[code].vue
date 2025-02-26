<script setup lang="ts">
import { LoaderCircle, RefreshCw } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { PASSWORD_REGEX } from "assets/constants";
import { useForm } from "vee-validate";

definePageMeta({
  layout: "password-reset",
  noAuth: true,
});

const { t } = useI18n();
useHead({
  title: t("reset-password.tab", { name: useBrandName() }),
});

const { uuid, code } = useRoute().params;
const loading = ref<boolean>(false);

const schema = toTypedSchema(z.object({
  password: z.string({
    message: t("errors.fields.required"),
  }).regex(PASSWORD_REGEX, t("errors.fields.password.regex")),
  confirm: z.string({
    message: t("errors.fields.required"),
  }).regex(PASSWORD_REGEX, t("errors.fields.password.regex")),
}).refine(val => val.password === val.confirm, t("errors.fields.password.no-match")));
const form = useForm({
  validationSchema: schema,
});
const submit = form.handleSubmit(async (values) => {
  loading.value = true;

  try {
    await $fetch(`/api/users/${uuid}/reset-password`, {
      method: "PUT",
      body: {
        code,
        password: values.confirm,
      },
    });
    // TODO: toast
    await navigateTo("/portal/auth/login");
  }
  catch (e) {
    // TODO: toast
    console.error(e);
  }
  finally {
    loading.value = false;
  }
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ t("reset-password.title") }}</CardTitle>
    </CardHeader>

    <form @submit="submit">
      <CardContent class="grid gap-4">
        <FormField
          v-slot="{ componentField }"
          name="password"
        >
          <FormItem>
            <FormLabel>{{ t("reset-password.fields.password") }}</FormLabel>
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
          name="confirm"
        >
          <FormItem>
            <FormLabel>{{ t("reset-password.fields.confirm") }}</FormLabel>
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
      <CardFooter class="flex flex-col items-stretch sm:items-end">
        <Button :disabled="loading">
          <LoaderCircle
            v-if="loading"
            class="animate-spin"
          />
          <RefreshCw v-else />
          {{ t("reset-password.actions.confirmUpdate") }}
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
