import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
const Plant = () => {
  const { plantId } = useParams()
  const [UserId, setUserId] = useState("")
  const [PlantData, setPlantData] = useState([])
  const navigate = useNavigate()

  //authentication middleware
  fetch("http://localhost:3001/isUserAuth", {
    headers: {
      "x-access-token": localStorage.getItem("token")
    }
  }).then((res) => {
    return res.json()
  }).then(data => {
    data.isLoggedin === false ? navigate('/dashboard') : null;
    if (data.id) {
      setUserId(data.id);
    }
  })
    .catch((error) => {
      console.error('Error:', error);
    })


  useEffect(() => {
    fetch("http://localhost:3001/getplants/plant", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plantId: plantId, userId: UserId})
    }).then((res) => {
      return res.json()
    }).then(data => {
      console.log(data);
      setPlantData(data.plant)
    })
  }, [UserId])


  return (
    <div>
      <h1>Plant ID: {plantId}</h1>
    </div>
  )
}

export default Plant