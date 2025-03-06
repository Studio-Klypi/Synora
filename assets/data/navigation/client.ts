import { Home, Tags } from "lucide-vue-next";
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
    ],
  },
];
