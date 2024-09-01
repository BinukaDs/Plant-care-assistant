import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import AddLog from './components/GrowthLogForm/add'
import EditLog from './components/GrowthLogForm/edit'
import DeleteLog from './components/GrowthLogForm/delete'
import { UserContext } from '@/App'
import PlantCareGuide from './components/PlantcareGuide';
import BreadCrumbNav from '@/components/BreadCrumbNav'
import { PlantDataTypes } from '@/types/Plant'
import { FetchAuthentication } from '@/services/Authentication.service'
import { FetchPlantDetails, DeletePlant } from '@/services/Plants.service'
import Cookies from 'universal-cookie'
import Layout from '../Layout'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { TrashIcon, Pencil1Icon } from '@radix-ui/react-icons'
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
  const [PlantData, setPlantData] = useState<PlantDataTypes>({})
  const navigate = useNavigate();

  //authentication middleware
  const loadAuthentication = async () => {
    try {
      const data = await FetchAuthentication(BASE, cookies.get("token"));
      if (data.id) {
        // console.log("UserId: ", data.id);
        return setUserId(data.id);
      }
      data.isLoggedin === true ? null : navigate('/signin')
      return console.log("Data:", data)
    }
    catch (error) {
      console.error(error);
    }
  }


  const loadFetchPlantDetails = async () => {
    try {
      const data = await FetchPlantDetails(BASE, plantId, UserId);
      if (data) {
        setPlantData(data)
      } else {
        console.error("Error:404")
        toast.error("Error: 404 | Oops. Couldn't find the plant!")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const loadDeletePlant = async () => {
    try {
      const response = await DeletePlant(BASE, UserId, plantId, PlantData.imageName)
      console.log('response', response)
      if (response.status == 200) {
        console.log("✅", response.message)
        navigate("/dashboard")
        toast.success(response.message)
      } else if (response.status != 200) {
        console.log("ℹ️", response.message)
        navigate("/dashboard")
        toast.success(response.message)
      }
    } catch (error) {
      navigate("/dashboard")
      return console.error(error)
    }
  }

  useEffect(() => {
    loadAuthentication();
    loadFetchPlantDetails()
  }, [UserId, plantId])


  return (
    <Layout>
      <div className='container w-full justify-center items-center my-12 gap-y-5' >
        <section className='flex flex-col w-full justify-center items-start h-full mx-5'>
          <BreadCrumbNav />

          {/* <h1>Plant ID: {plantId}</h1>
            <h1>Plant Data: {PlantData.nickname}</h1>
            <img src={PlantData.imageUrl} alt="Plant Image" />
            <button className='bg-red-500 p-2 rounded-md text-white' onClick={loadDeletePlant}>Delete</button>
            <div className='flex flex-col justify-center items-center'>
              <AddLog plantId={plantId || ""} userId={UserId} loadPlant={loadFetchPlantDetails} />
              <div className='m-5'>
                {PlantData.growthLogs?.length ? (PlantData.growthLogs?.map((log, index) => {
                  return (
                    <div key={index} className='flex  gap-2 rounded-md border p-2 w-full'>
                      <EditLog plantId={plantId} index={index} />
                      <DeleteLog userId={UserId} plantId={plantId} index={index} imageName={log.imageName} loadPlant={loadFetchPlantDetails} />
                      <img src={log.imageUrl} alt="Plant Image" width={100} />
                      <div className='flex flex-col text-left'>
                        <h1>{log.date}</h1>
                        <p>{log.notes}</p>
                        <p>Height: {log.height}</p>
                        <p>Leaf Count: {log.leafCount}</p>
                      </div>
                    </div>
                  )
                })) : (
                  <div>Add Logs...</div>
                )}
              </div>
              <div>
                <PlantCareGuide careGuide={sampleCareGuide} />
              </div>

            </div> */}
          <div className='container relative flex w-full mt-24'>
            <div className='relative bg-card rounded-xl h-screen w-full my-12'>
              <div className='flex gap-32 mx-5'>
                <div className='flex absolute justify-center items-end gap-2 -top-32 p-6'>
                  <img src={PlantData.imageUrl} alt={PlantData.imageName} width={"200px"} className='rounded-xl' />
                </div>
                <div className='ml-64 flex justify-between mt-8 w-full mr-5'>
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
                    <Button variant={"ghost"} className='text-primary'><SlHeart size={24} /></Button>
                  </div>
                </div>
              </div>
              <div className='flex justify-start mx-5 mt-4 w-1/2'>
                <div className='flex flex-col justify-start text-start mx-5'>
                  <div className='flex gap-2'>
                    <h1 className='topic text-2xl font-bold '>{PlantData.nickname}</h1>
                    <div className='flex '>
                      <EditPlantComponent plant={PlantData} />
                      <Button variant={"ghost"} className='text-destructive hover:text-destructive' onClick={loadDeletePlant}><TrashIcon /></Button>
                    </div>
                  </div>
                  <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta distinctio corporis beatae quae exercitationem. Ipsum dolores aut explicabo dolor ut repellendus repellat, voluptas velit illum?</p>
                </div>
              </div>
            </div>

            <div className='bg-card rounded-xl flex w-full'>

            </div>
          </div>

        </section>
      </div>
    </Layout>
  )
}

export default Plant