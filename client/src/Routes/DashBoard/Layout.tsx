import Navbar from "@/components/Navbar";
import SideBar from "../../components/SideBar";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="flex w-full gap-6">
        <div>
          <SideBar />
        </div>
        <div className="m-5 ml-64 w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout