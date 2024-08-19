import { PlantsContext } from '../../DashBoard'
import { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
const LocationBadge = ({ Location }: { Location: string }) => {
  const [BgState, setBgState] = useState<"secondary" | "outline">("outline")
  const { setData, Plants } = useContext(PlantsContext)


  const toggleState = () => {
    setBgState((prevState) => (prevState === 'outline' ? 'secondary' : 'outline'));
    //secondary = onState | outline =offState
    if (BgState === "outline") {
      setData(Plants.filter((plant) => plant.location.toLowerCase() === Location.toLowerCase()))
      
    } else {
      setData(Plants)
    }
  };
  return (
    <div>
      <Badge variant={BgState} onClick={toggleState}>{Location}</Badge>
    </div>
  )
}

export default LocationBadge