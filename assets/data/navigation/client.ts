import { Book, Home, Settings, Tags } from "lucide-vue-next";
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
    label: "administration",
    children: [
      {
        type: "item",
        label: "roles",
        icon: Tags,
        url: "/roles",
        new: true,
      },
      /* {
        type: "item",
        label: "users",
        icon: Tags,
        url: "/",
        planned: true,
      }, */
      {
        type: "group",
        label: "settings",
        icon: Settings,
        children: [
          {
            type: "item",
            label: "general",
            planned: true,
            url: "/settings",
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
];
