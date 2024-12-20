export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Menus {
  id: string | null;
  description: string;
  name: string;
  items: MenuItem[];
}
