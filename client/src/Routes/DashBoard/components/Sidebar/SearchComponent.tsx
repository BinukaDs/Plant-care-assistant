import { Input } from '@/components/ui/input'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/App'
import { FetchPlants } from '@/services/PlantService'
import { PlantsContext } from '../../DashBoard'
import { Cross2Icon } from '@radix-ui/react-icons'
const SearchComponent = (UserId: string) => {
    const BASE = useContext(UserContext);
    const { setData, Plants} = useContext(PlantsContext)
    const [searchTerm, setSearchTerm] = useState<string>("")
    // const loadFetchPlants = async () => {
    //     try {
    //         const data = await FetchPlants(BASE, UserId.UserId);
    //         if (data) {
    //             setPlants(data)
    //             console.log("fetched:", data)
    //         }
    //     } catch (error) {
    //         //console.error(error)

    //     }
    // }
    useEffect(() => {
        setTimeout(async function () {
            if (searchTerm.length >= 2) {
                //search through Plants
                const filtered = Plants.filter(plant => plant.nickname && plant.nickname.toLowerCase().includes(searchTerm));
                setData(filtered)
            } else {
                setData(Plants)
            }
        }, 1000)

    }, [Plants, searchTerm, setData])

    const clearInput = () => {
        setSearchTerm("")
        setData(Plants)
    }
    return (
        <div>
            <div className='flex border p-1 rounded-md justify-center items-center w-full focus-visible:ring-1 focus-visible:ring-primary'>
                <Input type="search" placeholder="Search plants..." className="border-none shadow-none focus-visible:ring-0" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
                {searchTerm.length > 0 && <button className='mr-3' onClick={clearInput}><Cross2Icon></Cross2Icon></button>}
            </div>
        </div>
    )
}

export default SearchComponent