import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { UserContext } from "@/App";
import { PlantsContext } from "@/App";
import { DeletePlant } from "@/services/Plants.service";
import { PlantDataTypes, responseDataTypes, PlantsContextDataTypes } from "@/types/Plant";
import "../../../App.css"
import { LiaMapPinSolid, LiaArrowRightSolid } from "react-icons/lia";


const PlantCard = ({ plant }: { plant: PlantDataTypes }) => {

    const BASE = useContext(UserContext);
    const [open, setOpen] = useState(false)
    const { loadFetchPlants } = useContext(PlantsContext) as PlantsContextDataTypes
    const navigate = useNavigate()

    async function loadDeletePlant() {
        try {
            const response: responseDataTypes = await DeletePlant(BASE, plant.userId, plant.id, plant.imageName)
            if (response.status == 200) {
                console.log("✅", response.message)
                setOpen(!open)
                loadFetchPlants()
                toast.success(response.message)
            } else if (response.status == 400) {
                setOpen(!open)
                console.log("ℹ️", response.message)
                loadFetchPlants()
                toast.error(response.message)
            }
        } catch (error) {
            setOpen(!open)
            return console.error(error)
        }
    }

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
                                
                            </div>
                            <div className="flex gap-1 mt-2">
                                <LiaMapPinSolid className="text-primary" />
                                <p className='text-sm'>{plant.location}</p>
                            </div>
                        </div>
                        <div className="flex flex-col h-full justify-between items-end">
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <SlOptionsVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DialogTrigger asChild>
                                            <DropdownMenuLabel>
                                                <button>
                                                    Delete Plant
                                                </button>
                                            </DropdownMenuLabel>
                                        </DialogTrigger>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete this plant from our servers.
                                        </DialogDescription>
                                        <div className="flex w-full gap-6">
                                            <Button onClick={loadDeletePlant} variant={"destructive"} className="w-full">Yes</Button>
                                            <DialogClose className="w-full"><Button variant={"outline"} className="w-full">No</Button></DialogClose>
                                        </div>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog >
                            <div>
                                <Button onClick={() => { navigate(`/dashboard/plant/${plant.id}`) }} className=" rounded-full"><LiaArrowRightSolid size={24} /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlantCard