import React from 'react'
import { Input } from '@/components/ui/input'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/App'
import { FetchPlants } from '@/services/PlantService'
import { PlantsContext } from '../../DashBoard'
const SearchComponent = (UserId: string) => {
    const BASE = useContext(UserContext);
    const { Plants, setPlants } = useContext(PlantsContext)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const loadFetchPlants = async () => {
        try {
            const data = await FetchPlants(BASE, UserId);
            if (data) {
                setPlants(data)
                console.log("fetched:", data)
            }
        } catch (error) {
            console.error(error)

        }
    }
    useEffect(() => {
        if (searchTerm.length >= 2) {
            setTimeout(async function () {
                //loadFetchPlants()
                console.log(searchTerm)
                //search through Plants
                const filtered = Plants.filter(entry => entry.nickname && entry.nickname.toLowerCase().includes(searchTerm));
                setPlants(filtered)
                console.log(filtered)
            }, 2000)
        } else {
            setTimeout(async function () {
                await loadFetchPlants()
            }, 1000)
        }

    }, [searchTerm])
    return (
        <div>
            <Input type="search" placeholder="Search plants... 🔍" className="w-full" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
    )
}

export default SearchComponent