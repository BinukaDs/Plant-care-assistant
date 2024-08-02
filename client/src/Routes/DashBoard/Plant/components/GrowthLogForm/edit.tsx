import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog"
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GetGrowthLogDetails } from "@/services/GrowthLogService";
import { useContext } from "react";
import { UserContext } from "@/App";
import { GrowthLogDataTypes } from "@/types/GrowthLog";
import { EditGrowthLog } from "@/services/GrowthLogService";

function EditLog({ plantId, index }) {
    const BASE = useContext(UserContext);

    const [preValues, setPreValues] = useState({ plantId: plantId, imageUrl: "", date: "", notes: "", height: "", leafCount: "" })
    const [ValuesTobeSubmitted, setValuesTobeSubmitted] = useState({ index: index, plantId: plantId, imageUrl: "", imageName: "", date: "", notes: "", height: "", leafCount: "" });
    const [isChanged, setisChanged] = useState(false)

    const loadGetGrowthLogDetails = async () => {
        const data = await GetGrowthLogDetails(BASE, plantId, index)

        if (data) {
            setPreValues({ ...preValues, date: data.growthLog.date, notes: data.growthLog.notes, height: data.growthLog.height, leafCount: data.growthLog.leafCount })
            setValuesTobeSubmitted({ ...ValuesTobeSubmitted, date: data.growthLog.date, notes: data.growthLog.notes, imageName: data.growthLog.imageName, imageUrl: data.growthLog.imageUrl, height: data.growthLog.height, leafCount: data.growthLog.leafCount })
            console.log(preValues)
        }
    }
    useEffect(() => {
        loadGetGrowthLogDetails()
    }, [])


    const onValueChange = (e) => {
        const id = e.target.id
        if (preValues[id] !== e.target.value) {
            if (ValuesTobeSubmitted[id] !== e.target.value) {
                setValuesTobeSubmitted({ ...ValuesTobeSubmitted, [e.target.id]: e.target.value })
                setisChanged(true)
            }

        } else {
            setisChanged(false)
        }
    }



    async function submit() {
        console.log(ValuesTobeSubmitted)
        try {
            const response = await fetch(BASE + "/growthlogs/edit", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ValuesTobeSubmitted)
            })
            console.log(response)
            response.json()
            if (response.status == "200") {
                console.log("✅ GrowthLog Updated Successfully!")
                toast.success("GrowthLog Updated Successfully!")
            } else if (response.status == "400") {
                console.log("ℹ️ Error Updating GrowthLog!")
                toast.error("Error Updating GrowthLog!")
            }
        } catch (error) {
            console.error("Error updating Log:", error)
            toast.error("Error updating Log!")
        }


    }
    return (
        <div>
            <div>
                <h2>Growth Log</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Record</DialogTitle>
                            <DialogDescription>
                                Add a log about your plant's growth here. Click save when you're done.
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
                <div>

                </div>
            </div>
        </div>
    )
}

export default EditLog