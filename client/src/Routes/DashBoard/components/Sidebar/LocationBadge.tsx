import { PlantsContext } from '@/App'
import { useContext } from 'react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from "@/components/ui/checkbox"

const LocationBadge = ({ Location }: { Location: string }) => {
  const [BgState, setBgState] = useState(false)
  const { setData, Plants } = useContext(PlantsContext)


  const toggleState = () => {
    setBgState((prevState) => (prevState === true ? false : true));
    //secondary = onState | outline =offState
    if (BgState === false) {
      setData(Plants.filter((plant) => plant.location.toLowerCase() === Location.toLowerCase()))
    } else {
      setData(Plants)
    }
  };
  return (
    <div>
      {/* <Badge variant={BgState} onClick={toggleState}>{Location}</Badge> */}
      <div className='flex justify-center items-center gap-3 px-2 py-1'><Checkbox onClick={toggleState} /><p className={`${BgState === true && ' text-primary'}`}>{Location}</p></div>
    </div>
  )
}

export default LocationBadge