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


const DashBoard = () => {
    const navigate = useNavigate();
    const [Plants, setPlants] = useState<PlantsDataTypes>([]);
    const [UserId, setUserId] = useState("");
    const BASE = useContext(UserContext);


    //authentication middleware
    useEffect(() => {
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
        loadAuthentication();
    }, [UserId])


    //fetch plants
    // useEffect(() => {
    //     fetch(BASE + "/plants/get", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ UserId: UserId })
    //     }).then((response) => {
    //         return response.json()
    //     }).then((data) => {
    // Handle the response data
    //         console.log(data);
    //         setPlants(data.plants)
    //     }).catch((error) => {
    // Handle any errors
    //         console.error('Error fetching plants:', error);
    //     });
    // }, [UserId])

    useEffect(() => {
        const loadFetchPlants = async () => {
            try {
                const data = await FetchPlants(BASE,UserId);
                if (data) {
                    setPlants(data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        loadFetchPlants();
    }, [UserId])




    return (
        <Layout>
            <section className='flex flex-col justify-center items-center'>
                <div className='container'>
                    <AddPlant userId={UserId} />
                </div>
                <div className='grid grid-cols-3'>
                    {Plants ? Plants.map((plant) => {
                        return (
                            <div key={plant.id} className='flex flex-col bg-slate-200 rounded-md p-5 justify-center items-start m-5'>
                                <div className='flex justify-center items-end m-2'>
                                    <Menu plantId={plant.id} />
                                </div>
                                <div>
                                    <Link to={`/plant/${plant.id}`}>
                                        <img src={plant.imageUrl} alt="Plant" />
                                    </Link>
                                    <h1>{plant.nickname}</h1>
                                    <h2>{plant.location}</h2>
                                    <h3>{plant.species}</h3>
                                    <h4>{plant.environment}</h4>
                                </div>
                            </div>

                        )
                    }) : <PuffLoader />}
                </div>
            </section>
        </Layout>
    )
}

export default DashBoard