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


const DashBoard = () => {
    const navigate = useNavigate();
    const [Plants, setPlants] = useState<PlantsDataTypes>([]);
    const [UserId, setUserId] = useState("");
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
            const data = await FetchPlants(BASE, UserId);
            if (data) {
                setPlants(data)
            }
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        loadAuthentication();
        loadFetchPlants();
    }, [UserId])




    return (
        <Layout>
            <section className='flex flex-col justify-center items-center'>
                <div className='container'>
                    <AddPlantComponent userId={UserId} loadPlants={loadFetchPlants}/>
                </div>
                <div className='grid grid-cols-3'>
                    {Plants.length > 0 ? Plants.map((plant) => {
                        return (
                            <div key={plant.id} className='flex flex-col bg-slate-200 rounded-md p-5 justify-center items-start m-5'>
                               <a href={`/plant/${plant.id}`}>
                               <img src={`${plant.imageUrl}`} alt="" />
                               <p>{plant.nickname}</p></a>     
                            </div>

                        )
                    }) : <PuffLoader />}
                </div>
            </section>
        </Layout>
    )
}

export default DashBoard