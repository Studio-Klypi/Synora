import type { CompaniesState, IBackCompany, INewCompanyPayload } from "~/types/companies/companies";
import type { IOpListResult } from "~/types/generics/database";
import type { IBackRole, INewRolePayload, IUpdateRolePayload } from "~/types/companies/roles";

export const useCompaniesStore = defineStore("companies", {
  state: (): CompaniesState => ({
    companies: [],
    selectedCompany: null,
    loading: false,
    loadingRoles: false,
    creatingRole: false,
    deletingRole: false,
  }),
  actions: {
    async fetchUserCompanies() {
      this.loading = true;

      try {
        const { data: res } = await useFetch<IOpListResult<IBackCompany>>("/api/companies/personal");
        if (!res.value) return;
        this.companies = res.value.data;
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.loading = false;
      }
    },
    async createCompany(payload: INewCompanyPayload) {
      this.loading = true;

      let createdCompany = null;

      try {
        createdCompany = await $fetch<IBackCompany>("/api/companies/create", {
          method: "POST",
          body: payload,
        });
        this.companies = [...this.companies, createdCompany];
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.loading = false;
      }

      return createdCompany;
    },
    async selectCompany(uuid: string) {
      try {
        const { data } = await useFetch<IBackCompany>(`/api/companies/${uuid}`);
        if (!data.value) return;
        this.selectedCompany = data.value;
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
    },
    // roles
    async fetchRoles(perPage: number = 20, page: number = 1) {
      if (!this.selectedCompany) return;

      this.loadingRoles = true;

      try {
        const { data: res } = await useFetch<IOpListResult<IBackRole>>(`/api/companies/${this.selectedCompany.uuid}/roles?perPage=${perPage}&page=${page}`);
        if (!res.value) return;
        this.selectedCompany.roles = res.value.data;
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.loadingRoles = false;
      }
    },
    async createRole(payload: Omit<INewRolePayload, "companyUuid">) {
      if (!this.selectedCompany) return;

      this.creatingRole = true;

      try {
        const role = await $fetch<IBackRole>(`/api/companies/${this.selectedCompany.uuid}/roles/create`, {
          method: "POST",
          body: payload,
        });

        this.selectedCompany.roles = [
          ...(this.selectedCompany.roles ?? []),
          role,
        ];
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.creatingRole = false;
      }
    },
    async editRole(id: number, payload: Omit<IUpdateRolePayload, "companyUuid">) {
      if (!this.selectedCompany) return;

      this.creatingRole = true;

      try {
        const role = await $fetch<IBackRole>(`/api/companies/${this.selectedCompany.uuid}/roles/${id}/update`, {
          method: "PUT",
          body: payload,
        });

        if (!this.selectedCompany.roles) return;

        this.selectedCompany.roles = (this.selectedCompany.roles ?? []).map(r => r.id === role.id ? role : r);

        const userStore = useUserStore();
        if ((role.members ?? []).findIndex(m => m.userUuid === userStore.getUser?.uuid) >= 0) await userStore.recoverMyPermissions(this.selectedCompany.uuid);
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.creatingRole = false;
      }
    },
    async deleteRole(role: IBackRole) {
      if (!this.selectedCompany) return;

      this.deletingRole = true;

      try {
        await $fetch(`/api/companies/${this.selectedCompany.uuid}/roles/${role.id}/delete`, {
          method: "DELETE",
        });

        this.selectedCompany.roles = this.selectedCompany.roles?.filter(r => r.id !== role.id);
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.deletingRole = false;
      }
    },
    async deleteRoles(roles: number[]) {
      if (!this.selectedCompany) return;

      this.deletingRole = true;

      try {
        await $fetch(`/api/companies/${this.selectedCompany.uuid}/roles`, {
          method: "DELETE",
          body: {
            roles,
          },
        });

        this.selectedCompany.roles = this.selectedCompany.roles?.filter(r => !roles.includes(r.id));
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.deletingRole = false;
      }
    },
  },
  getters: {
    getCompanies: state => state.companies,
    getReducedCompanies: state => state.companies.filter(c => c.uuid !== state.selectedCompany?.uuid),
  },
});
