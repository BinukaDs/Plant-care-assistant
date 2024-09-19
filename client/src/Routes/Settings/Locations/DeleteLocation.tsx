import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import { deleteLocation } from '@/services/Locations.service'
import { useContext } from 'react'
import { UserContext, PlantsContext } from '@/App'
import { responseDataTypes } from '@/types/Plant'

const DeleteLocation = ({ id, plantsCount }: { id: string, plantsCount: number }) => {
  const BASE = useContext(UserContext);
  const { loadFetchLocations } = useContext(PlantsContext)
  const Delete = async () => {
    if (plantsCount > 0) {
      return toast.error("Please delete all plants in this location before deleting the location!")
    }
    try {
      const response: responseDataTypes = await deleteLocation(BASE, id)
      if (response.status == 200) {
        console.log("✅", response.message)
        toast.success(response.message)
        return loadFetchLocations()
      } else if (response.status != 200) {
        console.log("ℹ️", response.message)
        toast.error(response.message)
        return loadFetchLocations()
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Button variant={"ghost"} onClick={Delete}><TrashIcon className='text-destructive' /></Button>
  )
}

export default DeleteLocation