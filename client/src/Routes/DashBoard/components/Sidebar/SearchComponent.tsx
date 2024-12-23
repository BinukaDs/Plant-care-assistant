import { Input } from '@/components/ui/input'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PlantsContext } from '@/App'
import { Cross2Icon } from '@radix-ui/react-icons'
import { PlantDataTypes, PlantsContextDataTypes } from '@/types/Plant'
import { useParams } from 'react-router-dom'
import { LiaMapPinSolid } from 'react-icons/lia'
import { GoSearch } from "react-icons/go";


const SearchComponent = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { setData, Plants } = useContext(PlantsContext) as PlantsContextDataTypes
    const [previewCards, setpreviewCards] = useState<PlantDataTypes[]>()
    const [searchTerm, setSearchTerm] = useState<string>("")
    const { plantId } = useParams()


    useEffect(() => {
        setTimeout(() => {
            if (searchTerm.length >= 2) {
                //search through Plants
                let filtered = Plants.filter((plant) => plant.nickname && plant.nickname.toLowerCase().includes(searchTerm.toLowerCase()));
                if (location.pathname === "/dashboard") {
                    return setData(filtered)
                } else {
                    filtered = filtered.filter((plant) => plant.id !== plantId)
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
    }, [searchTerm, Plants, setData])

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
            {previewCards && previewCards.length > 0 && previewCards.map((plant, index) => {
                return (
                    <button onClick={() => HeadTo(plant.id)}>
                        <div key={index} className='flex gap-2 w-full justify-center items-start top-2 bg-white p-1 border-b transition-all hover:bg-primary-foreground'>
                            <div className=''>
                                <img src={plant.imageUrl} alt={plant.imageName} width={64} className='rounded-xl' />
                            </div>
                            <div className='flex flex-col w-full text-start'>
                                <h1 className='text-lg text start topic'>{plant.nickname}</h1>
                                <p className='text-start text-sm text-secondary flex gap-1 items-center '><LiaMapPinSolid size={16}/>{plant.location}</p>
                            </div>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}

export default SearchComponent