import Layout from './Layout'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import AddPlant from './components/AddPlant/AddPlant'
import Menu from './components/Menu'
import { UserContext } from '@/App'
import { PuffLoader } from 'react-spinners'
import PlantCard from './components/PlantCard'
import { FetchPlants } from '@/services/PlantService'
import { FetchAuthentication } from '@/services/Authentication'
import { PlantsDataTypes } from '@/types/Plant'
import AddPlantComponent from './components/AddPlant/AddPlant'
import Navbar from '@/components/Navbar'

const DashBoard = () => {
    const navigate = useNavigate();
    const [Plants, setPlants] = useState<PlantsDataTypes>([]);
    const [UserId, setUserId] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const BASE = useContext(UserContext);

    //fetch Authentication middleware
    const loadAuthentication = async () => {
        try {
            const data = await FetchAuthentication(BASE);
            if (data.id) {
                return setUserId(data.id);
            }
            data.isLoggedin === true ? null : navigate('/signin')
        }
        catch (error) {
            console.error(error);
        }
    }
    
    //fetch Plants
    const loadFetchPlants = async () => {
        try {
            setisLoading(true)
            const data = await FetchPlants(BASE, UserId);
            if (data) {
                setPlants(data)
                setisLoading(true)
            }
        } catch (error) {
            console.error(error)
            setisLoading(true)
        }
    }


    useEffect(() => {
        loadAuthentication();
        loadFetchPlants();
    }, [UserId])




    return (
        <Layout>
            
            <section className='flex flex-col w-full'>
                <div className='container'>
                    <AddPlantComponent userId={UserId} loadPlants={loadFetchPlants}/>
                </div>
                <div className='grid grid-cols-3 w-full'>
                    {Plants.length > 0 ? Plants.map((plant) => {
                        return (
                               <PlantCard key={plant.id} plant={plant}/>
                        )
                    }) : <p>No Plants...</p>}
                </div>
            </section>
        </Layout>
    )
}

export default DashBoard