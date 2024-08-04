import React from "react"
import { useEffect, useState, useContext } from "react"
import { FetchAuthentication } from "@/services/Authentication"
import { DoubleArrowLeftIcon, DoubleArrowRightIcon, DashboardIcon, ArchiveIcon, MixIcon, PersonIcon, DesktopIcon, GearIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import { UserContext } from '@/App'
import { useNavigate, useLocation } from "react-router-dom"

const SideBar = () => {
  const navigate = useNavigate()
  const location:string = useLocation()
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const [Username, setUsername] = useState("");
  const [isLoggedin, setisLoggedin] = useState(false);
  const BASE = useContext(UserContext);

  useEffect(() => {
    const loadAuthentication = async () => {
      const data = await FetchAuthentication(BASE);
      if (data.id) {
        setUsername(data.username);
        setisLoggedin(data.isLoggedin);
        return
      }
    }
    loadAuthentication();
  }, [])

  function logOut() {
    localStorage.removeItem("token")
    setisLoggedin(false)
    navigate('/signin')
  }

  const listItemIcons : { [key: string]: React.ComponentType } = {
    DashboardIcon,
    ArchiveIcon,
    MixIcon,
    PersonIcon,
    DesktopIcon,
    GearIcon

}

  const listItems: { icon: string, title: string, href: string }[] = [
    {
      icon: "DashboardIcon",
      title: "DashBoard",
      href: "/dashboard"
    },
    {
      icon: "MixIcon",
      title: "Home",
      href: "/home"
    },
    {
      icon: "PersonIcon",
      title: "Profile",
      href: "/profile"
    },
    {
      icon: "GearIcon",
      title: "Settings",
      href: "/settings"
    }
  ]
  return (
    <aside className='sticky justify-between top-0 left-0 h-screen border-r bg-white overflow-hidden transition-all w-[256px]'>
      <div className='flex flex-col h-full px-6 justify-around items-start'>
        <div className="w-full border-b border-gray-200 flex p-2">
          <img src="https://via.placeholder.com/150" alt="User" className="rounded-full w-12 h-12" />
          <div className="flex flex-col ml-3 text-start">
            <h1 className="text-sm">{Username}</h1>
            <p className="text-sm text-gray-400">{date}{month < 10 ? `/${month}` : `${month}`}/{year}</p>
          </div>
        </div>
        <div className="w-full">
          <ul className='flex flex-col gap-6 justify-start items-center text-start w-full'>
            {listItems.map((item, index) => {
              return (
                <li key={index} className="flex justify-start gap-2 w-full">
                  <a href={item.href} className={`flex w-full justify-start items-center gap-3 p-2 rounded-md transition-all hover:bg-primary-foreground ${location.pathname == item.href && "bg-gray-100 text-primary"}`}>  {React.createElement(listItemIcons[item.icon])} {item.title}</a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="w-full border-t border-gray-200 pt-2">
          {isLoggedin === true && <Button className="w-full" onClick={logOut}>Sign Out</Button>}
        </div>
      </div>
    </aside>
  )
}

export default SideBar