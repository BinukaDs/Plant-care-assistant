import { useState, useEffect, useContext } from "react";
import { toast } from "sonner"
import { PuffLoader } from "react-spinners";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import uploadImage from "@/services/imageHandle";
import { AddGrowthLog } from "@/services/GrowthLogService";
import { UserContext } from "@/App";


const AddLog = ({ plantId, userId, loadPlant }: { plantId: string, userId: string, loadPlant: () => Promise<void> }) => {
    const [Values, setValues] = useState({ plantId: plantId, imageUrl: "", imageName: "", date: "", notes: "", height: "", leafCount: "" })
    
    const [isLoading, setisLoading] = useState(false)
    const [isUploaded, setisUploaded] = useState(false)
    const [Image, setImage] = useState(null)
    const BASE = useContext(UserContext);

   

    const onValueChange = (e) => {
        setValues({ ...Values, [e.target.id]: e.target.value })
    }

    async function handleUpload() {
        try {
            setisLoading(true)
            if (!userId || !Image || !Values.date || !Values.notes || !Values.height || !Values.leafCount) {
                setisLoading(false)
                console.log("ℹ️ Please fill all the fields.")
                toast.error("ℹ️ Please fill all the fields.")

            } else if (userId && Image && Values.date && Values.notes && Values.height && Values.leafCount) {
                const { imageUrl, fileName } = await uploadImage(userId, Image);
                setValues({ ...Values, imageUrl: imageUrl as string, imageName: fileName })
            }

        } catch (error) {
            console.error("Upload failed", error);
            setisLoading(false)
        }

    }

    useEffect(() => {
        if (Values.imageUrl) {
            const postData = async () => {
                try {
                    setisLoading(true)
                    const response = await AddGrowthLog(BASE, Values)
                    console.log("Response:", response)
                     if (response.status == "201") {
                         setisLoading(false)
                         toast.success("Log Added successfully!")
                         loadPlant();
                     } else if (response.status == "401") {
                         setisLoading(false)
                         toast.error("Error Adding Log!")
                         loadPlant();
                     } 
                    setisLoading(false)
                } catch (error) {
                    toast.error("ℹError Adding Log!")
                    console.error("Upload failed", error);
                    setisLoading(false)

                }
            }
            postData()
            setisUploaded(true)
        }
    }, [Values.imageUrl]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file)
        }
    }



    return (
        <div>
            <div>
                <h2>Growth Log</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button type="button" variant="outline">Add Record</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Record</DialogTitle>
                            <DialogDescription>
                                Add a log about your plant's growth here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <Label>Photo: </Label>
                                <div className='justify-center items-center'>
                                    <input onChange={handleImageChange} type="file" accept='image' />
                                </div>
                                <p className="text-xs text-gray-500">Upload a image of your plant to get a visual idea.</p>
                            </div>

                            <ScrollArea className="h-72 w-full rounded-md border p-5">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <Label>Date: </Label>
                                        <Input type="date" id="date" onChange={(e) => { onValueChange(e) }}></Input>
                                        <p className="text-xs text-gray-500">Upload a image of your plant to get a visual idea.</p>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label>Notes: </Label>
                                        <Textarea rows={4} id="notes" onChange={(e) => { onValueChange(e) }} />
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
                                                <Input type="number" placeholder="Height in cm" id="height" onChange={(e) => { onValueChange(e) }}></Input>
                                                <p className="text-xs text-gray-500">Enter the height of the plant.</p>
                                            </div>

                                        </div>
                                        <div className="flex gap-4 w-full">
                                            <div className="flex flex-col gap-2 w-full">
                                                <Label>Leaf Count: </Label>
                                                <Input type="number" placeholder="Number of leaves" id="leafCount" onChange={(e) => { onValueChange(e) }}></Input>
                                                <p className="text-xs text-gray-500">Enter leaf count of the plant.</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <ScrollBar orientation="vertical" />
                            </ScrollArea>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleUpload} >{isLoading ? <PuffLoader /> : "Save"}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <div>

                </div>
            </div>
        </div>
    )
}

export default AddLog