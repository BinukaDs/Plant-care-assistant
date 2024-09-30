import { FetchAuthentication } from '@/services/Authentication.service'
import { UserContext } from '@/App'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Layout from './Layout'
import FadeIn from '@/components/transitions/FadeIn'
import BreadCrumbNav from '@/components/BreadCrumbNav'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Account from './Account/Account'
import Locations from './Locations/Locations'
import Species from './Species/Species'
const Settings = () => {
    const [UserId, setUserId] = useState("");
    const BASE = useContext(UserContext);
    const cookies = new Cookies();
    const navigate = useNavigate();
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

    useEffect(() => {
        loadAuthentication();
    }, [UserId])
    return (
        <Layout>
            <FadeIn>
                <div className=' w-full justify-center items-center m-12 gap-y-5'>
                    <section className='flex flex-col w-full justify-center items-start h-full mx-5'>
                        <BreadCrumbNav />
                        <div className='flex w-full justify-between'>
                            <div className='flex flex-col justify-center items-start'>
                                <h1 className='text-3xl topic text-start '>Settings</h1>
                                <p className='text-sm text-secondary'>Customize your experience.</p>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className='w-full my-12 justify-start items-start h-full'>
                            <Tabs defaultValue="locations" className="w-full flex flex-col items-start">
                                <TabsList>
                                    <TabsTrigger value="locations">Locations</TabsTrigger>
                                    <TabsTrigger value="species">Species</TabsTrigger>
                                    <TabsTrigger value="account" disabled>Account</TabsTrigger>
                                </TabsList>
                                <TabsContent value="locations"><Locations /></TabsContent>
                                <TabsContent value="species"><Species /></TabsContent>
                                <TabsContent value="account"><Account /></TabsContent>
                            </Tabs>
                        </div>
                    </section>
                </div>
            </FadeIn>
        </Layout>
    )
}

export default Settings