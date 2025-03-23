import { Landmark, Library, BookOpenText, ArrowLeftRight, Waypoints, Book, Home, Settings, Tags, Users } from "lucide-vue-next";
import type { INavSection } from "~/types/frontend/navigation";

export const navSections: INavSection[] = [
  {
    children: [
      {
        type: "item",
        label: "overview",
        icon: Home,
        url: "/",
      },
    ],
  },
  {
    label: "accounting",
    children: [
      {
        type: "group",
        label: "plan",
        icon: Waypoints,
        planned: true,
        children: [
          {
            type: "item",
            label: "accounts",
            url: "/accounting/plan/accounts",
          },
          {
            type: "item",
            label: "journals",
            url: "/accounting/plan/journals",
          },
        ],
      },
      {
        type: "item",
        label: "transactions",
        icon: ArrowLeftRight,
        planned: true,
        url: "/accounting/transactions",
      },
      {
        type: "item",
        label: "exercise",
        icon: BookOpenText,
        planned: true,
        url: "/accounting/exercises",
      },
      {
        type: "group",
        label: "documents",
        icon: Library,
        children: [
          {
            type: "item",
            label: "results",
            url: "/accounting/documents/results",
            planned: true,
          },
          {
            type: "item",
            label: "review",
            url: "/accounting/documents/review",
            planned: true,
          },
        ],
      },
    ],
  },
  {
    label: "administration",
    children: [
      {
        type: "item",
        label: "roles",
        icon: Tags,
        url: "/admin/roles",
        new: true,
      },
      {
        type: "item",
        label: "users",
        icon: Users,
        url: "/admin/members",
        new: true,
      },
      {
        type: "group",
        label: "settings",
        icon: Settings,
        children: [
          {
            type: "item",
            label: "general",
            new: true,
            url: "/admin/settings",
          },
        ],
      },
    ],
  },
  {
    label: "resources",
    planned: true,
    children: [
      {
        type: "item",
        label: "wiki",
        icon: Book,
        url: "https://wiki.synora.org/getting-started",
      },
    ],
  },
  {
    label: "archives",
    children: [
      {
        type: "group",
        label: "accounting",
        icon: Landmark,
        children: [
          {
            type: "item",
            label: "accounts",
            url: "/archives/accounting/accounts",
            planned: true,
          },
          {
            type: "item",
            label: "exercises",
            url: "/archives/accounting/exercises",
            planned: true,
          },
          {
            type: "item",
            label: "documents",
            url: "/archives/accounting/documents",
            planned: true,
          },
        ],
      },
    ],
  },
];
