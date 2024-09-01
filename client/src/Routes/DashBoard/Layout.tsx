import SideBar from "../../components/SideBar";
import FadeIn from "@/components/transitions/FadeIn";
const Layout = ({ children }) => {
  return (
    <div>
      <div className="flex w-full gap-6">
        <div>
          <SideBar />
        </div>
        <div className="ml-64 w-full">
          <FadeIn> {children} </FadeIn>
        </div>
      </div>
    </div>
  )
}

export default Layout