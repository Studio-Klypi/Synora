export default defineNuxtRouteMiddleware(async (to) => {
  const uuid = to.params.companyUuid;
  if (!uuid) return;

  const store = useCompaniesStore();
  const selected = computed(() => store.selectedCompany);

  if (selected.value && selected.value.uuid === uuid) return;

  await store.selectCompany(uuid as string);
});
