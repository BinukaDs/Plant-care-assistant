import { useEffect, useState } from 'react'
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





const AddPlant = () => {

    const [Values, setValues] = useState({ userid: "", nickname: "", location: "", species: "", environment: "Indoor" })


    useEffect(() => {
        fetch("http://localhost:3001/isUserAuth/userdata", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((res) => {
            return res.json()
        }).then(data => { setValues({ userid: data.id }) })
            .catch((error) => {
                console.error('Error:', error);
            })


    }, [Values.userid])


    function AddPlant() {
       
        fetch('http://localhost:3001/addPlant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(Values)
        }).then((response) => {
            console.log(response)
            if(response.status === 200) {
                console.log("Plant Added!")
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleChange = (e) => {
        setValues({ ...Values, [e.target.id]: e.target.value })
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <Button>Add Plant</Button>
                </DialogTrigger>
                <DialogContent>
                    <form onSubmit={AddPlant}>
                        <DialogHeader>
                            <DialogTitle>Add Plant</DialogTitle>
                            <DialogDescription>Fill in the details below to add a plant</DialogDescription>

                            <div className="flex items-center space-x-2 my-5">
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="nickname" >
                                        NickName
                                    </Label>
                                    <Input
                                        name='name'
                                        id="nickname"
                                        placeholder='Baby Rosa'
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="location" >
                                    Environment
                                </Label>
                                <select name="environment" id="environment" className='flex my-1 p-2 rounded-md border w-full' onChange={handleChange}>
                                    <option value="Indoor">Indoor</option>
                                    <option value="Outdoor">Outdoor</option>
                                </select>
                            </div>
                        </DialogHeader>
                        <DialogFooter>
                            <Button type='submit'>Add Plant</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddPlant