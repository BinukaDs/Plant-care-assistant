
import { Toaster } from "@/components/ui/sonner"
import { useState, useEffect, createContext, Suspense } from 'react'
import { FetchAuthentication } from "./services/Authentication.service"
import { PuffLoader } from 'react-spinners'
import { BrowserRouter } from 'react-router-dom'
import { FetchPlants } from '@/services/Plants.service'
import { LocationDataTypes, PlantsContextDataTypes, PlantsDataTypes, WallpaperDataTypes } from '@/types/Plant'
import { fetchLocations } from '@/services/Locations.service'
import { FetchWallpaper } from "./services/Images.service"
import './App.css'
import Base from '../endpoints.config';
import Cookies from 'universal-cookie'
import AnimatedRoutes from './components/AnimatedRoutes'
export const UserContext = createContext("");
export const PlantsContext = createContext<PlantsContextDataTypes | undefined>(undefined);

export default function App() {

  const cookies = new Cookies()
  const BaseUrl = Base.Base.replace(/\/+$/, "");
  const [BASE, setBASE] = useState("")
  const [Data, setData] = useState<PlantsDataTypes>([]);
  const [UserId, setUserId] = useState("");
  const [Plants, setPlants] = useState<PlantsDataTypes>([]);
  const [Wallpapers, setWallpapers] = useState<WallpaperDataTypes[]>([])
  const [isLoading, setisLoading] = useState(false);

  const [Locations, setLocations] = useState<LocationDataTypes[]>([])

  //Fetch Plants
  const loadFetchPlants = async () => {
    try {
      setisLoading(true)
      const data = await FetchPlants(BASE, UserId);
      if (data) {
        setisLoading(true)
        setPlants(data)
        setData(data)
        setisLoading(false)
      } else return setisLoading(false)
    } catch (error) {
      console.error(error)
      setisLoading(true)
    }
  }

  //fetch Authentication middleware
  const loadAuthentication = async () => {
    try {
      const data = await FetchAuthentication(BASE, cookies.get("token"));
      if (data.id) {
        if (data.isLoggedin === true) {
          return setUserId(data.id);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Fetch Locations
  const loadFetchLocations = async () => {
    try {
      const data = await fetchLocations(BASE, UserId);
      if (data) {
        setLocations(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const loadFetchWallpapers = async () => {
    const results = await FetchWallpaper()
    setWallpapers(results)
  }



  useEffect(() => {
    setBASE(BaseUrl)
    loadAuthentication();
    loadFetchWallpapers()
  }, [BASE])

  return (
    <>
     
        <PlantsContext.Provider value={{ UserId, setData, Data, Plants, setPlants, Locations, setLocations, loadFetchPlants, loadFetchLocations, loadAuthentication, isLoading, Wallpapers: Wallpapers! }}>
          <UserContext.Provider value={BASE}>
            <Toaster />
            <BrowserRouter>
              <Suspense fallback={<div><PuffLoader /></div>}>
                <AnimatedRoutes />
              </Suspense>
            </BrowserRouter>
          </UserContext.Provider>
        </PlantsContext.Provider>
     

    </>
  )
}


