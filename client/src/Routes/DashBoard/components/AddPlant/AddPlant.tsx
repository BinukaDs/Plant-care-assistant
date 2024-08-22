import { useEffect, useState } from "react"
import { toast } from "sonner"
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
import { PuffLoader } from 'react-spinners'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import uploadImage from "@/services/imageHandle";
import { useContext } from "react"
import { UserContext } from "@/App"
import { AddPlant } from "@/services/PlantService"
import { PlantsContext } from "../../DashBoard"
import { FetchPlants } from "@/services/PlantService"
import LocationInput from "./LocationInput"
import { addLocation } from "@/services/LocationsService"


const AddPlantComponent = ({ userId }: { userId: string }) => {
    const BASE = useContext(UserContext);
    const { setData } = useContext(PlantsContext)
    const [Values, setValues] = useState({ userId: userId, nickname: "", location: "", species: "", environment: "", imageUrl: "", imageName: "" })
    const [Image, setImage] = useState(null)
    const [open, setOpen] = useState(false)
    const [isLocationAvailable, setisLocationAvailable] = useState(false)
    const [isLoading, setisLoading] = useState(false)


    const onValueChange = (e) => {
        setValues({ ...Values, userId: userId, [e.target.id]: e.target.value })
    }

    //fetch Plants
    const loadFetchPlants = async () => {
        try {
            setisLoading(true)
            const data = await FetchPlants(BASE, userId);
            if (data) {
                setisLoading(true)
                await setData(data)
                setisLoading(false)
            } else return setisLoading(false)
        } catch (error) {
            console.error(error)
            setisLoading(false)
        }
    }

    //handle imageUpload
    async function handleUpload() {
        try {
            setisLoading(true)
            const { imageUrl, fileName } = await uploadImage(userId, Image);
            // console.log("image: ", imageUrl)
            // console.log(fileName)
            setValues({ ...Values, imageUrl: imageUrl as string, imageName: fileName as string })
            //console.log(Values)
            setisLoading(false)

        } catch (error) {
            console.error("Upload failed", error);
            setisLoading(false)
        }

    }

    useEffect(() => {
        if (Values.imageUrl) {
            const addPlant = async () => {
                setisLoading(true)
                if (isLocationAvailable == false) {
                    const response = await addLocation(BASE, Values.location, Values.environment)
                    if (response.status != 201) {
                        console.log("ℹ️", response.message)
                    }
                }
                const response = await AddPlant(BASE, Values)
                setisLoading(false)
                if (response.status == 201) {
                    console.log("✅", response.message)
                    setOpen(!open)
                    toast.success(response.message)
                    return loadFetchPlants()
                } else if (response.status != 201) {
                    console.log("ℹ️", response.message)
                    setOpen(!open)
                    toast.error(response.message)
                    return loadFetchPlants()
                }
            }
            addPlant()
        }
    }, [Values.imageUrl])


    const handleLocationChange = ( location: string, environment: string | null ) => {
        
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file)
        }
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="w-full">
                    <Button className="w-full">Add Plant</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Plant</DialogTitle>
                        <DialogDescription>Fill in the details below to add a plant</DialogDescription>

                        <div className='justify-center items-center'>
                            <input onChange={handleImageChange} type="file" accept='image' />
                        </div>
                        <div className="flex items-center space-x-2 my-5">
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
                            <Input
                                name='species'
                                id="species"
                                placeholder='Begonia'
                                onChange={(e) => { onValueChange(e) }}
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="location" >
                                Environment
                            </Label>
                            <select disabled={isLocationAvailable} value={Values.environment} name="environment" id="environment" className='flex my-1 p-2 rounded-md border w-full' onChange={(e) => { onValueChange(e) }}>
                                <option value="Indoor">Indoor</option>
                                <option value="Outdoor">Outdoor</option>
                            </select>
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="submit" className="w-full" onClick={handleUpload} >{isLoading ? <PuffLoader /> : "Save"}</Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddPlantComponent