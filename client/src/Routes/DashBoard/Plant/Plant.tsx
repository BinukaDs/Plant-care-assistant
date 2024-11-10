import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import AddLog from './components/GrowthLogs/GrowthLogForm/add'
import EditLog from './components/GrowthLogs/GrowthLogForm/edit'
import DeleteLog from './components/GrowthLogs/GrowthLogForm/delete'
import FavouriteComponent from './components/Favourite/FavouriteComponent'
import { UserContext } from '@/App'
import PlantCareGuide from './components/PlantcareGuide';
import BreadCrumbNav from '@/components/BreadCrumbNav'
import { PlantDataTypes, PlantsContextDataTypes, responseDataTypes } from '@/types/Plant'
import { FetchAuthentication } from '@/services/Authentication.service'
import { FetchPlantDetails, DeletePlant } from '@/services/Plants.service'
import Cookies from 'universal-cookie'
import Layout from './Layout'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { TrashIcon, HeightIcon } from '@radix-ui/react-icons'
import { LiaLeafSolid, LiaMapPinSolid } from "react-icons/lia";
import DetailsSkeleton from '@/components/skeletons/Plant/Plant-Details'
import CareGuideSkeleton from '@/components/skeletons/Plant/Care-Guide'
import LogSkeleton from '@/components/skeletons/Plant/Log-Details'
import { Helmet } from 'react-helmet'
import { tailspin } from 'ldrs'
import EditPlantComponent from './components/EditPlant/EditPlant'
import { PlantsContext } from '@/App'
tailspin.register()
const sampleCareGuide = [
  { feature: 'Watering', details: 'Water twice a week' },
  { feature: 'Sunlight', details: 'Indirect sunlight' },
  { feature: 'Soil', details: 'Well-drained soil' },
];

const Plant = () => {
  const cookies = new Cookies()
  const [UserId, setUserId] = useState("");
  const BASE = useContext(UserContext);
  const { isLoading, setisLoading } = useContext<PlantsContextDataTypes>(PlantsContext)
  const [PlantData, setPlantData] = useState<PlantDataTypes>({
    id: '',
    imageUrl: '',
    imageName: '',
    species: '',
    location: '',
    nickname: '',
    favourite: false,
    growthLogs: [],
    environment: '',
    careGuide: '',
    userId: ''
  })
  const navigate = useNavigate();
  const { plantId } = useParams();


  //authentication middleware
  const loadAuthentication = async () => {
    if (!plantId) {
      console.error("Plant ID is undefined");
      return;
    }
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


  const loadFetchPlantDetails = async () => {
    if (!plantId) {
      console.error("Plant ID is undefined");
      return;
    }
    try {
      setisLoading(true)
      const data = await FetchPlantDetails(BASE, plantId, UserId);
      if (data) {
        setPlantData(data)
        setisLoading(false)
      } else {
        setisLoading(false)
        console.error("Error:404", data)
        toast.error("Error: 404 | Oops. Couldn't find the plant!")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const loadDeletePlant = async () => {
    if (!plantId) {
      console.error("Plant ID is undefined");
      return;
    }
    try {
      const response: responseDataTypes = await DeletePlant(BASE, UserId, plantId, PlantData.imageName)
      console.log('response', response)
      if (response.status == 200) {
        console.log("✅", response.message)
        navigate("/dashboard")
        toast.success(response.message)
      } else if (response.status != 200) {
        console.log("ℹ️", response.message)
        navigate("/dashboard")
        toast.error(response.message)
      }
    } catch (error) {
      navigate("/dashboard")
      return console.error(error)
    }
  }

  useEffect(() => {
    loadAuthentication();
    loadFetchPlantDetails()
  }, [UserId])

  if (!plantId) {
    console.error("Plant ID is undefined");
    return;
  }
  return (
    <Layout>
      <Helmet>
        <title>{PlantData.nickname} - PlantLY</title>
      </Helmet>
      <div className='w-full h-full'>
        <div className='fixed flex flex-col'>
          <div className='absolute h-full w-full backdrop-brightness-50 bg-white/25'>
            <div className='ml-5 mt-5'><BreadCrumbNav className='text-white' /></div>
          </div>
        </div>
        <section className='flex flex-col w-full h-full '>
          <div className='bg-white rounded-t-xl relative flex flex-col w-full h-full p-10 mt-48'>
            {
              isLoading ? <DetailsSkeleton /> :
                <div className='relative bg-card rounded-xl h-full p-10 w-full mb-12'>
                  <div className='flex gap-32 '>
                    <div className='flex absolute justify-center items-end gap-2 -top-44 p-6'>
                      <img src={PlantData.imageUrl} alt={PlantData.imageName} width={"200px"} className='rounded-xl' />
                    </div>
                    <div className='ml-64 flex justify-between w-full'>
                      <div className='flex flex-col gap-2'>
                        <div className='flex justify-start items-end gap-2 mt-2'>
                          <LiaLeafSolid size={24} className='text-primary' />
                          <p className='text-sm text-secondary'>{PlantData.species}</p>
                        </div>
                        <div className='flex justify-start items-end gap-2 mt-2'>
                          <LiaMapPinSolid size={24} className='text-primary' />
                          <p className='text-sm text-secondary'>{PlantData.location}</p>
                        </div>
                      </div>
                      <div>
                        <FavouriteComponent plantId={plantId} currentState={PlantData.favourite} />
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-start mx-5 w-full'>
                    <div className='flex flex-col justify-start text-start mx-5'>
                      <div className='flex gap-2'>
                        <h1 className='topic text-2xl mt-4'>{PlantData.nickname}</h1>
                        <div className='flex mt-2'>
                          <EditPlantComponent plant={PlantData} loadPlant={loadFetchPlantDetails} />
                          <Button variant={"ghost"} className='text-destructive hover:text-destructive ' onClick={loadDeletePlant}><TrashIcon /></Button>
                        </div>
                      </div>
                      <p className='text-secondary mt-2'>Indoor lilies, particularly peace lilies (Spathiphyllum), are popular houseplants known for their elegant white flowers and lush green leaves. These plants thrive in low to moderate light conditions, making them ideal for indoor environments. They prefer consistently moist soil but should not be waterlogged. Peace lilies also improve air quality by filtering toxins like formaldehyde and benzene. They are relatively low-maintenance, requiring minimal care beyond regular watering and occasional fertilizing.</p>
                    </div>
                  </div>
                </div>
            }


            <div className='flex flex-row h-full  gap-6'>
              <div className='bg-card rounded-xl basis-2/3  flex flex-col w-full h-full p-10 gap-4'>
                <div className='flex w-full items-start justify-between'>
                  <h1 className='topic'>Growth Logs</h1>
                  <AddLog plantId={plantId} userId={UserId} loadPlant={loadFetchPlantDetails} />
                </div>
                {
                  isLoading ? <LogSkeleton /> :
                    PlantData.growthLogs?.length > 0 ? (PlantData.growthLogs?.sort((a, b) => (b.date >= a.date) ? 1 : -1).map((log, index) => {
                      return (
                        <div className='bg-accent flex gap-4 p-4 px-6 rounded-xl w-full h-full' key={index}>
                          <div className='flex w-full justify-between items-center gap-4'>
                            <div>
                              <img src={log.imageUrl} alt={log.date} className='rounded-xl' width={220} height={120} />
                            </div>
                            <div className='flex flex-col w-full h-full justify-between items-start'>
                              <div className='flex w-full justify-between items-start'>
                                <div className='flex flex-col gap-4 justify-start items-start'>
                                  <h1 className='topic'>{log.date}</h1>
                                  <p className='text-secondary text-start'>{log.notes}</p>
                                </div>
                                <div className='flex justify-start gap-2 items-center'>
                                  <EditLog plantId={plantId} index={index} loadPlant={loadFetchPlantDetails} />
                                  <DeleteLog plantId={plantId} index={index} imageName={log.imageUrl} userId={UserId} loadPlant={loadFetchPlantDetails} />
                                </div>
                              </div>
                              <div className='flex justify-start'>
                                <div className='flex flex-col gap-1 justify-start items-start'>
                                  <div className='flex gap-2'><HeightIcon /><p>{log.height} Cm</p></div>
                                  <div className='flex gap-2'><LiaLeafSolid /><p>{log.leafCount}</p></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })) : (
                      <div className='text-secondary text-sm'>No Logs Added. Start by Adding new Logs!</div>
                    )
                }
                <div className='flex flex-col gap-2'>
                  <div>

                  </div>
                </div>
              </div>
              <div className='bg-card rounded-xl flex flex-col w-full basis-1/3 h-full p-10'>
                <div className='flex w-full items-start justify-between mb-3'>
                  <h1 className='topic'>Plant Care Guide</h1>
                </div>
                
                {isLoading ?  <CareGuideSkeleton /> : <PlantCareGuide careGuide={sampleCareGuide} />}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Plant