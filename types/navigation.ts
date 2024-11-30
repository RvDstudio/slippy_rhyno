export interface MenuItem {
  label: string;
  icon: string;
  href?: string;
  submenu?: MenuItem[];
}

export interface NavigationSection {
  title: string;
  items: MenuItem[];
}