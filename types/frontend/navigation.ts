export interface INavSection {
  label?: string;
  children: (INavGroup | INavItem)[];
}

export interface INavGroup {
  type: "group";
  label: string;
  icon: Component;
  isActive?: boolean;
  children: INavItem[];
}
export interface INavItem {
  type: "item";
  label: string;
  icon?: Component;
  url: string;
}
