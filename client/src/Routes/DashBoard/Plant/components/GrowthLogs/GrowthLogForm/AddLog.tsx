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
import uploadImage from "@/services/Images.service";
import { AddGrowthLog } from "@/services/GrowthLog.service";
import { PlusIcon } from "@radix-ui/react-icons";
import { UserContext } from "@/App";
import { responseDataTypes } from "@/types/Plant";
import { GrowthLogDataTypes } from "@/types/GrowthLog";


const AddLog = ({ plantId, userId, loadPlant }: { plantId: string, userId: string, loadPlant: () => Promise<void> }) => {
    const [Values, setValues] = useState({ plantId: plantId, imageUrl: "", imageName: "", date: "", notes: "", height: "", leafCount: "" })

    const [isLoading, setisLoading] = useState(false)
    // const [isUploaded, setisUploaded] = useState(false)
    const [Image, setImage] = useState<File | null>(null)
    const BASE = useContext(UserContext);



    const onValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                const { imageUrl, fileName } = await uploadImage(userId, Image) as { imageUrl: string; fileName: string };
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
                    const response: responseDataTypes = await AddGrowthLog(BASE, Values as unknown as GrowthLogDataTypes)
                    console.log("Response:", response)
                    if (response.status == 201) {
                        setisLoading(false)
                        console.log("✅", response.message)
                        toast.success(response.message)
                        loadPlant();
                    } else if (response.status == 401) {
                        setisLoading(false)
                        console.log("ℹ️", response.message)
                        toast.error(response.message)
                        loadPlant();
                    }
                    setisLoading(false)
                } catch (error) {
                    toast.error("Error Adding Log!")
                    console.error("Upload failed", error);
                    setisLoading(false)

                }
            }
            postData()
            
        }
    }, [Values.imageUrl]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setImage(files[0]);
        }
    }



    return (
        <div>
            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button type="button" variant="secondary" className="text-primary"><PlusIcon /></Button>
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
                            <div className="flex items-center justify-center w-full">
                                <Label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2  border-dashed rounded-lg cursor-pointer bg-white">
                                    <div className="flex flex-col items-center justify-center pt-10 pb-12">
                                        <svg className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className=" text-sm text-secondary"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <Input id="dropzone-file" onChange={handleImageChange} type="file" accept='image' className="text-center border-none bg-white text-secondary shadow-none file:hidden" />
                                    </div>
                                </Label>
                            </div>
                                <p className="text-xs text-center text-secondary">Upload a image of your plant to get a visual idea.</p>
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