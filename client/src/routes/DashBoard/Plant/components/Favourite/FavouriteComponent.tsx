import { useEffect, useState } from "react";
import { LiaHeart, LiaHeartSolid } from "react-icons/lia";
import { setFavourite } from "@/services/Plants.service";
import { useContext } from "react";
import { UserContext } from "@/App";
import { toast } from "sonner";
import { responseDataTypes } from "@/types/Plant";
const FavouriteComponent = ({ plantId, currentState }: { plantId: string, currentState: boolean }) => {
    const [isFavourite, setIsFavourite] = useState<boolean | undefined>(currentState)
    const [current, setCurrent] = useState<boolean | undefined>(currentState)
    const BASE = useContext(UserContext)

    const handleFavourite = async () => {

        setIsFavourite(!isFavourite)
        try {
            const response: responseDataTypes = await setFavourite(BASE, plantId, isFavourite ?? false)
            if (response.status == 200) {
                if (isFavourite) {
                    toast.success("Plant added to favourites")
                    setCurrent(true)
                } else {
                    toast.success("Plant removed from favourites")
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
        setIsFavourite(!currentState)
        setCurrent(currentState)
    }, [currentState])
    return (
        <button onClick={handleFavourite}>
            {current ? <LiaHeartSolid className="text-destructive" size={24} /> : <LiaHeart className="text-destructive" size={24} />}
        </button>
    )
}

export default FavouriteComponent