import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import AddLog from './components/GrowthLogForm/add'
import EditLog from './components/GrowthLogForm/edit'
import DeleteLog from './components/GrowthLogForm/delete'
import { UserContext } from '@/App'
import PlantCareGuide from './components/PlantcareGuide';
import { PlantDataTypes } from '@/types/Plant'
import { FetchAuthentication } from '@/services/Authentication'
import { FetchPlantDetails, DeletePlant } from '@/services/PlantService'
import Layout from '../Layout'
import { toast } from 'sonner'

const sampleCareGuide = [
  { feature: 'Watering', details: 'Water twice a week' },
  { feature: 'Sunlight', details: 'Indirect sunlight' },
  { feature: 'Soil', details: 'Well-drained soil' },
];

const Plant = () => {
  const { plantId } = useParams();
  const [UserId, setUserId] = useState("");
  const BASE = useContext(UserContext);
  const [PlantData, setPlantData] = useState<PlantDataTypes>({})
  const navigate = useNavigate();

  //authentication middleware
  const loadAuthentication = async () => {
    try {
      const data = await FetchAuthentication(BASE);
      if (data.id) {
        console.log("UserId: ", data.id);
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
      if(response.status == "200") {
        console.log("✅ Plant deleted successfully! ")
        navigate("/dashboard")
        toast.success("✅ Plant deleted successfully! ")
      } else if(response.status == "400") {
        console.log("ℹ️ Error deleting plant!")
        navigate("/dashboard")
        toast.success("ℹ️ Error deleting plant!")
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
      <div>
        <h1>Plant ID: {plantId}</h1>
        <h1>Plant Data: {PlantData.nickname}</h1>
        <img src={PlantData.imageUrl} alt="Plant Image" />
        <button className='bg-red-500 p-2 rounded-md text-white' onClick={loadDeletePlant}>Delete</button>
        <div className='flex flex-col justify-center items-center'>
          <AddLog plantId={plantId || ""} userId={UserId} loadPlant={loadFetchPlantDetails}/>
          <div className='m-5'>
            {PlantData.growthLogs?.length ? (PlantData.growthLogs?.map((log, index) => {
              return (
                <div key={index} className='flex  gap-2 rounded-md border p-2 w-full'>
                  <EditLog plantId={plantId} index={index} />
                  <DeleteLog userId={UserId} plantId={plantId} index={index} imageName={log.imageName} loadPlant={loadFetchPlantDetails}/>
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

        </div>
      </div>
    </Layout>
  )
}

export default Plant