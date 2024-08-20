import Layout from './Layout'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext, createContext } from 'react'
import { UserContext } from '@/App'
import PlantCard from './components/PlantCard'
import BreadCrumbNav from '@/components/BreadCrumbNav'
import { FetchPlants } from '@/services/PlantService'
import { FetchAuthentication } from '@/services/AuthenticationService'
import { PlantsDataTypes } from '@/types/Plant'
import Cookies from 'universal-cookie'
import { fetchLocations } from '@/services/LocationsService'
export const PlantsContext = createContext("")
const DashBoard = () => {
    const navigate = useNavigate();
    const cookies = new Cookies()
    const [Data, setData] = useState<PlantsDataTypes>([]);
    const [Plants, setPlants] = useState<PlantsDataTypes>([]);
    const [UserId, setUserId] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [Locations, setLocations] = useState<string[]>([])
    const BASE = useContext(UserContext);

    //fetch Authentication middleware
    const loadAuthentication = async () => {
        try {
            const data = await FetchAuthentication(BASE, cookies.get("token"));
            if (data.id) {
                if (data.isLoggedin === true) {
                    return setUserId(data.id);
                }
            }
            data.isLoggedin === true ? null : navigate('/signin')
        } catch (error) {
            console.error(error);
        }
    }



    //fetch Plants
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

    const loadFetchLocations = async () => {
        try {
            const data = await fetchLocations(BASE)
            if (data) {
                data.map((Location) => {
                    setLocations((Locations) => {
                        const uniqueLocations = [...new Set([...Locations, Location.location])];
                        return uniqueLocations
                    })
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        loadFetchLocations()
    }, [Data])

    useEffect(() => {
        const load = async () => {
            await loadAuthentication();
            await loadFetchPlants();

        }
        load()
    }, [UserId])



    return (
        <PlantsContext.Provider value={{ setData, Data, Plants, setPlants, Locations }}>
            <Layout>
                <div className='container w-full justify-center items-center my-12 gap-y-5'>
                    <section className='flex flex-col w-full justify-center items-start h-full mx-5'>
                        <BreadCrumbNav />
                        <h1 className='text-3xl topic text-start font-bold'>DashBoard</h1>
                        <p className='text-sm text-secondary'>Manage Your Plants.</p>
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full my-12 justify-center items-center h-full'>
                            {Data.length > 0 ? Data.map((plant) => {
                                return (
                                    <PlantCard key={plant.id} plant={plant} />
                                )
                            }) : <p>No Plants...</p>}
                        </div>

                    </section>
                </div>
            </Layout>
        </PlantsContext.Provider>
    )
}

export default DashBoard
