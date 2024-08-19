import LocationBadge from './LocationBadge'
import { useContext, useEffect, useState } from 'react'
import { PlantsContext } from '../../DashBoard'
import { fetchLocations } from '@/services/LocationsService'
import { UserContext } from '@/App'


const FiltersComponent = () => {
    const { Data, Locations } = useContext(PlantsContext)
    const BASE = useContext(UserContext)



    return (

        <div className='flex flex-col justify-center items-start'>
            <p className='topic text-lg text-secondary'>Filters</p>
            <div className='flex flex-col gap-2 justify-start items-start'>
                <p>Location:</p>
                <div className='grid grid-cols-3'>
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