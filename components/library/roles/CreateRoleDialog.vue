<script setup lang="ts">
import { X, Plus, LoaderCircle } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { NAME_REGEX } from "assets/constants";

const { t } = useI18n();

const open = ref<boolean>(false);

const store = useCompaniesStore();
const loading = computed(() => store.creatingRole);

const schema = toTypedSchema(z.object({
  name: z.string({
    message: t("errors.fields.required"),
  }).regex(NAME_REGEX, t("errors.fields.name")),
  permissions: z.array(z.string()).optional(),
}));
const form = useForm({
  validationSchema: schema,
  initialValues: {
    permissions: [],
  },
});
const submit = form.handleSubmit(async (values) => {
  await store.createRole({
    name: values.name,
    permissions: values.permissions ?? [],
  });
  open.value = false;
});
</script>

<template>
  <Dialog
    :open="open"
    @update:open="open = $event"
  >
    <DialogTrigger>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader />

      <form @submit="submit">
        <FormField
          v-slot="{ componentField }"
          name="name"
        >
          <FormItem>
            <FormLabel>{{ $t("roles.dialog.create-role.fields.name") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input placeholder="Ex : Mon rôle" />
            </FormControl>
          </FormItem>
        </FormField>
        <!-- TODO: <FormField name="permissions">
          <FormItem>
            <FormLabel>{{ $t("roles.dialog.create-role.fields.permissions") }}</FormLabel>
          </FormItem>
        </FormField> -->

        <DialogFooter class="mt-4">
          <DialogClose as-child>
            <Button
              type="button"
              variant="secondary"
            >
              <X />
              {{ $t("btn.cancel") }}
            </Button>
          </DialogClose>
          <Button :disabled="loading">
            <LoaderCircle
              v-if="loading"
              class="animate-spin"
            />
            <Plus v-else />
            {{ $t("roles.dialog.create-role.action") }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
