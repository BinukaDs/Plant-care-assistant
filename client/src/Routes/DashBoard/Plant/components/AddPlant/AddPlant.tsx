import { useEffect, useState } from "react"
import { toast } from "sonner"
import { PlusIcon } from "@radix-ui/react-icons"
import { Button } from '@/components/ui/button'
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
import { Label } from '@/components/ui/label'
import uploadImage, { deleteImage } from "@/services/Images.service";
import { useContext } from "react"
import { UserContext } from "@/App"
import { AddPlant } from "@/services/Plants.service"
import { PlantsContext } from "@/App"
import { PlantsContextDataTypes, responseDataTypes } from "@/types/Plant"
import LocationInput from "./LocationInput"
import SpeciesInput from "./SpeciesInput"
import { addLocation } from "@/services/Locations.service"
import { tailspin } from 'ldrs'
tailspin.register()

const AddPlantComponent = ({ userId, isCollapsed }: { userId: string, isCollapsed: boolean }) => {
    const BASE = useContext(UserContext);
    const { loadFetchPlants } = useContext(PlantsContext) as PlantsContextDataTypes
    const [Values, setValues] = useState({ userId: userId, nickname: "", location: "", speciesId: "", environment: "", imageUrl: "", imageName: "" })
    const [Image, setImage] = useState<File | null>(null)
    const [open, setOpen] = useState(false)
    const [isLocationAvailable, setisLocationAvailable] = useState(false)
    const [isLoading, setisLoading] = useState(false)


    const onValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValues({ ...Values, userId: userId, [e.target.id]: e.target.value })
    }

    //handle imageUpload
    async function handleUpload() {
        if (!Values.nickname || !Values.location || !Values.speciesId || !Values.environment || !Image) {
            return toast.error("Please fill in all the fields")
        } else {
            try {
                setisLoading(true)
                const { imageUrl, fileName } = await uploadImage(userId, Image) as { imageUrl: string, fileName: string };
                setValues({ ...Values, imageUrl: imageUrl as string, imageName: fileName as string })
                setisLoading(false)

            } catch (error) {
                console.error("Upload failed", error);
                setisLoading(false)
            }
        }

    }

    useEffect(() => {
        if (Values.imageUrl) {
            const addPlant = async () => {
                setisLoading(true)
                if (isLocationAvailable == false) {
                    const response: responseDataTypes = await addLocation(BASE, userId, Values.location, Values.environment)
                    if (response.status == 201) {
                        console.log("✅", response.message)
                    } else if (response.status != 201) {
                        await deleteImage(userId, Values.imageName)
                        return console.log("ℹ️", response.message)
                    }
                }
                const response: responseDataTypes = await AddPlant(BASE, Values)
                console.log("UserId", userId)
                setisLoading(false)
                if (response.status == 201) {
                    console.log("✅", response.message)
                    setOpen(!open)
                    toast.success(response.message)
                    return loadFetchPlants()
                } else if (response.status != 201) {
                    await deleteImage(userId, Values.imageName)
                    console.log("ℹ️", response.message)
                    setOpen(!open)
                    toast.error(response.message)
                    return loadFetchPlants()
                }
            }
            addPlant()
        }
    }, [Values.imageUrl])


    const handleLocationChange = (location: string, environment: string | null) => {

        setValues((prevValues) => ({
            ...prevValues,
            location: location,
            ...(environment && { environment: environment })
        }));

        if (environment) {
            setisLocationAvailable(true)
        } else {
            setisLocationAvailable(false)
        }

    }

    const handleSpeciesChange = (value: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            speciesId: value
        }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file)
        }
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="w-full" asChild>
                    <Button className="w-full">{!isCollapsed ? "Add Plant" : <PlusIcon />}</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Plant</DialogTitle>
                        <DialogDescription>Fill in the details below to add a plant</DialogDescription>

                     

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


                        
                        <div className="flex items-center space-x-2 my-10">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="nickname">
                                    NickName
                                </Label>
                                <Input
                                    name='name'
                                    id="nickname"
                                    placeholder='Baby Rosa'
                                    onChange={(e) => { onValueChange(e) }}
                                />
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="location" >
                                    Location
                                </Label>
                                <LocationInput onValueChange={handleLocationChange} />
                            </div>
                        </div>
                        <div className="w-full">
                            <Label htmlFor="location" >
                                Species
                            </Label>
                            <SpeciesInput onValueChange={handleSpeciesChange} />
                            <p className="text-secondary text-xs mt-1">You can add species if you don't find the species of your plant.</p>
                        </div>
                        <div className="w-full">
                            <Label htmlFor="location" >
                                Environment
                            </Label>
                            <select disabled={isLocationAvailable} value={Values.environment} name="environment" id="environment" className='flex my-1 p-2 rounded-md border w-full' onChange={(e) => { onValueChange(e) }}>
                                <option value="Indoor">Indoor</option>
                                <option value="Outdoor">Outdoor</option>
                            </select>
                            <p className="text-secondary text-xs mt-1">You cannot change the environments of predefined locations.</p>
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading} className="w-full" onClick={handleUpload} >{isLoading ?

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

export default AddPlantComponent