import { SlOptionsVertical } from "react-icons/sl";
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
import { DeletePlant } from "@/services/PlantService";
import { PlantDataTypes } from "@/types/Plant";
import "../../../App.css"


const PlantCard = ({ plant }: { plant: PlantDataTypes }) => {
    const BASE = useContext(UserContext);
    const [open, setOpen] = useState(false)

    async function loadDeletePlant() {
        try {
            const response = await DeletePlant(BASE, plant.userId, plant.id, plant.imageName)
            //console.log('response', response)
            if (response.status == 200) {
                console.log("✅", response.message)
                setOpen(!open)
                toast.success(response.message)
            } else if (response.status == 400) {
                setOpen(!open)
                console.log("ℹ️", response.message)
                toast.error(response.message)
            }
        } catch (error) {
            setOpen(!open)
            return console.error(error)
        }
    }

    return (
        <div className='container relative flex flex-col w-full'>
            <a href={`dashboard/plant/${plant.id}`}>
                <div className='relative bg-white border rounded-md h-48 w-48 my-12 '>
                    <div className='flex absolute justify-center items-end gap-2 bottom-24 p-6'>
                        <img src={plant.imageUrl} alt={plant.imageName} className='rounded-md' />
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
                    <div className='mt-20 flex flex-col justify-center items-start mx-4'>
                        <h1 className='topic text-lg font-bold'>{plant.nickname}</h1>
                        <p className='text-sm'>{plant.location}</p>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default PlantCard