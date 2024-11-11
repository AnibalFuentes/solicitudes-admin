import SideNavbar from "@/components/SideNavbar"
import { cn } from "@/lib/utils"

export default function DashboardLayout ({
    children
  }: Readonly<{
    children: React.ReactNode
  }>) {
    return (
      
        <div
          className={cn('min-h-screen w-full bg-white  flex', {
            'debug-screens': process.env.NODE_ENV === 'development'
          })}
        >
          {
            //? Sidebar
          }
          {/* <p className='border'>Sidebar</p> */}
          <SideNavbar />
          {
            //? MainPage
          }
          <div className='p-8 w-full'>
            {children}
            {/* <Toaster /> */}
          </div>
        </div>
     
    )
  }