import { useEffect, useState } from "react"
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
import uploadImage from '@/components/uploadImage'



const AddPlant = ({ userId }: { userId: string }) => {
    const [Values, setValues] = useState({ userId: userId, nickname: "", location: "", species: "", environment: "Indoor", imageUrl: "", imageName: "" })
    const [Image, setImage] = useState(null)
    const [isUploaded, setisUploaded] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    //console.log("userid: ", Values.userId)


    const onValueChange = (e) => {
        setValues({ ...Values, userId: userId, [e.target.id]: e.target.value })
    }

    async function handleUpload() {
        try {
            setisLoading(true)
            const { imageUrl, fileName } = await uploadImage(userId, Image);
            console.log("image: ", imageUrl)
            console.log(fileName)
            setValues({ ...Values, imageUrl: imageUrl as string, imageName: fileName as string })

            setisUploaded(true)

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
                    await fetch('http://localhost:3001/addPlant', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(Values)
                    }).then((response) => {
                        console.log(response)
                        if (response.status === 200) {
                            console.log("Plant Added!")
                            window.location.reload()
                        }
                    }).catch((error) => {
                        console.error('Error:', error);
                    });
                    setisLoading(false)

                } catch (error) {
                    console.error("Upload failed", error);
                    setisLoading(false)
                }
            }
            postData()
        }
    }, [Values.imageUrl])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file)
        }
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <Button type='button'>Add Plant</Button>
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
                                <Input
                                    name='location'
                                    id="location"
                                    placeholder='Living Room'
                                    onChange={(e) => { onValueChange(e) }}
                                />
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
                            <select name="environment" id="environment" className='flex my-1 p-2 rounded-md border w-full' onChange={(e) => { onValueChange(e) }}>
                                <option value="Indoor">Indoor</option>
                                <option value="Outdoor">Outdoor</option>
                            </select>
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="submit" onClick={handleUpload} >{isLoading ? <PuffLoader /> : "Save"}</Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddPlant