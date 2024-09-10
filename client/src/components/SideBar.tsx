import React from "react"
import { useEffect, useState, useContext } from "react"
import { FetchAuthentication } from "@/services/Authentication.service"
import { ExitIcon, DashboardIcon, ArchiveIcon, MixIcon, PersonIcon, DesktopIcon, GearIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon, MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons'
import { UserContext } from '@/App'
import SearchComponent from "../Routes/DashBoard/components/Sidebar/SearchComponent"
import FiltersComponent from "@/Routes/DashBoard/components/Sidebar/FiltersComponent"
import { useLocation } from "react-router-dom"
import Cookies from "universal-cookie"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { SignOut } from "@/services/Authentication.service"
import AddPlantComponent from "@/Routes/DashBoard/Plant/components/AddPlant/AddPlant"

interface DataType {
  id: string;
  username: string;
}
const SideBar = ({ visible, show }) => {
  const navigate = useNavigate()
  const cookies = new Cookies();
  const location = useLocation()
  const currentDate = {
    date: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };
  const [UserData, setUserData] = useState({ UserId: "", Username: "" })
  const [isCollapsed, setIsCollapsed] = useState(false);


  const BASE = useContext(UserContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
        show(false)
      } else {
        setIsCollapsed(false);
        show(true)
      }
    };

    // Initial check
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //authentication middleware
  useEffect(() => {
    const loadAuthentication = async () => {
      const data: DataType = await FetchAuthentication(BASE, cookies.get("token"));
      if (data.id) {
        setUserData({ UserId: data.id, Username: data.username })
        return
      }
    }
    loadAuthentication();
  }, [UserData.UserId])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    show(!visible)
  };

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
    <aside
      className={` z-30 fixed top-0 left-0 h-full bg-card overflow-hidden transition-all ${isCollapsed ? 'w-24' : 'w-[312px]'
        }`}
    >
      <div className='md:flex flex-col h-full w-full px-6 items-center'>
        <div className='w-full border-b border-gray-200 flex flex-col justify-between items-center gap-3 p-2 mt-5'>
          <div className='flex justify-center items-center w-full'>
            <div className="flex justify-start items-center w-full">
              <img
                src='../../logo.png'
                alt='plantLY image'
                width={48}
                height={48}
                className={`${isCollapsed ? "hidden" : "flex"} `}
              />
              {!isCollapsed && <h1 className='topic'>PlantLY</h1>}
            </div>
            <div className=''>
              
              <Button variant={"ghost"} onClick={toggleSidebar}>
                {isCollapsed ? <DoubleArrowRightIcon /> : <DoubleArrowLeftIcon />}
              </Button>
            </div>
          </div>
          {!isCollapsed ? <SearchComponent /> : <MagnifyingGlassIcon onClick={toggleSidebar} />}
        </div>

        <div className='w-full h-full'>
          <div className='flex flex-col gap-6 items-start'>
            <div className='w-full flex flex-col justify-center items-start mt-12 gap-y-3 border-b py-2'>
              {!isCollapsed && (
                <p className='topic text-secondary'>Navigation</p>
              )}
              <ul className='flex flex-col justify-start items-center text-start w-full'>
                {listItems.map((item, index) => (
                  <li key={index} className='flex justify-start gap-2 w-full'>
                    <button
                      onClick={() => navigate(item.href)}
                      className={`flex w-full ${isCollapsed ? "justify-center" : "justify-start"} items-center gap-3 p-2 rounded-xl transition-all hover:bg-primary-foreground ${location.pathname === item.href &&
                        'bg-primary-foreground text-primary'
                        }`}
                    >
                      {React.createElement(listItemIcons[item.icon])}
                      {!isCollapsed && item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {!isCollapsed && location.pathname === '/dashboard' && (
              <FiltersComponent />
            )}
          </div>
        </div>
        <div className='w-full my-5'>
          <AddPlantComponent isCollapsed={isCollapsed} userId={UserData.UserId} />
        </div>
        <div className={`w-full border-t border-gray-200 flex justify-between items-center p-2 mb-5 ${isCollapsed && "items-start p-0"}`}>
          {!isCollapsed && (
            <>
              <img
                src='https://via.placeholder.com/150'
                alt='User'
                className={`rounded-full ${isCollapsed ? 'w-8 h-8' : 'w-12 h-12'}`}
              />
              <div className='flex flex-col text-start'>
                <h1 className='text-sm'>{UserData.Username}</h1>
                <p className='text-sm text-gray-400'>{`${currentDate.date}.${currentDate.month}.${currentDate.year}`}</p>
              </div>
            </>
          )}
          <Button variant={"ghost"} onClick={SignOut}>
            <ExitIcon />
          </Button>
        </div>
      </div>

    </aside>
  );

}

export default SideBar