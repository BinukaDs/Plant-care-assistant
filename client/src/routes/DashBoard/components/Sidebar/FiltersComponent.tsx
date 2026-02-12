import LocationBadge from './LocationBadge'
import { useContext, useEffect, useState } from 'react'
import { PlantsContext } from '@/App'
import { PlantsContextDataTypes } from '@/types/Plant'


const FiltersComponent = () => {
    const { Plants } = useContext(PlantsContext) as PlantsContextDataTypes
    const [Locations, setLocations] = useState<string[]>([])

    const filterLocation = async () => {
        Plants.map((plant) => {
            setLocations((prev) => [...new Set<string>([...prev, plant.location])])
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