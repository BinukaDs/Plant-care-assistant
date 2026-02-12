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
import SpeciesInput from "../AddPlant/SpeciesInput"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useParams } from "react-router-dom"
import { updateImage } from "@/services/Images.service"
import { useContext } from "react"
import { UserContext } from "@/App"
import { UpdatePlant } from "@/services/Plants.service"
import LocationInput from "../AddPlant/LocationInput"
import { addLocation } from "@/services/Locations.service"
import { tailspin } from 'ldrs'
import { Pencil1Icon } from "@radix-ui/react-icons"
import { PlantDataTypes, responseDataTypes } from "@/types/Plant"

tailspin.register()
function EditPlantComponent({ plant, loadPlant }: { plant: PlantDataTypes, loadPlant: () => void }) {
    const BASE = useContext(UserContext);
    const { plantId } = useParams();
    const [Values, setValues] = useState({ nickname: "", location: "", speciesId: "", environment: "" })
    const [ValuesTobeSubmitted, setValuesTobeSubmitted] = useState({ plantId: plantId, nickname: "", location: "", speciesId: "", environment: "", imageUrl: "", imageName: "", userId: "" })
    const [Image, setImage] = useState<File>()
    const [open, setOpen] = useState(false)
    const [isLocationAvailable, setisLocationAvailable] = useState(true)
    const [isLoading, setisLoading] = useState(false)
    const [isChanged, setisChanged] = useState(false)
    const [previewUrl, setPreviewUrl] = useState(plant.imageUrl)


    const onValueChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const inputId = e.target.id as keyof typeof Values
        if (Values[inputId] !== e.target.value) {
            if (ValuesTobeSubmitted[inputId] !== e.target.value) {
                setValuesTobeSubmitted({ ...ValuesTobeSubmitted, [inputId]: e.target.value })
                setisChanged(true)
            }
        } else {
            setisChanged(false)
        }
    }

    async function updatePlant() {
        setisLoading(true)
        if (isLocationAvailable == false) {
            const response: responseDataTypes = await addLocation(BASE, plant.userId, ValuesTobeSubmitted.location, ValuesTobeSubmitted.environment)
            if (response.status != 201) {
                console.log("ℹ️", response.message)
            }
        }

        const response: responseDataTypes = await UpdatePlant(BASE, ValuesTobeSubmitted)
        setisLoading(false)
        if (response.status == 200) {
            console.log("✅", response.message)
            setOpen(!open)
            loadPlant()
            toast.success(response.message)
        } else if (response.status != 200) {
            console.log("ℹ️", response.message)
            setOpen(!open)
            loadPlant()
            toast.error(response.message)
        }


    }

    //handle imageUpload
    async function handleUpload() {
        if (Image != null) {
            try {
                setisLoading(true)
                await updateImage(plant.userId, Image, plant.imageName);
                updatePlant()
                setisLoading(false)
            } catch (error) {
                console.error("Upload failed", error);
                setisLoading(false)
            }
        } else {
            updatePlant()
        }

    }

    const handleLocationChange = (location: string, environment: string | null) => {

        if (location) {
            if (Values.location != location) {
                if (ValuesTobeSubmitted.location != location) {
                    setisChanged(true)
                    setValuesTobeSubmitted((prevValues) => ({
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
            } else {
                setisChanged(false)
            }
        }
    }

    const handleSpeciesChange = (value: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            speciesId: value
        }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const file = files[0];
        if (file) {
            setImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }

            reader.readAsDataURL(file)
            setisChanged(true)
        } else {
            return
        }
    }

    useEffect(() => {
        setValues({ nickname: plant.nickname, location: plant.location, speciesId: plant.speciesId, environment: plant.environment })
        setValuesTobeSubmitted({ plantId: plantId, nickname: plant.nickname, location: plant.location, speciesId: plant.speciesId, environment: plant.environment, imageUrl: plant.imageUrl, imageName: plant.imageName, userId: plant.userId })
    }, [plant])

    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full" asChild>
                <Button variant={"ghost"}><Pencil1Icon /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Plant</DialogTitle>
                    <DialogDescription>Fill in the details below to Update the plant</DialogDescription>

                    <div className='flex flex-col justify-center items-center'>
                        <div>
                            <label htmlFor="image" className="btn">{previewUrl ? <img src={previewUrl} alt={ValuesTobeSubmitted.imageName} width={200} className="rounded-xl hover:blur-xs transition-all" /> : <img src={plant.imageUrl} alt={ValuesTobeSubmitted.imageName} width={200} className="rounded-xl hover:blur-sm transition-all" />}</label>
                            <input id="image" onChange={handleImageChange} type="file" accept='image' className="hidden justify-center mx-auto" />
                            <p className="text-xs text-secondary text-center mt-1">click to upload.</p>
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
                        <select disabled={isLocationAvailable} value={ValuesTobeSubmitted.environment} name="environment" id="environment" className='flex my-1 p-2 rounded-md border w-full' onChange={(e) => { onValueChange(e) }}>
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

    )
}

export default EditPlantComponent