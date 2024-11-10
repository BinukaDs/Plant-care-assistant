import { useState, useContext, useEffect } from "react"
import { PlantsContext } from "@/App"
import { PlantDataTypes, PlantsContextDataTypes } from "@/types/Plant"
import FavouritesSkeleton from "@/components/skeletons/Favourites-plant-skeleton"
import FavouritePlantCard from "../components/FavouritePlantCard"
const Favourites = () => {
    const [Favourites, setFavourites] = useState<PlantDataTypes[]>([])
    const { Plants, loadFetchPlants, isLoading, setisLoading } = useContext(PlantsContext) as PlantsContextDataTypes

    const loadFavourites = () => {
        return Plants.filter((plant: PlantDataTypes) => plant.favourite == true)
    }
    const fetchAndLoadFavourites = async () => {
        setisLoading(true)
        try {
            await loadFetchPlants()
            const favourites = loadFavourites()
            setFavourites(favourites)
            setisLoading(false)

        } catch (error) {
            console.error(error)
            setisLoading(false)
        }

    }

    useEffect(() => {
        fetchAndLoadFavourites()
    }, [])
    return (
        <section className='mt-3 w-full'>
            <div className='flex flex-col items-start w-full border-b pb-2'>
                <p className='topic'>Favourites</p>
                <p className='text-secondary text-sm'>Manage Your Favourites List</p>
            </div>
            <div className='grid grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 w-full my-12 justify-center items-center h-full gap-12'>
                {
                    isLoading ? <FavouritesSkeleton /> :
                        Favourites.length > 0 ? Favourites.map((plant) => {
                            return (
                                <FavouritePlantCard plant={plant} loadFavourites={fetchAndLoadFavourites} />
                            )
                        }) : (
                            <div>
                                <p className='text-center text-secondary text-sm mt-2'>No Favourites Yet. Start by adding favourites.</p>
                            </div>
                        )}

            </div>
        </section>
    )
}

export default Favourites