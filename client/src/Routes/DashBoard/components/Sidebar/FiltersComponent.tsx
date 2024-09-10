import LocationBadge from './LocationBadge'
import { useContext, useEffect, useState } from 'react'
import { UserContext, PlantsContext } from '@/App'


const FiltersComponent = () => {
    const { Data, Plants } = useContext(PlantsContext)
    const BASE = useContext(UserContext)
    const [Locations, setLocations] = useState([])

    const filterLocation = async () => {
        Plants.map((plant) => {
            setLocations((prev) => [...new Set([...prev, plant.location])])
        })
    }

    useEffect(() => {
        filterLocation()
    }, [Plants])

    return (
        <div className='flex flex-col gap-y-3 justify-center items-start border-b w-full py-2'>
            <p className='topic  text-secondary'>Locations</p>
            <div className='flex flex-col gap-2 justify-start items-start w-full'>
                <div className='flex flex-col justify-start items-start max-h-24 overflow-y-auto w-full'>
                    {
                        Locations.map((Location) => {
                            return <LocationBadge Location={Location} key={Location} />
                        })
                    }
                </div>
            </div>
        </div>

    )
}

export default FiltersComponent