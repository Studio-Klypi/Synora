import type { INewUserPayload, IUser, IUserLoginPayload, UserState } from "~/types/auth/users";
import type { EPermissions } from "~/types/security/permissions";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    me: null,
    permissions: [],
    loading: false,
  }),
  actions: {
    async recoverMe() {
      this.loading = true;

      try {
        const { data } = await useFetch<IUser>("/api/users/me");
        if (!data.value) return;
        this.me = data.value;
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.loading = false;
      }
    },
    async recoverMyPermissions(uuid: string) {
      try {
        const { data } = await useFetch<string[]>(`/api/companies/${uuid}/authorizations`);
        if (!data.value) return;
        this.permissions = data.value as EPermissions;
        console.log(this.permissions);
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
    },
    async registerUser(payload: INewUserPayload) {
      this.loading = true;

      try {
        this.me = await $fetch<IUser>("/api/users/create", {
          method: "POST",
          body: payload,
        });
        await navigateTo(useLocalePath()("/portal"));
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.loading = false;
      }
    },
    async loginUser(payload: IUserLoginPayload) {
      this.loading = true;

      try {
        this.me = await $fetch<IUser>("/api/users/login", {
          method: "POST",
          body: payload,
        });
        useCompaniesStore().fetchUserCompanies().then();
        await navigateTo(useLocalePath()("/portal"));
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.loading = false;
      }
    },
  },
  getters: {
    getUser: (state: UserState) => state.me,
    getFullName: (state: UserState) => state.me ? `${state.me.firstName} ${state.me.lastName}` : null,
  },
});
