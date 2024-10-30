import { toast } from "sonner";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/App";
import { setFavourite } from "@/services/Plants.service";
import { PlantDataTypes, responseDataTypes } from "@/types/Plant";
import "../../../App.css"
import { LiaLeafSolid, LiaMapPinSolid, LiaHeart, LiaHeartSolid } from "react-icons/lia";

const FavouritePlantCard = ({ plant, loadFavourites }: { plant: PlantDataTypes, loadFavourites: () => Promise<void>; }) => {
    const [isFavourite, setIsFavourite] = useState<boolean | undefined>(plant.favourite)
    const [current, setCurrent] = useState<boolean | undefined>(plant.favourite)
    const BASE = useContext(UserContext)
    const handleFavourite = async () => {

        setIsFavourite(!isFavourite)
        try {
            const response: responseDataTypes = await setFavourite(BASE, plant.id, isFavourite ?? false)
            if (response.status == 200) {
                if (isFavourite) {
                    toast.success("Plant added to favourites")
                    loadFavourites()
                    setCurrent(true)
                } else {
                    toast.success("Plant removed from favourites")
                    loadFavourites
                    setCurrent(false)
                }
            } else if (response.status != 200) {
                toast.error("Error setting Favourites")
            }
        } catch (error) {
            console.error("Error updating Favourites", error)
        }
    }
    useEffect(() => {
        setIsFavourite(!plant.favourite)
        setCurrent(plant.favourite)
    }, [plant.favourite])
    return (
        <div className='p-3 bg-card rounded-2xl flex flex-col w-full h-full'>
            <div className='flex  justify-center items-end  pb-4'>
                <img src={plant.imageUrl} alt={plant.imageName} className='rounded-2xl w-full hover:scale-105 transition-all' height={"200px"} width={"180px"} />
            </div>
            <div className='flex w-full justify-around items-start h-full'>
                <div className="flex flex-col justify-center items-start w-full h-full">
                    <div className="w-full flex justify-start items-start">
                        <div className="flex flex-col w-full justify-between h-full">
                            <h1 className='topic text-xl text-start'>{plant.nickname}</h1>
                            <div className="flex gap-1 mt-3">
                                <LiaLeafSolid className="text-primary" />
                                <p className='text-sm'>{plant.species}</p>
                            </div>
                            <div className="flex gap-1 mt-2">
                                <LiaMapPinSolid className="text-primary" />
                                <p className='text-sm'>{plant.location}</p>
                            </div>
                        </div>
                        <div className="flex flex-col h-full justify-between items-end">

                            <button onClick={handleFavourite}>
                                {current ? <LiaHeartSolid className="text-destructive" size={24} /> : <LiaHeart className="text-destructive" size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavouritePlantCard