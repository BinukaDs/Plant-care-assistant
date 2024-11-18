
import { Toaster } from "@/components/ui/sonner"
import { useState, useEffect, createContext, Suspense } from 'react'
import { FetchAuthentication } from "./services/Authentication.service"
import { PuffLoader } from 'react-spinners'
import { BrowserRouter } from 'react-router-dom'
import { FetchPlants } from '@/services/Plants.service'
import { LocationDataTypes, PlantsContextDataTypes, PlantsDataTypes } from '@/types/Plant'
import { fetchLocations } from '@/services/Locations.service'
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
  const [isLoading, setisLoading] = useState(false);

  const [Locations, setLocations] = useState<LocationDataTypes[]>([])

  //Fetch Plants
  const loadFetchPlants = async (): Promise<PlantsDataTypes | void> => {
    setisLoading(true)
    try {
      const data = await FetchPlants(BASE, UserId);
      if (data) {
        setPlants(data)
        setData(data)
        setisLoading(false)
      } else return setisLoading(false)
    } catch (error) {
      console.error(error)
      setisLoading(false)
    }
  }

  //fetch Authentication middleware
  const loadAuthentication = async () => {
    try {
      setisLoading(true)
      const data = await FetchAuthentication(BASE, cookies.get("token"));
      if (data.id) {
        if (data.isLoggedin === true) {
          setisLoading(false)
          return setUserId(data.id);
        }
      }
    } catch (error) {
      setisLoading(false)
      console.error(error);
    }
  }

  //Fetch Locations
  const loadFetchLocations = async () => {
    try {
      setisLoading(true)
      const data = await fetchLocations(BASE, UserId);
      if (data) {
        setLocations(data)
        setisLoading(false)
      }
      
    } catch (error) {
      console.error(error)
      setisLoading(false)
    }
  }

  


  useEffect(() => {
    setBASE(BaseUrl)
    loadAuthentication();
    
  }, [BASE])

  return (
    <>

      <PlantsContext.Provider value={{ UserId, setData, Data, Plants, setPlants, Locations, setLocations, loadFetchPlants, loadFetchLocations, loadAuthentication, setisLoading, isLoading }}>
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


