import { SideNavItem } from "@/types"
import { BarChart3, Home, Package, Settings, ShoppingCart, Users } from 'lucide-react'


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

// Simplified navigation data for the e-commerce dashboard
export const navItems= [
  { title: "Dashboard", icon: Home, url: "/admin/dashboard" },
  {
    title: "Products",
    icon: Package,
    items: [
      { title: "All Products", url: "/admin/products" },
      { title: "Categories", url: "/admin/products/categories" },

    ],
  },
  { title: "Orders", icon: ShoppingCart, url: "/admin/Orders" },
  { title: "Customers", icon: Users, url: "/admin/customers" },
  { title: "Analytics", icon: BarChart3, url: "/admin/analytics" },
  { title: "Settings", icon: Settings, url: "/admin/settings" },
]
