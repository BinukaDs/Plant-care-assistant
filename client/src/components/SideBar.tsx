import React from "react"
import { useEffect, useState, useContext } from "react"
import { FetchAuthentication } from "@/services/AuthenticationService"
import { ExitIcon, DashboardIcon, ArchiveIcon, MixIcon, PersonIcon, DesktopIcon, GearIcon } from '@radix-ui/react-icons'
import { UserContext } from '@/App'
import SearchComponent from "../Routes/DashBoard/components/Sidebar/SearchComponent"
import FiltersComponent from "@/Routes/DashBoard/components/Sidebar/FiltersComponent"
import { useLocation } from "react-router-dom"
import Cookies from "universal-cookie"
import { Button } from "./ui/button"
import { SignOut } from "@/services/AuthenticationService"
import AddPlantComponent from "@/Routes/DashBoard/components/AddPlant/AddPlant"
const SideBar = () => {
  const cookies = new Cookies();
  const location: string = useLocation()
  const currentDate = {
    date: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };
  const [Username, setUsername] = useState("");
  const [isLoggedin, setisLoggedin] = useState(false);
  const [Locations, setLocations] = useState([])
  const [UserId, setUserId] = useState<string>("")
  const BASE = useContext(UserContext);



  //authentication middleware
  useEffect(() => {
    const loadAuthentication = async () => {
      const data = await FetchAuthentication(BASE, cookies.get("token"));
      if (data.id) {
        setUsername(data.username);
        setUserId(data.id);
        setisLoggedin(data.isLoggedin);
        return
      }
    }
    loadAuthentication();
  }, [UserId])

  const listItemIcons: { [key: string]: React.ComponentType } = {
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
    <aside className='fixed justify-between top-0 left-0 h-full border-r bg-white overflow-hidden transition-all w-[312px]'>
      <div className='flex flex-col h-full w-full px-6  items-start'>
        <div className="w-full border-b border-gray-200 flex justify-between items-center gap-3 p-2 mt-5">
          <SearchComponent UserId={UserId} />
        </div>

        <div className="w-full h-full">
          <div className="flex flex-col gap-6 items-start">
            <div className="w-full flex flex-col justify-center items-start mt-12 gap-y-3">
              <p className="topic text-secondary">Navigation</p>
              <ul className='flex flex-col justify-start items-center text-start w-full'>
                {listItems.map((item, index) => {
                  return (
                    <li key={index} className="flex justify-start gap-2 w-full">
                      <a href={item.href} className={`flex w-full justify-start items-center gap-3 p-2 rounded-md transition-all hover:bg-gray-50 ${location.pathname == item.href && "bg-gray-50 text-primary"}`}>  {React.createElement(listItemIcons[item.icon])} {item.title}</a>
                    </li>
                  )
                })}
              </ul>
            </div>
            {location.pathname === "/dashboard" && <FiltersComponent />}
          </div>
        </div>
        <div className="w-full mb-5">
          <AddPlantComponent userId={UserId} />
        </div>
        <div className="w-full border-t border-gray-200 flex  justify-between items-center p-2 mb-5">
          <img src="https://via.placeholder.com/150" alt="User" className="rounded-full w-12 h-12" />
          <div className="flex flex-col  text-start">
            <h1 className="text-sm">{Username}</h1>
            <p className="text-sm text-gray-400">{`${currentDate.date}.${currentDate.month}.${currentDate.year}`}</p>
          </div>
          <Button onClick={SignOut}><ExitIcon /></Button>
        </div>
      </div>
    </aside>
  );

}

export default SideBar