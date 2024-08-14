import React from 'react'
import { Badge } from '@/components/ui/badge'
import LocationBadges from './LocationBadges'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/App'
import { FetchPlants } from '@/services/PlantService'
import { PlantsDataTypes } from '@/types/Plant'
import { PlantDataTypes } from '@/types/Plant'
const FiltersComponent = ({ BASE, UserId }: { BASE: string, UserId: string }) => {
    const [Plants, setPlants] = useState<PlantsDataTypes>([])
    const [Locations, setLocations] = useState<string>([])

    const loadFetchPlants = async () => {
        try {
            const data = await FetchPlants(BASE, UserId.UserId);
            if (data) {
                setPlants(data)
                // console.log("fetched:", data)
            }
        } catch (error) {
            //console.error(error)

        }
    }

    const filterLocations = () => {
        Plants.map((Plant:PlantDataTypes) => {
            console.log("Plant:", Plant)
            if (Plant.location) {
                console.log("Location:",Plant.location)
                setLocations([...Locations, Plant.location])
            }
        })
        console.log("Locations:",Locations)
    }
    useEffect(() => {
        const load = async() => {
            await loadFetchPlants()
            await filterLocations()
        } 
        load()
    }, [Plants,Locations])
    return (
        <div>
            <p>Filters</p>
            <div className='flex flex-col gap-2'>
                <p>Location:</p>
                <div>
                    <LocationBadges />
                </div>
            </div>
        </div>
    )
}

export default FiltersComponent