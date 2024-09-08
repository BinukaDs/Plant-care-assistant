import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import AddLog from './components/GrowthLogs/GrowthLogForm/add'
import EditLog from './components/GrowthLogs/GrowthLogForm/edit'
import DeleteLog from './components/GrowthLogs/GrowthLogForm/delete'
import { PlantsContext, UserContext } from '@/App'
import PlantCareGuide from './components/PlantcareGuide';
import BreadCrumbNav from '@/components/BreadCrumbNav'
import { PlantDataTypes, responseDataTypes } from '@/types/Plant'
import { FetchAuthentication } from '@/services/Authentication.service'
import { FetchPlantDetails, DeletePlant } from '@/services/Plants.service'
import Cookies from 'universal-cookie'
import Layout from '../Layout'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { TrashIcon, HeightIcon } from '@radix-ui/react-icons'
import { SlLocationPin, SlHeart } from "react-icons/sl";
import { FaLeaf } from "react-icons/fa";
import EditPlantComponent from '../components/EditPlant/EditPlant'

const sampleCareGuide = [
  { feature: 'Watering', details: 'Water twice a week' },
  { feature: 'Sunlight', details: 'Indirect sunlight' },
  { feature: 'Soil', details: 'Well-drained soil' },
];

const Plant = () => {
  const cookies = new Cookies()
  const { plantId } = useParams();
  const [UserId, setUserId] = useState("");
  const BASE = useContext(UserContext);
  const { Wallpapers } = useContext(PlantsContext)
  const [PlantData, setPlantData] = useState<PlantDataTypes>({})
  const navigate = useNavigate();

  //authentication middleware
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


  const loadFetchPlantDetails = async () => {
    try {
      const data = await FetchPlantDetails(BASE, plantId, UserId);
      if (data) {
        setPlantData(data)
      } else {
        console.error("Error:404", data)
        toast.error("Error: 404 | Oops. Couldn't find the plant!")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const loadDeletePlant = async () => {
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


  return (
    <Layout>
      <div className='w-full h-full'>
        <div className='fixed flex flex-col'>
          <div className='absolute h-full w-full backdrop-brightness-50 bg-white/25'>
            <div className='ml-5 mt-5'><BreadCrumbNav className='text-white' /></div>
          </div>
          {Wallpapers && <img src={Wallpapers[0].urls.full} alt={Wallpapers[0].alt_description} className='' />}
        </div>
        <section className='flex flex-col w-full h-full '>
          <div className=' bg-white rounded-t-xl relative flex flex-col w-full h-full p-10 mt-48'>
            <div className='relative bg-card rounded-xl h-full p-10 w-full mb-12'>
              <div className='flex gap-32 '>
                <div className='flex absolute justify-center items-end gap-2 -top-44 p-6'>
                  <img src={PlantData.imageUrl} alt={PlantData.imageName} width={"200px"} className='rounded-xl' />
                </div>
                <div className='ml-64 flex justify-between w-full'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex justify-start items-end gap-2 mt-2'>
                      <FaLeaf size={24} className='text-primary' />
                      <p className='text-sm text-secondary'>{PlantData.species}</p>
                    </div>
                    <div className='flex justify-start items-end gap-2 mt-2'>
                      <SlLocationPin size={24} className='text-primary' />
                      <p className='text-sm text-secondary'>{PlantData.location}</p>
                    </div>
                  </div>
                  <div>
                    <Button variant={"ghost"} className='text-destructive'><SlHeart size={24} /></Button>
                  </div>
                </div>
              </div>
              <div className='flex justify-start mx-5 mt-4 w-full'>
                <div className='flex flex-col justify-start text-start mx-5'>
                  <div className='flex gap-2'>
                    <h1 className='topic text-2xl font-bold '>{PlantData.nickname}</h1>
                    <div className='flex '>
                      <EditPlantComponent plant={PlantData} loadPlant={loadFetchPlantDetails} />
                      <Button variant={"ghost"} className='text-destructive hover:text-destructive' onClick={loadDeletePlant}><TrashIcon /></Button>
                    </div>
                  </div>
                  <p className='text-secondary mt-2'>Indoor lilies, particularly peace lilies (Spathiphyllum), are popular houseplants known for their elegant white flowers and lush green leaves. These plants thrive in low to moderate light conditions, making them ideal for indoor environments. They prefer consistently moist soil but should not be waterlogged. Peace lilies also improve air quality by filtering toxins like formaldehyde and benzene. They are relatively low-maintenance, requiring minimal care beyond regular watering and occasional fertilizing.</p>
                </div>
              </div>
            </div>

            <div className='flex flex-row h-full  gap-6'>
              <div className='bg-card rounded-xl basis-2/3  flex flex-col w-full h-full p-10 gap-4'>
                <div className='flex w-full items-start justify-between'>
                  <h1 className='topic font-bold'>Growth Logs</h1>
                  <AddLog plantId={plantId} userId={UserId} loadPlant={loadFetchPlantDetails} />
                </div>
                {PlantData.growthLogs?.length ? (PlantData.growthLogs?.map((log, index) => {
                  return (
                    <div className='bg-accent flex gap-4 p-6 rounded-xl w-full h-full' key={index}>
                      <div className='flex w-full justify-between items-center gap-4'>
                        <div>
                          <img src={log.imageUrl} alt={log.date} className='rounded-xl' width={200} height={100} />
                        </div>
                        <div className='flex flex-col w-full h-full justify-between items-center'>
                          <div className='flex w-full justify-between items-center'>
                            <div className='flex flex-col justify-start items-start'>
                              <h1 className='topic font-bold'>{log.date}</h1>
                            </div>
                            <EditLog plantId={plantId} index={index} />
                          </div>
                          <div className=''>
                            <p className='text-secondary text-start'>{log.notes}</p>
                            <div className='flex flex-col justify-between items-start'>
                              <div className='flex gap-2'><HeightIcon /><p>{log.height} Cm</p></div>
                              <div className='flex gap-2'><HeightIcon /><p>{log.leafCount}</p></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })) : (
                  <div>No Logs...</div>
                )
                }
                <div className='flex flex-col gap-2'>
                  <div>

                  </div>
                </div>
              </div>
              <div className='bg-card rounded-xl flex flex-col w-full basis-1/3 h-full p-10'>
                <div className='flex w-full items-start justify-between'>
                  <h1 className='topic font-bold'>Plant Care Guide</h1>

                </div>
                <PlantCareGuide careGuide={sampleCareGuide} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Plant