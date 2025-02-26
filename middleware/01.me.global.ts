export default defineNuxtRouteMiddleware(async () => {
  const token = useCookie("authToken");
  const userUuid = useCookie("userUuid");

  if (!token || !userUuid) return;

  const store = useUserStore();
  const me = computed(() => store.getUser);

  if (me.value) return;

  await store.recoverMe();
});
