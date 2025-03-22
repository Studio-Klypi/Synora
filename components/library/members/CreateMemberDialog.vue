<script setup lang="ts">
import { X, UserPlus, ChevronsUpDown, Check, LoaderCircle } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import debounce from "debounce";
import type { IBackUser } from "~/types/auth/users";
import { cn } from "~/lib/utils";
import type { IOpListResult } from "~/types/generics/database";
import type { IBackCompany } from "~/types/companies/companies";

const { t } = useI18n();
const open = ref<boolean>(false);

const store = useCompaniesStore();
const company = computed(() => store.selectedCompany as IBackCompany);
const roles = computed(() => store.getRoles);

const schema = toTypedSchema(z.object({
  userUuid: z.string({
    message: t("errors.fields.required"),
  }).min(1),
  role: z.number().optional(),
}));
const form = useForm({
  validationSchema: schema,
});
const submit = form.handleSubmit(async ({ userUuid, role }) => {
  await store.createMember({
    userUuid,
    roleId: role,
  });
  open.value = false;
});

const fetchingUsers = ref<boolean>(false);
const users = ref<IBackUser[]>([]);
const debouncedSearch = debounce(fetchUsers, 100);
async function fetchUsers(email: string) {
  fetchingUsers.value = true;

  try {
    const response = await $fetch<IOpListResult<IBackUser>>(`/api/users/public-operations/search?email=${email}&company=${company.value.uuid}`);
    users.value = response.data;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch (e) {
    users.value = [];
  }
  finally {
    fetchingUsers.value = false;
  }
}
</script>

<template>
  <Dialog
    :open="open"
    @update:open="open = $event"
  >
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
        <FormField name="userUuid">
          <FormItem class="flex flex-col">
            <FormLabel>{{ t("members.dialogs.create-member.fields.email") }}</FormLabel>

            <Combobox
              by="email"
            >
              <FormControl class="w-full">
                <ComboboxAnchor>
                  <div class="relative w-full items-center">
                    <ComboboxInput
                      :display-value="(val) => val?.email ?? ''"
                      placeholder="john.doe@example.xyz"
                      @input="debouncedSearch($event.target.value)"
                    />
                    <ComboboxTrigger class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
                      <ChevronsUpDown class="size-4 text-muted-foreground" />
                    </ComboboxTrigger>
                  </div>
                </ComboboxAnchor>
              </FormControl>

              <ComboboxList align="start">
                <ComboboxEmpty>
                  <template v-if="fetchingUsers">
                    <LoaderCircle class="animate-spin" />
                  </template>
                  <template v-else>
                    {{ t("members.dialogs.create-member.errors.no-users") }}
                  </template>
                </ComboboxEmpty>

                <ComboboxGroup>
                  <ComboboxItem
                    v-for="user in users"
                    :key="user.email"
                    :value="user"
                    @select="() => {
                      form.setFieldValue('userUuid', user.uuid)
                    }"
                  >
                    <span>{{ user.firstName }} <span class="text-muted-foreground italic">({{ user.email }})</span></span>

                    <ComboboxItemIndicator>
                      <Check :class="cn('ml-auto size-4')" />
                    </ComboboxItemIndicator>
                  </ComboboxItem>
                </ComboboxGroup>
              </ComboboxList>
            </Combobox>

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
