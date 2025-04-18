import { SideNavItem } from "@/types";
import { Home, Package, ShoppingCart, Users } from "lucide-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: "/icon/product.svg",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "/icon/product.svg",
    submenu: true,
    subMenuItems: [
      {
        title: "Products List",
        url: "/admin/products/products-list",
        icon: "/icon/product.svg",
      },
      {
        title: "categories",
        url: "/admin/products/categories",
        icon: "/icon/product.svg",
      },
    ],
  },

  {
    title: "Categories",
    url: "/admin/categories",
    icon: "/icon/product.svg",
  },
  {
    title: "Sales",
    url: "/admin/sales",
    icon: "/icon/product.svg",
  },
  {
    title: "Customers",
    url: "/admin/customers",
    icon: "/icon/product.svg",
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: "/icon/product.svg",
  },
];

//brand

export const APP_NAME: string = "Elegance Catel";

// Simplified navigation data for the e-commerce dashboard
export const navItems = [
  { title: "Dashboard", icon: Home, url: "/admin/dashboard" },
  {
    title: "Products",
    icon: Package,
    items: [
      { title: "All Products", url: "/admin/products" },
      { title: "Categories", url: "/admin/products/categories" },
    ],
  },
  { title: "Orders", icon: ShoppingCart, url: "/admin/orders" },
  { title: "Customers", icon: Users, url: "/admin/customers" },
];

export const NAV_ITEMS = [
  {
    label: "Acceuil",
    icon: "",
    path: "/",
    id: 1,
  },
  {
    label: "Nouveaute",
    icon: "",
    path: "/nouveaute",
    id: 2,
  },
  {
    label: "Boutique",
    icon: "",
    path: "/boutique",
    id: 3,
  },
  {
    label: "Categories",
    icon: "",
    path: "/categories",
    id: 4,
  },
  {
    label: "orders",
    icon: "",
    path: "/orders",
    id: 5,
  },
];
