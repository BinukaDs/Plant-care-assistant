import Layout from './Layout'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext, useRef } from 'react'
import { UserContext, PlantsContext } from '@/App'
import PlantCard from './components/PlantCard'
import BreadCrumbNav from '@/components/BreadCrumbNav'
import { FetchAuthentication } from '@/services/Authentication.service'
import Cookies from 'universal-cookie'
import FadeIn from '@/components/transitions/FadeIn'


const DashBoard = () => {
    const navigate = useNavigate();
    const cookies = new Cookies()
    const [UserId, setUserId] = useState("");
    const { Data, loadFetchPlants, loadFetchLocations } = useContext(PlantsContext)
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


    //make sure the Locations Fetch only once.
    const hasRunRef = useRef(false);
    useEffect(() => {
        if (!hasRunRef.current) {
            loadFetchLocations();
            hasRunRef.current = true;
        }
    }, [Data])


    useEffect(() => {
        loadAuthentication();
        loadFetchPlants();
    }, [UserId])


    return (

        <Layout>
            <FadeIn>
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
            </FadeIn>
        </Layout>

    )
}

export default DashBoard
