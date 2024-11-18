import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Pencil1Icon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GetGrowthLogDetails } from "@/services/GrowthLog.service";
import { useContext } from "react";
import { UserContext } from "@/App";
import { UpdateGrowthLog } from "@/services/GrowthLog.service";
import { responseDataTypes } from "@/types/Plant";
import { GrowthLogDataTypes } from "@/types/GrowthLog";



const EditLog = ({ plantId, index, loadPlant }: { plantId: string, index: number, loadPlant: () => void }) => {
    const BASE = useContext(UserContext);
    const [preValues, setpreValues] = useState({ plantId: plantId, imageUrl: "", date: "", notes: "", height: 0, leafCount: 0 })
    const [ValuesTobeSubmitted, setValuesTobeSubmitted] = useState<GrowthLogDataTypes>({ index: index, plantId: plantId, imageUrl: "", imageName: "", date: "", notes: "", height: 0, leafCount: 0 });
    const [isChanged, setisChanged] = useState(false)
    const [open, setOpen] = useState(false)

    const loadGetGrowthLogDetails = async () => {
        const payload: GrowthLogDataTypes = await GetGrowthLogDetails(BASE, plantId, index)
        if (payload) {
            setpreValues({ ...preValues, date: payload.date, notes: payload.notes, height: payload.height, leafCount: payload.leafCount })
            setValuesTobeSubmitted({ ...ValuesTobeSubmitted, date: payload.date, notes: payload.notes, imageName: payload.imageName, imageUrl: payload.imageUrl, height: payload.height, leafCount: payload.leafCount })
        }
    }
    useEffect(() => {
        loadGetGrowthLogDetails()
    }, [])


    const onValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputId = e.target.id as keyof Omit<typeof preValues, 'index' | 'imageName'>;
        if (preValues[inputId] !== e.target.value) {
            if (ValuesTobeSubmitted[inputId] !== e.target.value) {
                setValuesTobeSubmitted({ ...ValuesTobeSubmitted, [inputId]: e.target.value })
                setisChanged(true)
            }

        } else {
            setisChanged(false)
        }
    }



    async function submit() {
        try {
            const response: responseDataTypes = await UpdateGrowthLog(BASE, ValuesTobeSubmitted)
            //console.log(response)
            if (response.status == 200) {
                console.log("✅", response.message)
                setOpen(!open)
                toast.success(response.message)
                loadPlant()
            } else if (response.status == 400) {
                console.log("ℹ️", response.message)
                setOpen(!open)
                toast.error(response.message)
                loadPlant()
            }
        } catch (error) {
            console.error("Error updating Log:", error)
            setOpen(!open)
            toast.error("Error updating Log!")
        }


    }
    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost"><Pencil1Icon /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Record</DialogTitle>
                    <DialogDescription>
                        Update a log about your plant's growth here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-72 w-full rounded-md border p-5">
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <Label>Date: </Label>
                                <Input type="date" id="date" defaultValue={preValues.date} onChange={(e) => { onValueChange(e) }}></Input>
                                <p className="text-xs text-gray-500">Enter the Date you added the log.</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>Notes: </Label>
                                <Textarea rows={4} id="notes" defaultValue={preValues.notes} onChange={(e) => { onValueChange(e) }} />
                                <p className="text-xs text-gray-500">Write a note how the plant has grown.</p>
                            </div>

                        </div>
                        <div>
                            <Separator className="my-5" />
                            <Label>Measurements</Label>

                            <div className="mt-5">
                                <div className="flex gap-4 my-3 w-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <Label>Height: </Label>
                                        <Input type="number" defaultValue={preValues.height} placeholder="Height in cm" id="height" onChange={(e) => { onValueChange(e) }}></Input>
                                        <p className="text-xs text-gray-500">Enter the height of the plant.</p>
                                    </div>

                                </div>
                                <div className="flex gap-4 w-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <Label>Leaf Count: </Label>
                                        <Input type="number" placeholder="Number of leaves" defaultValue={preValues.leafCount} id="leafCount" onChange={(e) => { onValueChange(e) }}></Input>
                                        <p className="text-xs text-gray-500">Enter leaf count of the plant.</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <ScrollBar orientation="vertical" />
                    </div>
                </ScrollArea>
                <DialogFooter>
                    <Button type="submit" onClick={submit} disabled={isChanged ? false : true}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>



    )
}

export default EditLog