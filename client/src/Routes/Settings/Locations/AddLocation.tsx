import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { useState, useContext } from "react"
import { UserContext, PlantsContext } from "@/App"
import { addLocation } from "@/services/Locations.service"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LiaPlusSolid } from 'react-icons/lia'
import { responseDataTypes } from "@/types/Plant"
import { tailspin } from 'ldrs'
import { toast } from "sonner"

tailspin.register()
const AddLocation = ({ userId }: { userId: string }) => {
  const [Values, setValues] = useState({ location: "", environment: "Indoor" })
  const [isLoading, setisLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { loadFetchLocations } = useContext(PlantsContext)
  const BASE = useContext(UserContext)
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.id]: e.target.value })
  }

  

  const onSubmit = async () => {
    try {
      setisLoading(true)
      const response: responseDataTypes = await addLocation(BASE, userId, Values.location, Values.environment)
      if (response.status == 201) {
        setisLoading(false)
        setOpen(!open)
        console.log("✅", response.message)
        toast.success(response.message)
        return loadFetchLocations()
      } else if (response.status != 201) {
        setisLoading(false)
        setOpen(!open)
        console.log("ℹ️", response.message)
        toast.error(response.message)
        return loadFetchLocations()
      }
    } catch (error) {
      console.error(error)
      setisLoading(false)
    }
  }
  return (
    <Dialog>
      <DialogTrigger><Button variant={"ghost"} className='text-primary transition-all hover:text-black'><LiaPlusSolid size={22} /></Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Location</DialogTitle>
          <div className="flex flex-col gap-3">
            <div>
              <Label>Location</Label>
              <Input id='location' placeholder='Living Room' onChange={(e) => { onValueChange(e) }} />
            </div>
            <div>
              <Label>Environment</Label>
              <select name="environment" value={Values.environment} id="environment" className='flex my-1 p-2 rounded-md border w-full' onChange={(e) => { onValueChange(e) }}>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
              </select>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter><Button type="submit" className="w-full" onClick={onSubmit}>{isLoading ?
          <l-tailspin
            size="32"
            stroke="5"
            speed="0.9"
            color="white"
          ></l-tailspin> : "Save"}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddLocation