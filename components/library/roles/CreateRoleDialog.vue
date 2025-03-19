<script setup lang="ts">
import { X, Plus, LoaderCircle } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { NAME_REGEX } from "assets/constants";
import { CompanyPermissions, RolePermissions } from "~/types/security/permissions";

const { t } = useI18n();

const open = ref<boolean>();

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
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] max-h-[90dvh] p-0">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>{{ $t("roles.dialogs.create-role.title") }}</DialogTitle>
      </DialogHeader>

      <form
        id="createRoleForm"
        class="grid gap-4 px-6 overflow-y-auto py-1"
        @submit="submit"
      >
        <FormField
          v-slot="{ componentField }"
          name="name"
        >
          <FormItem>
            <FormLabel>{{ $t("roles.dialogs.create-role.fields.name") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input placeholder="Ex : Mon rôle" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="permissions">
          <FormItem>
            <FormLabel>{{ $t("roles.dialogs.create-role.fields.permissions") }}</FormLabel>

            <div class="flex flex-col gap-1">
              <p class="text-sm text-muted-foreground">
                Rôles
              </p>

              <FormField
                v-for="p in RolePermissions"
                v-slot="{ value, handleChange }"
                :key="p"
                type="checkbox"
                :value="p"
                name="permissions"
              >
                <FormItem class="flex flex-row items-start gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      :model-value="value.includes(p)"
                      @update:model-value="handleChange"
                    />
                  </FormControl>
                  <FormLabel class="font-normal">
                    {{ p }}
                  </FormLabel>
                </FormItem>
              </FormField>
              <FormField
                v-for="p in CompanyPermissions"
                v-slot="{ value, handleChange }"
                :key="p"
                type="checkbox"
                :value="p"
                name="permissions"
              >
                <FormItem class="flex flex-row items-start gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      :model-value="value.includes(p)"
                      @update:model-value="handleChange"
                    />
                  </FormControl>
                  <FormLabel class="font-normal">
                    {{ p }}
                  </FormLabel>
                </FormItem>
              </FormField>
            </div>
          </FormItem>
        </FormField>
      </form>

      <DialogFooter class="p-6 pt-0">
        <DialogClose as-child>
          <Button
            type="button"
            variant="secondary"
          >
            <X />
            {{ $t("btn.cancel") }}
          </Button>
        </DialogClose>
        <Button
          form="createRoleForm"
          :disabled="loading"
        >
          <LoaderCircle
            v-if="loading"
            class="animate-spin"
          />
          <Plus v-else />
          {{ $t("roles.dialogs.create-role.action") }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
