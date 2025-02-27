import { Home } from "lucide-vue-next";
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
];
