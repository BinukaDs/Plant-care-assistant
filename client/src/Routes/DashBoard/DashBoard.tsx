
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import AddPlant from './components/AddPlant/AddPlant'
import Menu from './components/Menu'
import { UserContext } from '@/App'




const DashBoard = () => {
    const navigate = useNavigate()
    const [Plants, setPlants] = useState([])
    const [UserId, setUserId] = useState("")
    const BASE = useContext(UserContext);


    //authentication middleware
    fetch(BASE + "/isUserAuth", {
        headers: {
            "x-access-token": localStorage.getItem("token") || ""
        }
    }).then((res) => {
        return res.json()
    }).then(data => {
        data.isLoggedin === true ? null : navigate('/signin')
        if (data.id) {
            setUserId(data.id)
            console.log("auth Id: ", UserId)
        }
    })
        .catch((error) => {
            console.error('Error:', error);
        })


    //fetch plants
    useEffect(() => {
        fetch(BASE + "/plants/get", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ UserId: UserId })
        }).then((response) => {
            return response.json()
        }).then((data) => {
            // Handle the response data
            console.log(data);
            setPlants(data.plants)
        }).catch((error) => {
            // Handle any errors
            console.error('Error fetching plants:', error);
        });
    }, [UserId])




    return (
        <section className='flex flex-col justify-center items-center'>
            <div className='container'>
                <AddPlant userId={UserId} />
            </div>
            <div className='grid grid-cols-3'>
                {Plants.map((plant) => {
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
                })}
            </div>
        </section>
    )
}

export default DashBoard