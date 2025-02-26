import type { INewUserPayload, IUser, IUserLoginPayload, UserState } from "~/types/auth/users";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    me: null,
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
