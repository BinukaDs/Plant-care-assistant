import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import AddLog from './components/GrowthLogForm/add'
import EditLog from './components/GrowthLogForm/edit'
import DeleteLog from './components/GrowthLogForm/delete'
import { UserContext } from '@/App'
const Plant = () => {
  const { plantId } = useParams()
  const [UserId, setUserId] = useState("")
  const BASE = useContext(UserContext);
  interface PlantDataType {
    nickname?: string;
    imageUrl?: string;
    imageName?: string;
    growthLogs?: { imageUrl: string; date: string; notes: string; height: number; leafCount: number; }[];
  }

  const [PlantData, setPlantData] = useState<PlantDataType>({})
  const navigate = useNavigate()

  //authentication middleware
  fetch(BASE + "/isUserAuth", {
    headers: {
      "x-access-token": localStorage.getItem("token") || ""
    }
  }).then((res) => {
    return res.json()
  }).then(data => {
    data.isLoggedin === true ? null : navigate('/signin');
    if (data.id) {
      setUserId(data.id);
    }
  })
    .catch((error) => {
      console.error('Error:', error);
    })

  //fetch plant details
  useEffect(() => {
    fetch(BASE + "/plants/get/plant", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plantId: plantId, userId: UserId })
    }).then((res) => {
      return res.json()
    }).then(data => {
      console.log(data);
      setPlantData(data.plant)
    })
  }, [UserId])

  function deletePlant() {
    fetch(BASE + "/plants/delete", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: UserId, plantId: plantId, imageName: PlantData.imageName })
    }).then(res => {
      if (res.ok) {
        console.log("Plant Deleted!")
        navigate('/dashboard')
      }
      return res.json();
    }).then(data => {
      console.log(data)

    })
  }


  return (
    <div>
      <h1>Plant ID: {plantId}</h1>
      <h1>Plant Data: {PlantData.nickname}</h1>
      <img src={PlantData.imageUrl} alt="Plant Image" />
      <button className='bg-red-500 p-2 rounded-md text-white' onClick={deletePlant}>Delete</button>
      <div className='flex flex-col justify-center items-center'>
        <AddLog plantId={plantId || ""} />
        <div className='m-5'>
          {PlantData.growthLogs?.length  ? (PlantData.growthLogs?.map((log, index) => {
            return (
              <div key={index} className='flex  gap-2 rounded-md border p-2 w-full'>
                <EditLog plantId={plantId} index={index} />
                <DeleteLog userId={UserId} plantId={plantId} index={index} imageName={PlantData.imageName} />
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


      </div>
    </div>
  )
}

export default Plant