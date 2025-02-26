export default defineNuxtRouteMiddleware((to) => {
  const store = useUserStore();
  const me = computed(() => store.getUser);

  if (to.meta.noAuth && me.value) return navigateTo(useLocalePath()("/portal"));

  if (!to.meta.authRequired) return;
  if (!me.value) return navigateTo(useLocalePath()("/portal/auth/login"));
});
