import Navbar from "@/components/Navbar";
import SideBar from "./Plant/components/SideBar";

const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      <div className="flex m-auto gap-6">
          <div className='flex'>
              <SideBar />
          </div>
          <div className='flex items-center justify-center m-5 md:w-full '>
  
          {children}
          </div>
      </div>
    </>
  )
}

export default Layout