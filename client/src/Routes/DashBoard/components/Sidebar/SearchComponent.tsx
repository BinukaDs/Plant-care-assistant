import { Input } from '@/components/ui/input'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PlantsContext } from '@/App'
import { Cross2Icon } from '@radix-ui/react-icons'
import { PlantDataTypes } from '@/types/Plant'
import { useParams } from 'react-router-dom'
import { GoSearch } from "react-icons/go";


const SearchComponent = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { setData, Plants } = useContext(PlantsContext)
    const [previewCards, setpreviewCards] = useState<PlantDataTypes[]>()
    const [searchTerm, setSearchTerm] = useState<string>("")
    const { plantId } = useParams();


    useEffect(() => {
        setTimeout(async function () {
            if (searchTerm.length >= 2) {
                //search through Plants
                let filtered = Plants.filter((plant: PlantDataTypes) => plant.nickname && plant.nickname.toLowerCase().includes(searchTerm.toLowerCase()));
                if (location.pathname === "/dashboard") {
                    return setData(filtered)
                } else {
                    filtered = filtered.map((plant: PlantDataTypes) => {
                        if (plant.id !== plantId) return plant
                        else return []
                    })
                    setpreviewCards(filtered)
                }
            } else {
                if (location.pathname === "/dashboard") {
                    return setData(Plants)
                } else {
                    setpreviewCards([])
                }
            }
        }, 1000)
    }, [Plants, searchTerm, setData])

    const clearInput = () => {
        setSearchTerm("")
        if (location.pathname === "/dashboard") {
            setData(Plants)
            setpreviewCards([])
        }
    }

    const HeadTo = (id: string) => {
        navigate(`/dashboard/plant/${id}`)
    }
    return (
        <div className='w-full flex flex-col'>
            <div className='flex border px-4 rounded-xl justify-center items-center w-full focus-visible:ring-1 focus-visible:ring-primary'>
                <GoSearch />
                <Input type="search" placeholder="Search plants..." className="border-none rounded-xl shadow-none focus-visible:ring-0 bg-card" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
                {searchTerm.length > 0 && <button className='mr-3' onClick={clearInput}><Cross2Icon></Cross2Icon></button>}
            </div>
            {previewCards?.length > 0 && previewCards?.map((plant, index) => {

                return (
                    <button onClick={() => HeadTo(plant.id)}>
                        <div key={index} className='flex gap-2 w-full justify-center items-start top-2 bg-white p-1 border-b transition-all hover:bg-primary-foreground'>
                            <div className=''>
                                <img src={plant.imageUrl} alt={plant.imageName} width={64} className='rounded-xl' />
                            </div>
                            <div className='flex flex-col w-full text-start'>
                                <h1 className='text-lg text start topic'>{plant.nickname}</h1>
                                <p className='text-start text-sm text-secondary'>{plant.species}</p>
                            </div>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}

export default SearchComponent