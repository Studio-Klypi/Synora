<script setup lang="ts">
import { Send, LoaderCircle } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";

definePageMeta({
  layout: "password-reset",
  noAuth: true,
});

const { t } = useI18n();
useHead({
  title: t("forgot-password.tab", { name: useBrandName() }),
});

const loading = ref<boolean>(false);

const schema = toTypedSchema(z.object({
  email: z.string({
    message: t("errors.fields.required"),
  }).email({
    message: t("errors.fields.email"),
  }),
}));
const form = useForm({
  validationSchema: schema,
});
const submit = form.handleSubmit(async (values) => {
  loading.value = true;

  try {
    await $fetch("/api/security/password-lost", {
      method: "POST",
      body: {
        ...values,
      },
    });
    // TODO: toast
  }
  catch (e) {
    // TODO: toast
    console.error(e);
  }
  finally {
    loading.value = false;
    await navigateTo(useLocalePath()("/portal/auth/login"));
  }
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ t("forgot-password.title") }}</CardTitle>
      <CardDescription>{{ t("forgot-password.caption") }}</CardDescription>
    </CardHeader>

    <form @submit="submit">
      <CardContent>
        <FormField
          v-slot="{ componentField }"
          name="email"
        >
          <FormItem>
            <FormLabel>{{ t("forgot-password.fields.email") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                type="email"
                placeholder="john.doe@example.xyz"
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
          <Send v-else />
          {{ t("forgot-password.actions.send") }}
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
