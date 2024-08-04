import Navbar from "@/components/Navbar";
import SideBar from "./Plant/components/SideBar";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="flex w-full gap-6">
        <div>
          <SideBar />
        </div>
        <div className="m-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout