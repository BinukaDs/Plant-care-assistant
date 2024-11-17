import { useState, useEffect, useContext } from "react"
import { getAllSpecies } from "@/services/Species.service"
import { PlantsContextDataTypes, SpeciesDataTypes } from "@/types/Plant"
import ReactMarkdown from "react-markdown"
import { PlantsContext, UserContext } from "@/App"
import { LiaInfoCircleSolid } from "react-icons/lia"
import SpeciesSkeleton from "@/components/skeletons/Settings-species-skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "sonner"
const Species = () => {
  const BASE = useContext(UserContext)
  const { isLoading, setisLoading } = useContext(PlantsContext) as PlantsContextDataTypes
  const [species, setSpecies] = useState<SpeciesDataTypes[]>([])
  const loadGetAllSpecies = async () => {
    setisLoading(true)
    try {
      const payload: SpeciesDataTypes[] = await getAllSpecies(BASE)
      setSpecies(payload)
      setisLoading(false)
    }
    catch (error) {
      console.error(error)
      toast.error("Error loading species!")
      setisLoading(false)
    }
  }
  useEffect(() => {
    loadGetAllSpecies()
  }, [])
  return (
    <section className='mt-3 w-full'>
      <div className='flex flex-col items-start w-full border-b pb-2'>
        <p className='topic'>Species</p>
        <p className='text-secondary text-sm'>Manage Your Plants' Species</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-2 gap-6 mt-5">
        {isLoading ? <SpeciesSkeleton /> : species.length > 0 && species.map((doc: SpeciesDataTypes) => (
          <div key={doc.id}>
            <Card className="h-full ">
              <CardHeader>
                <CardTitle className="text-start text-lg topic w-full flex justify-between">
                  <ReactMarkdown>{doc.scientificName + ` (${doc.name})`}</ReactMarkdown>

                  <button><LiaInfoCircleSolid className="text-primary" size={24} /></button>
                </CardTitle>

              </CardHeader>
              <CardContent>
                <CardDescription className="text-start text-secondary"><ReactMarkdown>{doc.description}</ReactMarkdown></CardDescription>
              </CardContent>

            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Species