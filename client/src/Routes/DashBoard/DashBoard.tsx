import Layout from './Layout'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext, useRef } from 'react'
import { UserContext, PlantsContext } from '@/App'
import PlantCard from './components/PlantCard'
import BreadCrumbNav from '@/components/BreadCrumbNav'
import { FetchAuthentication } from '@/services/Authentication.service'
import Cookies from 'universal-cookie'
import FadeIn from '@/components/transitions/FadeIn'
import { SortComponent } from './components/Sort/Sortcomponent'
import { PlantsContextDataTypes } from '@/types/Plant'
import { Helmet } from 'react-helmet'

const DashBoard = () => {
    const navigate = useNavigate();
    const cookies = new Cookies()
    const [UserId, setUserId] = useState("");
    const { Data, loadFetchPlants, loadFetchLocations, Plants } = useContext(PlantsContext) as PlantsContextDataTypes
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
            if (Plants.length == 0) {
                loadFetchLocations();
            }
            hasRunRef.current = true;
        }
    }, [Data])


    useEffect(() => {
        loadAuthentication();
        loadFetchPlants();
    }, [UserId])


    return (

        <Layout>
           <Helmet>
            <title>DashBoard - PlantLY</title>
           </Helmet>
            <FadeIn>
                <div className=' w-full justify-center items-center m-12 gap-y-5'>
                    <section className='flex flex-col w-full justify-center items-start h-full mx-5'>
                        <BreadCrumbNav />
                        <div className='flex w-full justify-between'>
                            <div className='flex flex-col justify-center items-start'>
                                <h1 className='text-3xl topic text-start '>Dashboard</h1>
                                <p className='text-sm text-secondary'>Manage Your Plants.</p>
                            </div>
                            <div>
                                <SortComponent />
                            </div>
                        </div>
                        <div className='grid grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 w-full my-12 justify-center items-center h-full gap-12'>
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
