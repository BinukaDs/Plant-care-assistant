import Layout from './Layout'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext, createContext } from 'react'
import { UserContext } from '@/App'
import PlantCard from './components/PlantCard'
import { FetchPlants } from '@/services/PlantService'
import { FetchAuthentication } from '@/services/AuthenticationService'
import { PlantsDataTypes } from '@/types/Plant'
import AddPlantComponent from './components/AddPlant/AddPlant'
import Cookies from 'universal-cookie'

export const PlantsContext = createContext("")
const DashBoard = () => {
    const navigate = useNavigate();
    const cookies = new Cookies()
    const [Data, setData] = useState<PlantsDataTypes>([]);
    const [Plants, setPlants] = useState<PlantsDataTypes>([]);
    const [UserId, setUserId] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const BASE = useContext(UserContext);

    //fetch Authentication middleware
    const loadAuthentication = async () => {
        try {
            const data = await FetchAuthentication(BASE, cookies.get("token"));
            if (data.id) {
                return setUserId(data.id);
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
            if (data.length > 0) {
                console.log("Useeffect")
                setPlants(data)
                await setData(data)
                setisLoading(true)
            }
        } catch (error) {
            console.error(error)
            setisLoading(true)
        }
    }
    useEffect(() => {
        const load = async () => {
            await loadAuthentication();
            loadFetchPlants();
        }
        load()
    }, [UserId])



    return (
        <PlantsContext.Provider value={{ setData, Data, Plants, setPlants }}>
            <Layout>
                <section className='flex flex-col w-full justify-center items-center h-full '>
                    <div className='container w-full justify-center items-center my-12'>
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full my-auto justify-center items-center h-full'>
                            {Data.length > 0 ? Data.map((plant) => {
                                return (
                                    <PlantCard key={plant.id} plant={plant} />
                                )
                            }) : <p>No Plants...</p>}
                        </div>
                        <div className='m-5 w-full flex fixed bottom-12 right-2 justify-end '>
                            <div className=''> <AddPlantComponent userId={UserId} loadPlants={loadFetchPlants} /></div>
                        </div>
                    </div>
                </section>
            </Layout>
        </PlantsContext.Provider>
    )
}

export default DashBoard
