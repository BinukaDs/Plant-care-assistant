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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useParams } from "react-router-dom"
import uploadImage from "@/services/imageHandle.service";
import { useContext } from "react"
import { UserContext } from "@/App"
import { UpdatePlant } from "@/services/Plants.service"
import { FetchPlantDetails } from "@/services/Plants.service"
import LocationInput from "../AddPlant/LocationInput"
import { addLocation } from "@/services/Locations.service"
import { tailspin } from 'ldrs'
import { Pencil1Icon } from "@radix-ui/react-icons"
import { PlantDataTypes, responseDataTypes } from "@/types/Plant"

tailspin.register()
const EditPlantComponent = ({ plant }: { plant: PlantDataTypes }) => {
    const BASE = useContext(UserContext);
    const { plantId } = useParams();
    const [Values, setValues] = useState({ plantId: plantId, userId: plant.userId, nickname: plant.nickname, location: plant.location, species: plant.species, environment: plant.environment, imageUrl: plant.imageUrl, imageName: plant.imageName })
    const [ValuesTobeSubmitted, setValuesTobeSubmitted] = useState({ plantId: plantId, userId: plant.userId, nickname: plant.nickname, location: plant.location, species: plant.species, environment: plant.environment, imageUrl: plant.imageUrl, imageName: plant.imageName })
    const [Image, setImage] = useState(null)
    const [open, setOpen] = useState(false)
    const [isLocationAvailable, setisLocationAvailable] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [isChanged, setisChanged] = useState(false)

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id
        if (plant[id] !== e.target.value) {
            if (ValuesTobeSubmitted[id] !== e.target.value) {
                setValuesTobeSubmitted({ ...ValuesTobeSubmitted, [e.target.id]: e.target.value })
                setisChanged(true)
            }

        } else {
            setisChanged(false)
        }
        
    }

    const updatePlant = async () => {
        // setisLoading(true)
        // if (isLocationAvailable == false) {
        //     const response: responseDataTypes = await addLocation(BASE, Values.location, Values.environment)
        //     if (response.status != 201) {
        //         console.log("ℹ️", response.message)
        //     }
        // }
        // const response = await UpdatePlant(BASE, Values)
        // setisLoading(false)
        // if (response.status == 201) {
        //     console.log("✅", response.message)
        //     setOpen(!open)
        //     toast.success(response.message)
        //     return loadFetchPlantDetails()
        // } else if (response.status != 201) {
        //     console.log("ℹ️", response.message)
        //     setOpen(!open)
        //     toast.error(response.message)
        //     return loadFetchPlantDetails()
        // }
        console.log(ValuesTobeSubmitted)
        
    }

    //fetch Plants
    const loadFetchPlantDetails = async () => {
        try {
            setisLoading(true)
            const payload = await FetchPlantDetails(BASE, plantId, plant.userId);
            if (payload) {
                setisLoading(true)
                setValues({...Values,nickname: payload.nickname, location: payload.location, species: payload.species, environment: payload.environment, imageUrl: payload.imageUrl, imageName: payload.imageName})
                setValuesTobeSubmitted({ ...ValuesTobeSubmitted, nickname: payload.nickname, location: payload.location, species: payload.species, environment: payload.environment, imageUrl: payload.imageUrl, imageName: payload.imageName })
                setisLoading(false)
            } else return setisLoading(false)
        } catch (error) {
            console.error(error)
            setisLoading(false)
        }
    }

    //handle imageUpload
    async function handleUpload() {
        if (Image != null) {
            try {
                setisLoading(true)
                const { imageUrl, fileName } = await uploadImage(Values.userId, Image) as { imageUrl: string, fileName: string };
                setValues({ ...Values, imageUrl: imageUrl as string, imageName: fileName as string })
                //console.log(Values)
                setisLoading(false)

            } catch (error) {
                console.error("Upload failed", error);
                setisLoading(false)
            }
        } else {
            updatePlant()
        }

    }

    useEffect(() => {
        if (Values.imageUrl) {
            updatePlant()
        }
    }, [Values.imageUrl])

    useEffect(() => {
        loadFetchPlantDetails()
    }, [])
    
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file)
            setisChanged(true)
        }
    }



    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="w-full">
                    <Button className="w-full" variant={"ghost"}><Pencil1Icon /></Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Plant</DialogTitle>
                        <DialogDescription>Fill in the details below to Update the plant</DialogDescription>

                        <div className='flex flex-col justify-center items-center'>
                            <div>
                                <label for="image" class="btn"><img src={plant.imageUrl} alt={Values.imageName} width={200} className="rounded-xl hover:blur-sm transition-all" /></label>
                                <input id="image" onChange={handleImageChange} type="file" accept='image' className="hidden justify-center mx-auto" />
                            </div>
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
                                    defaultValue={plant.nickname}
                                    onChange={(e) => { onValueChange(e) }}
                                />
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="location" >
                                    Location
                                </Label>
                                <LocationInput onValueChange={handleLocationChange} defaultValue={plant.location} />
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
                                defaultValue={plant.species}
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
                        <Button type="submit" className="w-full" onClick={handleUpload} disabled={isChanged ? false : true}>{isLoading ?

                            <l-tailspin
                                size="40"
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

export default EditPlantComponent