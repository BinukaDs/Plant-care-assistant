import { Button } from '@/components/ui/button'
import { PlusIcon } from "@radix-ui/react-icons"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { useState, useContext } from 'react'
import { toast } from 'sonner'
import { UserContext } from '@/App'
import { responseDataTypes } from '@/types/Plant'
import { addSpecies } from '@/services/Species.service'
import { tailspin } from 'ldrs'
tailspin.register()

const AddSpeciesComponent = ({ isCollapsed }: { isCollapsed: boolean }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState<string>('');
    const [isLoading, setisLoading] = useState(false);
    const BASE = useContext(UserContext);

    const AddSpecies = async () => {
        if (name) {
            try {
                setisLoading(true)
                const response: responseDataTypes = await addSpecies(BASE, name)
                if (response.status === 200) {
                    toast.success("Species added successfully!")
                    setisLoading(false)
                    setOpen(false)
                } else if (response.status === 400) {
                    setisLoading(false)
                    toast.error(response.message)
                } else if (response.status === 503) {
                    setisLoading(false)
                    toast.error("Failed to Generate details. Service unavailable!")
                } else {
                    setisLoading(false)
                    toast.error("Failed to add species!")
                }
            } catch (error) {
                setisLoading(false)
                console.error("Failed to add species", error)
                toast.error("Failed to add species!")
            }
        }
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className='w-full' asChild>
                    <Button className="w-full  text-primary" variant={"secondary"}>{!isCollapsed ? "Add Species" : <PlusIcon />}</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Species</DialogTitle>
                        <DialogDescription><span className='text-xs flex items-start justify-start gap-x-1 text-secondary'>Powered by <img src="../../Gemini.png" alt="Gemini logo"  width={"35px"} height={"10px"}/></span></DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col'>
                        <Input id="species" placeholder="Begonia" onChange={(e) => setName(e.target.value)} />
                        <p className='text-sm text-secondary mt-1'>Type the name of the plant in simple-words. The AI in the backend will generate the details.</p>
                    </div>
                    <DialogFooter>

                        <Button type="submit" disabled={isLoading} className="w-full" onClick={AddSpecies} >{isLoading ?

                            <l-tailspin
                                size="32"
                                stroke="5"
                                speed="0.9"
                                color="white"
                            ></l-tailspin> : "Save"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddSpeciesComponent