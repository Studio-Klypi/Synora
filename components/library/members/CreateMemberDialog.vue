<script setup lang="ts">
import { X, UserPlus } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";

const { t } = useI18n();

const store = useCompaniesStore();
const roles = computed(() => store.getRoles);

const schema = toTypedSchema(z.object({
  email: z.string({
    message: t("errors.fields.required"),
  }).email(t("errors.fields.email")),
  role: z.number().optional(),
}));
const form = useForm({
  validationSchema: schema,
});
const submit = form.handleSubmit(async values => console.log(values));
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t("members.dialogs.create-member.title") }}</DialogTitle>
      </DialogHeader>

      <form
        class="flex flex-col gap-4"
        @submit="submit"
      >
        <FormField
          v-slot="{ componentField }"
          name="email"
        >
          <FormItem>
            <FormLabel>{{ t("members.dialogs.create-member.fields.email") }}</FormLabel>
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
          v-slot="{ value, handleChange }"
          name="role"
        >
          <FormItem>
            <FormLabel>{{ t("members.dialogs.create-member.fields.role") }} <span class="text-sm text-muted-foreground italic">{{ t("labels.fields.optional") }}</span></FormLabel>
            <FormControl>
              <Select
                :model-value="value"
                @update:model-value="(val) => {
                  if (!val) form.resetField('role');
                  else handleChange(Number(val));
                }"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Président" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-if="!!value"
                    :value="null"
                  >
                    Aucun rôle
                  </SelectItem>
                  <SelectItem
                    v-for="role in roles"
                    :key="`role-${role.id}`"
                    :value="role.id"
                  >
                    {{ role.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        </FormField>

        <DialogFooter>
          <DialogClose as-child>
            <Button
              type="button"
              variant="secondary"
            >
              <X />
              {{ t("btn.cancel") }}
            </Button>
          </DialogClose>
          <Button type="submit">
            <UserPlus />
            {{ t("members.dialogs.create-member.action") }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
