import { SlLocationPin, SlOptionsVertical } from "react-icons/sl";
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
import { PlantDataTypes, responseDataTypes } from "@/types/Plant";
import "../../../App.css"
import { FaLeaf } from "react-icons/fa";


const PlantCard = ({ plant }: { plant: PlantDataTypes }) => {
    const BASE = useContext(UserContext);
    const [open, setOpen] = useState(false)
    const { loadFetchPlants } = useContext(PlantsContext)
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
        <div className='container relative flex flex-col w-full'>

            <div className='relative bg-card rounded-xl h-72 w-56 my-12 '>
                <div className='flex absolute justify-center items-end gap-2 bottom-40 p-6'>
                    <img src={plant.imageUrl} alt={plant.imageName} className='rounded-xl' />
                </div>
                <div className='mt-32 flex w-full justify-around items-start '>
                    <div className="flex flex-col justify-center items-start w-full mx-6">
                        <div className="w-full flex justify-start items-start">
                            <div className="flex flex-col  w-full">
                                <h1 className='topic text-lg font-bold text-start'>{plant.nickname}</h1>
                                <div className="flex gap-1 mt-2">
                                    <FaLeaf className="text-primary" />
                                    <p className='text-sm'>{plant.species}</p>
                                </div>
                                <div className="flex gap-1 mt-2">
                                    <SlLocationPin className="text-primary" />
                                    <p className='text-sm'>{plant.location}</p>
                                </div>
                            </div>
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
                        </div>
                        <div className="w-full mt-2">

                            <Button variant={"secondary"} onClick={() => { navigate(`/dashboard/plant/${plant.id}`) }} className="w-full mt-2">Manage</Button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlantCard