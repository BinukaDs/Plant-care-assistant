import SideBar from "../../components/SideBar";
import FadeIn from "@/components/transitions/FadeIn";
import { useState } from "react";
const Layout = ({ children }) => {
  const [showNav, setshowNav] = useState(false)
  return (
    <div className="flex w-full h-full ">
      <SideBar visible={showNav} show={setshowNav}/>
      <div className={`relative transition-all w-full h-full ${showNav ? 'ml-52 mr-28': 'ml-2 mr-28'} pl-20 `}>
        <FadeIn> {children} </FadeIn>
      </div>
    </div>
  )
}

export default Layout