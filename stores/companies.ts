import type {
  CompaniesState,
  IBackCompany,
  INewCompanyPayload,
  IUpdateCompanyPayload,
} from "~/types/companies/companies";
import type { IOpListResult } from "~/types/generics/database";
import type { IBackRole, INewRolePayload, IUpdateRolePayload } from "~/types/companies/roles";
import type { IBackCompanyMember, INewCompanyMemberPayload } from "~/types/companies/members";

export const useCompaniesStore = defineStore("companies", {
  state: (): CompaniesState => ({
    companies: [],
    selectedCompany: null,
    // company
    loading: false,
    updatingCompany: false,
    deletingCompany: false,
    // roles
    loadingRoles: false,
    creatingRole: false,
    deletingRole: false,
    // members
    creatingMember: false,
    updatingMember: false,
    deletingMember: false,
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
    async editCompany(payload: IUpdateCompanyPayload) {
      if (!this.selectedCompany) return;

      this.updatingCompany = true;

      try {
        const company = await $fetch<IBackCompany>(`/api/companies/${this.selectedCompany.uuid}`, {
          method: "PUT",
          body: payload,
        });
        // todo: toast
        this.selectedCompany = company;
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.updatingCompany = false;
      }
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
    async deleteCompany() {
      if (!this.selectedCompany) return;

      this.deletingCompany = true;

      try {
        await $fetch(`/api/companies/${this.selectedCompany.uuid}`, {
          method: "DELETE",
        });
        this.companies = this.companies.filter(c => c.uuid !== this.selectedCompany?.uuid);
        this.selectedCompany = null;

        navigateTo(useLocalePath()(
          this.companies.length === 1
            ? `/app/${this.companies[0].uuid}/`
            : "/portal",
        ));
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.deletingCompany = false;
      }
    },
    // roles
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
    updateRolesMembers() {
      if (!this.selectedCompany) return;

      this.selectedCompany.roles = this.selectedCompany.roles?.map(role => ({
        ...role,
        members: this.selectedCompany?.members?.filter(mbr => mbr.roleId === role.id) ?? [],
      })) ?? [];
    },
    // members
    async createMember(payload: Omit<INewCompanyMemberPayload, "companyUuid">) {
      if (!this.selectedCompany) return;

      this.creatingMember = true;

      try {
        const member = await $fetch<IBackCompanyMember>(`/api/companies/${this.selectedCompany.uuid}/members`, {
          method: "POST",
          body: payload,
        });
        // TODO: toast
        this.selectedCompany.members = [
          ...(this.selectedCompany.members ?? []),
          member,
        ];
        this.updateRolesMembers();
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.creatingMember = false;
      }
    },
    async editMemberRole(member: IBackCompanyMember, roleId: number | null) {
      if (!this.selectedCompany) return;

      this.updatingMember = true;

      try {
        const newMember = await $fetch<IBackCompanyMember>(`/api/companies/${this.selectedCompany.uuid}/members/${member.userUuid}/role`, {
          method: "PATCH",
          body: {
            roleId,
          },
        });
        this.selectedCompany.members = this.selectedCompany.members?.map(mbr => mbr.userUuid === newMember.userUuid ? newMember : mbr) ?? [];
        this.updateRolesMembers();

        const userStore = useUserStore();
        if (userStore.getUser?.uuid === newMember.userUuid) await userStore.recoverMyPermissions(this.selectedCompany.uuid);
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.updatingMember = false;
      }
    },
    // TODO: async editMembersRole(uuids: string[], roleId: number) {},
    async deleteMember(member: IBackCompanyMember) {
      if (!this.selectedCompany) return;

      this.deletingMember = true;

      try {
        await $fetch(`/api/companies/${this.selectedCompany.uuid}/members/${member.userUuid}`, {
          method: "DELETE",
        });

        this.selectedCompany.members = this.selectedCompany.members?.filter(mbr => mbr.userUuid !== member.userUuid) ?? [];
        this.updateRolesMembers();
        // TODO: toast
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.deletingMember = false;
      }
    },
    async deleteMembers(uuids: string[]) {
      if (!this.selectedCompany) return;

      this.deletingMember = true;

      try {
        await $fetch(`/api/companies/${this.selectedCompany.uuid}/members`, {
          method: "DELETE",
          body: {
            members: uuids,
          },
        });

        this.selectedCompany.members = this.selectedCompany.members?.filter(mbr => !uuids.includes(mbr.userUuid)) ?? [];
        this.updateRolesMembers();
      }
      catch (e) {
        // TODO: toast
        console.error(e);
      }
      finally {
        this.deletingMember = false;
      }
    },
  },
  getters: {
    getCompanies: state => state.companies,
    getReducedCompanies: state => state.companies.filter(c => c.uuid !== state.selectedCompany?.uuid),
    getRoles: state => state.selectedCompany?.roles ?? [],
  },
});
