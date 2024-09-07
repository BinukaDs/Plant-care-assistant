
import { Toaster } from "@/components/ui/sonner"
import { useState, useEffect, createContext, Suspense } from 'react'
import { FetchAuthentication } from "./services/Authentication.service"
import { PuffLoader } from 'react-spinners'
import { BrowserRouter } from 'react-router-dom'
import { FetchPlants } from '@/services/Plants.service'
import { PlantsDataTypes } from '@/types/Plant'
import { fetchLocations } from '@/services/Locations.service'
import { FetchWallpaper } from "./services/Images.service"
import './App.css'
import Base from '../endpoints.config';
import Cookies from 'universal-cookie'
import AnimatedRoutes from './components/AnimatedRoutes'
export const UserContext = createContext("");
export const PlantsContext = createContext("")
export default function App() {

  const cookies = new Cookies()
  const BaseUrl = Base.Base.replace(/\/+$/, "");
  const [BASE, setBASE] = useState("")
  const [Data, setData] = useState<PlantsDataTypes>([]);
  const [UserId, setUserId] = useState("");
  const [Plants, setPlants] = useState<PlantsDataTypes>([]);
  const [Wallpapers, setWallpapers] = useState<string>()
  const [isLoading, setisLoading] = useState(false);
  const [Locations, setLocations] = useState<(string | { location: string; environment: string })[]>([])

  //Fetch Plants
  const loadFetchPlants = async () => {
    try {
      setisLoading(true)
      const data = await FetchPlants(BASE, UserId);
      if (data) {
        setisLoading(true)
        setPlants(data)
        await setData(data)
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
      const data = await fetchLocations(BASE)
      if (data) {
        data.locations.map((Item: { location: string; environment: string }) => {
          setLocations((Location) => {
            const uniqueLocations = [...new Set([...Location, { location: Item.location, environment: Item.environment }])];
            return uniqueLocations
          })
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const loadFetchWallpapers = async() => {
    const results: string = await FetchWallpaper()
    setWallpapers(results)
  } 



  useEffect(() => {
    setBASE(BaseUrl)
    loadAuthentication();
    loadFetchWallpapers()
  }, [BASE])

  return (
    <>
      <PlantsContext.Provider value={{ setData, Data, Plants, setPlants, Locations, setLocations, loadFetchPlants, loadFetchLocations, loadAuthentication, isLoading, Wallpapers }}>
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


