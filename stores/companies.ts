import type { CompaniesState, IBackCompany, INewCompanyPayload } from "~/types/companies/companies";
import type { IOpListResult } from "~/types/generics/database";

export const useCompaniesStore = defineStore("companies", {
  state: (): CompaniesState => ({
    companies: [],
    selectedCompany: null,
    loading: false,
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
  },
  getters: {
    getCompanies: state => state.companies,
  },
});
