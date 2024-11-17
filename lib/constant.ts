import { SideNavItem } from "@/types"


export const SIDENAV_ITEMS:SideNavItem[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: '/icon/product.svg',
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: '/icon/product.svg',
    submenu:true,
    subMenuItems:[

      {
        title: "Products List",
        url: "/admin/products/products-list",
        icon: '/icon/product.svg',
      },
      {
        title: "categories",
        url: "/admin/products/categories",
        icon: '/icon/product.svg',
      }
    ]},

  {
    title: "Categories",
    url: "/admin/categories",
    icon: '/icon/product.svg',
  },
  {
    title: "Sales",
    url: "/admin/sales",
    icon: '/icon/product.svg',
  },
  {
    title: "Customers",
    url: "/admin/customers",
    icon: '/icon/product.svg',
  },{
    title: "Settings",
    url: "/admin/settings",
    icon: '/icon/product.svg',
  },
]

//brand

export const APP_NAME: string= "Elegance Catel"