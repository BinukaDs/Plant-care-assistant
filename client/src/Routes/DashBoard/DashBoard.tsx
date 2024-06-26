
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AddPlant from './components/AddPlant'



const DashBoard = () => {
    const navigate = useNavigate()

    const [Plants, setPlants] = useState([])
    const [Id, setId] = useState('')


    useEffect(() => {

        fetch("http://localhost:3001/isUserAuth/userdata", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((res) => {
            return res.json()
        }).then(data => { setId(data.id); })
            .catch((error) => {
                console.error('Error:', error);
            })
    })




    //authentication middleware
    fetch("http://localhost:3001/isUserAuth", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }).then((res) => {
        return res.json()
    }).then(data => data.isLoggedin === true ? navigate('/dashboard') : navigate('/signin'))
        .catch((error) => {
            console.error('Error:', error);
        })


    //fetch plants
    useEffect(() => {
        fetch("http://localhost:3001/getplants", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: Id })
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
    }, [Id])




    return (
        <section className='flex flex-col justify-center items-center'>
            <div className='container'>
                <AddPlant />
            </div>
            <div className='grid grid-cols-3'>
                {Plants.map((plant) => {
                    return (
                        <Link to={`/plant/${plant.id}`} key={plant.id}>
                            <div className='flex flex-col bg-slate-200 rounded-md p-5 justify-center items-start m-5'>
                                <h1>{plant.nickname}</h1>
                                <h2>{plant.location}</h2>
                                <h3>{plant.species}</h3>
                                <h4>{plant.environment}</h4>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default DashBoard