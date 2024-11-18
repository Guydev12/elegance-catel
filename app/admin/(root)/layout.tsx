import { CustomSidebar } from "@/components/shared/CustomSidebar";



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
  
      <main>
        <CustomSidebar>
            {children}
        </CustomSidebar>
      </main>
   
  )
}
