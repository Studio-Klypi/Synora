export interface INavSection {
  label?: string;
  new?: boolean;
  planned?: boolean;
  children: (INavGroup | INavItem)[];
}

export interface INavGroup {
  type: "group";
  label: string;
  icon: Component;
  new?: boolean;
  planned?: boolean;
  isActive?: boolean;
  children: INavItem[];
}
export interface INavItem {
  type: "item";
  label: string;
  new?: boolean;
  planned?: boolean;
  icon?: Component;
  url: string;
}
